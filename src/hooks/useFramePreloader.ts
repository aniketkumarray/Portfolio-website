import { useEffect, useRef, useState } from 'react'
import { idle, pad } from '@/lib/utils'

export type Frame = ImageBitmap | HTMLImageElement

interface Options {
  count: number
  dir: string
  version?: string
  initialBatch?: number
  batchSize?: number
  /** Max decoded frames to keep in memory; older ones are evicted lazily. */
  maxInMemory?: number
  enabled?: boolean
}

interface State {
  ready: boolean
  loaded: number
}

const supportsBitmap = typeof window !== 'undefined' && 'createImageBitmap' in window

async function loadFrame(url: string): Promise<Frame> {
  if (supportsBitmap) {
    try {
      const res = await fetch(url, { cache: 'force-cache' })
      if (!res.ok) throw new Error(String(res.status))
      const blob = await res.blob()
      return await createImageBitmap(blob)
    } catch {
      // fall through to <img>
    }
  }
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

/**
 * Progressive frame loader: the first `initialBatch` frames load immediately
 * (ready=true once done); the rest load in idle-time batches.
 */
export function useFramePreloader({
  count,
  dir,
  version = '1',
  initialBatch = 30,
  batchSize = 30,
  maxInMemory = Infinity,
  enabled = true,
}: Options) {
  const frames = useRef<Array<Frame | undefined>>([])
  const [state, setState] = useState<State>({ ready: false, loaded: 0 })

  useEffect(() => {
    if (!enabled || count === 0) return
    let cancelled = false
    let cancelIdle: (() => void) | null = null
    frames.current = new Array<Frame | undefined>(count).fill(undefined)
    setState({ ready: false, loaded: 0 })

    const url = (i: number) => `${dir}/frame_${pad(i + 1, 4)}.webp?v=${version}`

    const loadBatch = async (from: number, to: number) => {
      const end = Math.min(to, count)
      const results = await Promise.allSettled(
        Array.from({ length: end - from }, (_, k) => loadFrame(url(from + k))),
      )
      if (cancelled) return
      results.forEach((r, k) => {
        if (r.status === 'fulfilled') frames.current[from + k] = r.value
      })
      const loaded = frames.current.filter(Boolean).length
      setState((s) => ({ ready: s.ready || end >= Math.min(initialBatch, count), loaded }))
    }

    const loadRest = (from: number) => {
      if (cancelled || from >= count) return
      cancelIdle = idle(() => {
        void loadBatch(from, from + batchSize).then(() => loadRest(from + batchSize))
      })
    }

    void loadBatch(0, initialBatch).then(() => loadRest(initialBatch))

    return () => {
      cancelled = true
      cancelIdle?.()
      frames.current.forEach((f) => {
        if (f && 'close' in f) f.close()
      })
      frames.current = []
    }
  }, [count, dir, version, initialBatch, batchSize, enabled])

  /** Returns the nearest loaded frame at or before index i (so scrubbing never shows blanks). */
  const getFrame = (i: number): Frame | undefined => {
    const list = frames.current
    for (let k = Math.min(i, list.length - 1); k >= 0; k--) {
      const f = list[k]
      if (f) return f
    }
    return undefined
  }

  useEffect(() => {
    if (!Number.isFinite(maxInMemory)) return
    // Eviction is handled opportunistically: frames beyond the cap are released
    // from the far end of the sequence when the loaded count exceeds the cap.
    const list = frames.current
    if (state.loaded <= maxInMemory) return
    for (let i = list.length - 1; i >= 0 && list.filter(Boolean).length > maxInMemory; i--) {
      const f = list[i]
      if (f && i > initialBatch) {
        if ('close' in f) f.close()
        list[i] = undefined
      }
    }
  }, [state.loaded, maxInMemory, initialBatch])

  return { ...state, getFrame, total: count }
}
