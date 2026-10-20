import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = bar.current
    if (!el) return
    gsap.set(el, { scaleX: 0 })
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(el, { scaleX: self.progress }),
    })
    return () => st.kill()
  }, [])
  return (
    <div aria-hidden className="pointer-events-none fixed inset-x-0 top-0 z-[110] h-0.5">
      <div ref={bar} className="h-full w-full origin-left bg-accent" />
    </div>
  )
}
