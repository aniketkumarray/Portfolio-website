import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { Counter } from '@/components/ui/Counter'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface Props {
  index: string
  /** Numeric part animated by the counter. */
  value: number
  prefix?: string
  suffix?: string
  /** Big label under the number. */
  title: string
  /** Supporting one-liner. */
  detail: string
}

/** An oversized impact number — a bold visual anchor instead of filler media. */
export function ImpactCard({ index, value, prefix = '', suffix = '', title, detail }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current || !glow.current) return
    const r = ref.current.getBoundingClientRect()
    gsap.to(glow.current, {
      x: e.clientX - r.left - r.width / 2,
      y: e.clientY - r.top - r.height / 2,
      duration: 0.6,
      ease: 'power3.out',
    })
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className="card relative flex h-full min-h-[160px] flex-col justify-between overflow-hidden p-6 md:p-7"
    >
      <div
        ref={glow}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-64 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb) / 0.18), transparent 60%)' }}
      />
      <p className="label-mono relative flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span>Impact</span>
      </p>
      <div className="relative">
        <p className="font-display text-5xl font-bold leading-none tracking-tight text-text md:text-6xl">
          {prefix}
          <Counter value={value} suffix={suffix} />
        </p>
        <p className="mt-3 font-display text-lg font-bold tracking-tight text-accent">{title}</p>
        <p className="mt-1 text-sm text-text-secondary">{detail}</p>
      </div>
    </div>
  )
}
