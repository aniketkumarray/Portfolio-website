import { useEffect, useRef, useState } from 'react'
import { useInView } from '@/hooks/useInView'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Props {
  value: number
  suffix?: string
  duration?: number
  className?: string
}

export function Counter({ value, suffix = '', duration = 1.4, className }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.6 })
  const reduced = useReducedMotion()
  const [display, setDisplay] = useState(reduced ? value : 0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current || reduced) return
    started.current = true
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      const eased = 1 - Math.pow(1 - t, 3)
      setDisplay(Math.round(value * eased))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration, reduced])

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  )
}
