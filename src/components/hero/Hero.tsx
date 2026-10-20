import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { profile } from '@/data/profile'
import frameMeta from '@/data/frames.json'
import { useFramePreloader, type Frame } from '@/hooks/useFramePreloader'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useScrollTo } from '@/hooks/useLenis'
import { isLowPowerDevice, range } from '@/lib/utils'
import { TextReveal } from '@/components/ui/TextReveal'
import { ArrowDown, Github, Linkedin, Mail } from '@/components/ui/Icons'
import { useMagnetic } from '@/hooks/useMagnetic'

const FRAME_COUNT = frameMeta.count
const FRAME_VERSION = '1'

interface HeroProps {
  onProgress: (loaded: number, total: number) => void
  onReady: () => void
  /** Set once the preloader has left the screen. */
  started: boolean
}

function drawCover(ctx: CanvasRenderingContext2D, frame: Frame, w: number, h: number) {
  const fw = frame.width
  const fh = frame.height
  const scale = Math.max(w / fw, h / fh)
  const dw = fw * scale
  const dh = fh * scale
  ctx.drawImage(frame, (w - dw) / 2, (h - dh) / 2, dw, dh)
}

function MagneticIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const ref = useMagnetic<HTMLAnchorElement>(0.35)
  return (
    <a
      ref={ref}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-white/15 bg-black/20 text-text backdrop-blur-md transition-colors hover:border-accent hover:text-accent"
    >
      {children}
    </a>
  )
}

export function Hero({ onProgress, onReady, started }: HeroProps) {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const scrollTo = useScrollTo()
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posterRef = useRef<HTMLImageElement>(null)
  const progressRef = useRef(0)
  const frameIndexRef = useRef(-1)
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 })
  const textRefs = {
    intro: useRef<HTMLDivElement>(null),
    mid: useRef<HTMLDivElement>(null),
    end: useRef<HTMLDivElement>(null),
    title: useRef<HTMLDivElement>(null),
    cue: useRef<HTMLDivElement>(null),
  }

  const useSequence = !reduced
  const lowPower = isLowPowerDevice()
  const { ready, loaded, getFrame, total } = useFramePreloader({
    count: FRAME_COUNT,
    dir: mobile ? '/frames-mobile' : '/frames',
    version: FRAME_VERSION,
    initialBatch: 30,
    batchSize: 30,
    maxInMemory: mobile || lowPower ? 90 : Infinity,
    enabled: useSequence,
  })

  useEffect(() => {
    onProgress(useSequence ? Math.min(loaded, 30) : 30, 30)
  }, [loaded, onProgress, useSequence])

  useEffect(() => {
    if (ready || !useSequence) onReady()
  }, [ready, useSequence, onReady])

  const render = (force = false) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return
    const idx = Math.min(total - 1, Math.max(0, Math.round(progressRef.current * (total - 1))))
    if (!force && idx === frameIndexRef.current) return
    const frame = getFrame(idx)
    if (!frame) return
    frameIndexRef.current = idx
    const { w, h } = sizeRef.current
    drawCover(ctx, frame, w, h)
  }

  const renderRef = useRef(render)
  renderRef.current = render

  // Canvas sizing: DPR-aware, ignoring height-only resizes on mobile (address bar).
  useEffect(() => {
    if (!useSequence) return
    const canvas = canvasRef.current
    if (!canvas) return
    let lastW = 0
    const resize = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      if (mobile && lastW === w && sizeRef.current.w !== 0) return
      lastW = w
      const dpr = Math.min(window.devicePixelRatio || 1, mobile || lowPower ? 1.5 : 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      const ctx = canvas.getContext('2d', { alpha: false })
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { w, h, dpr }
      renderRef.current(true)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [useSequence, mobile, lowPower])

  // Fade poster once first batch is drawn; redraw when late frames arrive.
  useEffect(() => {
    if (!useSequence || !ready) return
    renderRef.current(true)
    const poster = posterRef.current
    if (poster) gsap.to(poster, { opacity: 0, duration: 0.8, ease: 'power2.out' })
    ScrollTrigger.refresh()
  }, [ready, useSequence])

  useEffect(() => {
    if (!useSequence) return
    renderRef.current(true)
  }, [loaded, useSequence])

  // Scroll choreography
  useLayoutEffect(() => {
    if (!useSequence) return
    const wrap = wrapRef.current
    if (!wrap) return
    const ctx = gsap.context(() => {
      const setOpacity = (el: HTMLElement | null, v: number) => el && gsap.set(el, { opacity: v, y: (1 - v) * 24 })
      ScrollTrigger.create({
        trigger: wrap,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          progressRef.current = p
          renderRef.current()
          // Text beats: intro 0-15%, mid 40-60%, end 85-100%.
          setOpacity(textRefs.intro.current, p < 0.15 ? 1 - range(p, 0.08, 0.15) : 0)
          setOpacity(textRefs.mid.current, p < 0.5 ? range(p, 0.38, 0.45) : 1 - range(p, 0.55, 0.62))
          setOpacity(textRefs.end.current, range(p, 0.84, 0.92))
          setOpacity(textRefs.title.current, p < 0.12 ? 1 : 1 - range(p, 0.12, 0.2) + range(p, 0.86, 0.94))
          if (textRefs.cue.current) gsap.set(textRefs.cue.current, { opacity: 1 - range(p, 0.02, 0.08) })
        },
      })
    }, wrap)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useSequence])

  const socials = (
    <div className="flex gap-2 md:flex-col">
      <MagneticIcon href={profile.linkedin} label="LinkedIn"><Linkedin /></MagneticIcon>
      <MagneticIcon href={profile.github} label="GitHub"><Github /></MagneticIcon>
      <MagneticIcon href={`mailto:${profile.email}`} label="Email"><Mail /></MagneticIcon>
    </div>
  )

  if (!useSequence) {
    // Reduced-motion: static poster, normal flow layout.
    return (
      <section id="hero" aria-labelledby="hero-title" className="relative flex min-h-svh items-end overflow-hidden">
        <img src="/video-poster.webp" alt="" {...{ fetchpriority: 'high' }} width={1280} height={720} className="absolute inset-0 h-full w-full object-cover saturate-125" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="container-x relative z-10 flex w-full flex-col gap-10 pb-16 pt-32 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label-mono mb-4 text-accent">{profile.location} · {profile.availability}</p>
            <h1 id="hero-title" className="display-xl text-text">{profile.role}</h1>
            <p className="mt-6 max-w-xl text-lg text-text-secondary">{profile.tagline}</p>
          </div>
          {socials}
        </div>
      </section>
    )
  }

  return (
    <section id="hero" aria-labelledby="hero-title" ref={wrapRef} className="relative h-[800vh]">
      <p className="sr-only">
        A cinematic background sequence plays as you scroll. {profile.name}, {profile.roleLine}. {profile.tagline}
      </p>
      <div className="sticky top-0 h-svh w-full overflow-hidden">
        <div className="absolute inset-0 saturate-125">
          <canvas ref={canvasRef} aria-hidden className="h-full w-full" />
          <img
            ref={posterRef}
            src="/video-poster.webp"
            alt=""
            {...{ fetchpriority: 'high' }}
            width={1280}
            height={720}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div aria-hidden className="absolute inset-0 bg-black/10" />
        <div aria-hidden className="hero-vignette absolute inset-0" />
        <div aria-hidden className="hero-bottom absolute inset-0" />

        {/* Top-right socials */}
        <div className="absolute right-5 top-24 z-10 md:right-10 md:top-28">{socials}</div>

        {/* Intro beat */}
        <div ref={textRefs.intro} className="pointer-events-none absolute inset-x-0 top-[32%] z-10 px-6 text-center md:left-10 md:right-auto md:top-[30%] md:px-0 md:text-left">
          <p className="label-mono mb-4 text-accent">{profile.location} · {profile.availability}</p>
          <p className="font-display text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-text">
            Hi, I'm {profile.firstName}.
          </p>
          <p className="mt-3 max-w-md text-base text-text-secondary md:text-lg">{profile.tagline}</p>
        </div>

        {/* Mid beat */}
        <div ref={textRefs.mid} className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 px-6 text-center opacity-0 [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] md:px-10">
          <p className="label-mono mb-5">What I do</p>
          <p className="mx-auto max-w-3xl font-display text-[clamp(1.75rem,4.5vw,4rem)] font-bold leading-[1.02] tracking-tight text-text">
            Discovery to adoption, across ERP, LMS, CRM and AI.
          </p>
          <div className="mx-auto mt-8 grid max-w-2xl grid-cols-3 gap-4">
            {profile.stats.slice(0, 3).map((s) => (
              <div key={s.label} className="glass rounded-2xl px-3 py-4">
                <p className="font-display text-2xl font-bold text-accent md:text-4xl">{'prefix' in s ? s.prefix : ''}{s.value}{'suffix' in s ? s.suffix : ''}</p>
                <p className="mt-1 text-[11px] leading-tight text-text-secondary md:text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* End beat */}
        <div ref={textRefs.end} className="pointer-events-none absolute inset-x-0 top-[34%] z-10 px-6 text-center opacity-0 md:left-10 md:right-auto md:px-0 md:text-left">
          <p className="label-mono mb-4 text-accent">Currently</p>
          <p className="max-w-lg font-display text-[clamp(1.5rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight text-text">
            Designing human-in-the-loop AI at Itvedant.
          </p>
          <p className="mt-3 max-w-md text-base text-text-secondary md:text-lg">Keep scrolling for the work.</p>
        </div>

        {/* Bottom row: title (left) + pitch & cue (right) — flex keeps them from colliding */}
        <div className="absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-8 px-6 md:bottom-10 md:flex-row md:items-end md:justify-between md:gap-12 md:px-10">
          <div ref={textRefs.title} className="min-w-0 text-center md:text-left">
            <TextReveal
              as="h1"
              id="hero-title"
              text={profile.role}
              mode="words"
              immediate
              enabled={started}
              delay={0.2}
              stagger={0.12}
              className="display-xl justify-center text-text md:justify-start"
            />
            <p className="label-mono mt-4">AI Products · B2B / B2C SaaS</p>
          </div>

          <div ref={textRefs.cue} className="flex shrink-0 flex-col items-center gap-4 md:items-end">
            <p className="hidden max-w-xs text-right text-sm text-text-secondary lg:block">{profile.pitch}</p>
            <button
              type="button"
              onClick={() => scrollTo('#about', -24)}
              className="group flex items-center gap-3 text-xs text-text-secondary transition-colors hover:text-text"
              aria-label="Scroll to about section"
            >
              <span className="label-mono hidden md:inline">Scroll</span>
              <span className="relative grid h-10 w-6 place-items-center overflow-hidden rounded-full border border-white/25 md:hidden">
                <span className="animate-scroll-cue block h-2 w-1 rounded-full bg-accent" />
              </span>
              <span className="hidden size-10 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-accent md:grid">
                <ArrowDown className="animate-scroll-cue" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
