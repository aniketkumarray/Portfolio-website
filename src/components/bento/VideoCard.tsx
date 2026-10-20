import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { Volume, VolumeOff } from '@/components/ui/Icons'

export function VideoCard() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25, rootMargin: '200px' })
  const video = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (inView) {
      if (!loaded) {
        v.src = '/carchase.mp4'
        setLoaded(true)
      }
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView, loaded])

  return (
    <div ref={ref} className="card relative h-full min-h-[260px] overflow-hidden md:min-h-0">
      <video
        ref={video}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        poster="/carchase-poster.webp"
        aria-label="Looping cinematic car chase clip"
        className="h-full w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <p className="label-mono absolute left-5 top-5 text-text-secondary">Motion</p>
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
        className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full border border-white/15 bg-black/40 text-text backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
      >
        {muted ? <VolumeOff /> : <Volume />}
      </button>
    </div>
  )
}
