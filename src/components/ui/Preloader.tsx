import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Props {
  /** 0-1 progress of the critical asset preload (hero first batch). */
  progress: number
  done: boolean
  onComplete: () => void
}

const ease = [0.22, 1, 0.36, 1] as const

export function Preloader({ progress, done, onComplete }: Props) {
  const reduced = useReducedMotion()
  const [show, setShow] = useState(true)
  const [minTimeElapsed, setMinTimeElapsed] = useState(reduced)

  useEffect(() => {
    const t = window.setTimeout(() => setMinTimeElapsed(true), reduced ? 0 : 1400)
    return () => window.clearTimeout(t)
  }, [reduced])

  useEffect(() => {
    if (done && minTimeElapsed) {
      setShow(false)
      onComplete()
    }
  }, [done, minTimeElapsed, onComplete])

  const pct = Math.round(Math.max(progress, 0) * 100)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-bg"
          exit={{ y: '-100%', transition: { duration: 0.9, ease } }}
        >
          <div className="overflow-hidden">
            <motion.h1
              className="font-display text-[clamp(2rem,7vw,5.5rem)] font-bold tracking-[-0.04em] text-text"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
            >
              {profile.name}
            </motion.h1>
          </div>
          <div className="mt-4 overflow-hidden">
            <motion.p
              className="label-mono"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease, delay: 0.35 }}
            >
              {profile.roleLine}
            </motion.p>
          </div>
          <div className="absolute bottom-10 left-1/2 w-40 -translate-x-1/2">
            <div className="h-px w-full bg-border-strong">
              <motion.div className="h-full bg-accent" style={{ width: `${pct}%` }} transition={{ ease: 'linear' }} />
            </div>
            <p className="label-mono mt-3 text-center tabular-nums" aria-live="polite">
              {pct}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
