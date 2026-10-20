import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { portraits, profile } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Img } from '@/components/ui/Media'

export function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  // Cross-fade through the portraits while the card is on screen.
  useEffect(() => {
    const el = ref.current
    if (reduced || !el || portraits.length < 2) return
    let timer: number | null = null
    const io = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting && timer === null) {
        timer = window.setInterval(() => setIndex((i) => (i + 1) % portraits.length), 3500)
      } else if (!entry?.isIntersecting && timer !== null) {
        window.clearInterval(timer)
        timer = null
      }
    }, { threshold: 0.3 })
    io.observe(el)
    return () => {
      io.disconnect()
      if (timer !== null) window.clearInterval(timer)
    }
  }, [reduced])

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
      className="card group relative h-full min-h-[380px] overflow-hidden md:min-h-0"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div ref={img} className="absolute inset-0 will-change-transform">
        {portraits.map((p, i) => (
          <Img
            key={p.src}
            src={p.src}
            alt={i === 0 ? `Portrait of ${profile.name}` : p.alt}
            loading="lazy"
            width={600}
            height={800}
            seed={i + 3}
            className="absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 ease-out"
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-black/25" />
      <div className="hero-vignette absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-accent/40 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <p className="font-display text-lg font-bold text-text">{profile.firstName}</p>
          <p className="label-mono">{profile.location}</p>
        </div>
        <div className="flex gap-1.5" aria-hidden>
          {portraits.map((_, i) => (
            <span key={i} className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'w-4 bg-accent' : 'w-1 bg-white/30'}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
