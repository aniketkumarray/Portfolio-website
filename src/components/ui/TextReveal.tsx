import { useLayoutEffect, useRef, type ElementType } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'

interface Props {
  text: string
  as?: ElementType
  className?: string
  id?: string
  /** 'words' splits into word masks (hero); 'lines' splits on \n (default). */
  mode?: 'lines' | 'words'
  /** Trigger immediately rather than on scroll. */
  immediate?: boolean
  delay?: number
  stagger?: number
  /** When false, text stays masked and no animation is scheduled (e.g. until a preloader finishes). */
  enabled?: boolean
}

export function TextReveal({
  text,
  as: Tag = 'h2',
  className,
  id,
  mode = 'lines',
  immediate = false,
  delay = 0,
  stagger = 0.08,
  enabled = true,
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const parts = mode === 'words' ? text.split(' ') : text.split('\n')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      const spans = el.querySelectorAll<HTMLElement>('.split-line > span')
      // The CSS fallback is translateY(110%); GSAP reads that as a px `y`, so zero it explicitly.
      gsap.set(spans, { yPercent: 110, y: 0 })
      if (!enabled) return
      const tween = gsap.to(spans, {
        yPercent: 0,
        y: 0,
        duration: 1,
        stagger,
        delay,
        ease: 'power3.out',
        paused: !immediate,
      })
      if (!immediate) {
        ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => tween.play() })
      }
    }, el)
    return () => ctx.revert()
  }, [reduced, text, immediate, delay, stagger, enabled])

  return (
    <Tag ref={ref} id={id} className={cn(className, mode === 'words' && 'flex flex-wrap gap-x-[0.25em]')} aria-label={text}>
      {parts.map((part, i) => (
        <span key={i} className="split-line" aria-hidden>
          <span>{part}</span>
        </span>
      ))}
    </Tag>
  )
}
