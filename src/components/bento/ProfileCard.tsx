import { useRef } from 'react'
import { gsap } from '@/lib/gsap'
import { profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Img } from '@/components/ui/Media'

export function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const onMove = (e: React.PointerEvent) => {
    if (reduced || !ref.current || !img.current) return
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    gsap.to(ref.current, { rotateY: x * 8, rotateX: -y * 8, duration: 0.6, ease: 'power3.out', transformPerspective: 800 })
    gsap.to(img.current, { x: x * -10, y: y * -10, scale: 1.06, duration: 0.6, ease: 'power3.out' })
  }
  const onLeave = () => {
    if (!ref.current || !img.current) return
    gsap.to(ref.current, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power3.out' })
    gsap.to(img.current, { x: 0, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' })
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="card group relative h-full min-h-[360px] overflow-hidden md:min-h-0"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div ref={img} className="absolute inset-0 will-change-transform">
        <Img src="/mine_pic.webp" alt={`Portrait of ${profile.name}`} loading="lazy" width={600} height={800} seed={3} className="h-full w-full object-cover object-top" />
      </div>
      <div className="absolute inset-0 bg-black/25" />
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-lg font-bold text-text">{profile.firstName}</p>
        <p className="label-mono">{profile.location}</p>
      </div>
    </div>
  )
}
