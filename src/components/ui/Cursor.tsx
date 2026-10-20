import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { useIsTouch } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Dot + trailing ring. Elements can opt into a label via data-cursor="View".
 * Hidden on touch devices and when reduced motion is requested.
 */
export function Cursor() {
  const touch = useIsTouch()
  const reduced = useReducedMotion()
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (touch || reduced) return
    document.body.classList.add('cursor-none-desktop')
    const dotX = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power2.out' })
    const dotY = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power2.out' })
    const ringX = gsap.quickTo(ring.current, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring.current, 'y', { duration: 0.35, ease: 'power3.out' })

    const onMove = (e: PointerEvent) => {
      setVisible(true)
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('a, button, [data-cursor], input, textarea, [role="button"]')
      const text = target?.dataset.cursor ?? null
      setLabel(text)
      const interactive = Boolean(target)
      gsap.to(ring.current, {
        scale: text ? 3.2 : interactive ? 1.8 : 1,
        duration: 0.4,
        ease: 'power3.out',
        backgroundColor: text ? 'rgba(255, 176, 32,1)' : 'rgba(255, 176, 32,0)',
      })
      gsap.to(dot.current, { scale: interactive ? 0 : 1, duration: 0.3 })
    }
    const onLeave = () => setVisible(false)
    const onDown = () => gsap.to(ring.current, { scale: 0.9, duration: 0.15 })
    const onUp = () => gsap.to(ring.current, { scale: 1, duration: 0.3 })

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    return () => {
      document.body.classList.remove('cursor-none-desktop')
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [touch, reduced])

  if (touch || reduced) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]" style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
      <div
        ref={ring}
        className="absolute left-0 top-0 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-accent/70 mix-blend-difference"
      >
        <span
          className="font-mono text-[4px] font-medium uppercase tracking-widest text-accent-ink"
          style={{ opacity: label ? 1 : 0, transition: 'opacity 0.2s' }}
        >
          {label}
        </span>
      </div>
      <div ref={dot} className="absolute left-0 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
    </div>
  )
}
