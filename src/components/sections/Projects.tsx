import { forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { gsap } from '@/lib/gsap'
import { projectCategories, projects } from '@/data/profile'
import type { Project } from '@/data/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useIsMobile } from '@/hooks/useMediaQuery'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Img } from '@/components/ui/Media'
import { ArrowUpRight, Github } from '@/components/ui/Icons'

const ease = [0.22, 1, 0.36, 1] as const
type Category = (typeof projectCategories)[number]

function LazyVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2, rootMargin: '200px' })
  const video = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (inView) {
      if (!loaded) {
        v.src = src
        setLoaded(true)
      }
      v.play().catch(() => {})
    } else {
      v.pause()
    }
  }, [inView, loaded, src])

  return (
    <div ref={ref} className="h-full w-full">
      <video
        ref={video}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]"
      />
    </div>
  )
}

function ProjectMedia({ p, className }: { p: Project; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden bg-bg-elevated', className)}>
      {p.video ? (
        <LazyVideo src={p.video} poster={p.image} label={`${p.title} demo`} />
      ) : (
        <Img src={p.image} alt={`${p.title} preview`} seed={p.title.length} loading="lazy" width={1280} height={720} className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out-expo group-hover:scale-[1.04]" />
      )}
    </div>
  )
}

function FeaturedCard({ p, index, total }: { p: Project; index: number; total: number }) {
  return (
    <article
      data-stack-card
      className="group card sticky overflow-hidden !bg-bg-elevated"
      style={{ top: `calc(var(--nav-h) + 40px + ${index * 16}px)`, transformOrigin: 'center top' }}
      aria-labelledby={`proj-${p.slug}`}
    >
      <Link to={`/projects/${p.slug}`} data-cursor="View" className="grid md:grid-cols-2">
        <ProjectMedia p={p} className="aspect-[16/10] md:aspect-auto md:min-h-[440px]" />
        <div className="flex flex-col justify-between p-6 md:p-10">
          <div>
            <p className="label-mono flex items-center gap-3">
              <span className="text-accent">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
              <span>{p.category}</span>
            </p>
            <h3 id={`proj-${p.slug}`} className="mt-5 font-display text-3xl font-bold tracking-tight text-text md:text-4xl">{p.title}</h3>
            <p className="mt-3 text-lg text-text-secondary">{p.kicker}</p>
            <p className="mt-4 text-[15px] text-text-secondary">{p.summary}</p>
          </div>
          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              {p.stack.slice(0, 5).map((s) => <span key={s} className="pill">{s}</span>)}
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-text">
              View case study
              <span className="grid size-8 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight width={14} height={14} />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

const GridCard = forwardRef<HTMLElement, { p: Project }>(function GridCard({ p }, ref) {
  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease }}
      className="group card flex flex-col overflow-hidden"
    >
      <Link to={`/projects/${p.slug}`} data-cursor="View" className="flex h-full flex-col">
        <ProjectMedia p={p} className="aspect-[16/10]" />
        <div className="flex flex-1 flex-col p-5">
          <p className="label-mono">{p.category}</p>
          <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-text">{p.title}</h3>
          <p className="mt-2 flex-1 text-sm text-text-secondary">{p.kicker}</p>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex flex-wrap gap-1.5">
              {p.stack.slice(0, 3).map((s) => <span key={s} className="pill !px-2 !py-0.5 !text-[10px]">{s}</span>)}
            </div>
            {p.repoUrl && <Github className="text-text-tertiary" />}
          </div>
        </div>
      </Link>
    </motion.article>
  )
})

export function Projects() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const [filter, setFilter] = useState<Category>('All')
  const featured = projects.filter((p) => p.featured)
  const filtered = projects.filter((p) => filter === 'All' || p.category === filter)

  // Stacking: each pinned card scales down slightly as the next slides over it.
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced || mobile) return
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-stack-card]')
      cards.forEach((card, i) => {
        const next = cards[i + 1]
        if (!next) return
        gsap.to(card, {
          scale: 0.95,
          filter: 'brightness(0.55)',
          ease: 'none',
          scrollTrigger: { trigger: next, start: 'top bottom-=80', end: 'top top+=120', scrub: true },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section id="projects" ref={ref} aria-labelledby="projects-title" className="section container-x">
      <SectionHeader
        index="03"
        label="Selected work"
        id="projects-title"
        title={'Products with\nreal constraints.'}
        description="Case studies in Problem → Approach → Result. Each one shipped with a budget, a deadline and someone who had to trust it."
      />

      <div className="space-y-6">
        {featured.map((p, i) => <FeaturedCard key={p.slug} p={p} index={i} total={featured.length} />)}
      </div>

      <div className="mt-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-display text-2xl font-bold tracking-tight text-text">All projects</h3>
          <LayoutGroup id="filters">
            <div role="tablist" aria-label="Filter projects" className="glass flex flex-wrap gap-1 rounded-full p-1">
              {projectCategories.map((c) => (
                <button
                  key={c}
                  role="tab"
                  aria-selected={filter === c}
                  onClick={() => setFilter(c)}
                  className={cn('relative isolate rounded-full px-4 py-2 text-sm transition-colors', filter === c ? 'text-accent-ink' : 'text-text-secondary hover:text-text')}
                >
                  {filter === c && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-accent" transition={{ duration: 0.45, ease }} />}
                  {c}
                </button>
              ))}
            </div>
          </LayoutGroup>
        </div>
        <motion.div layout className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => <GridCard key={p.slug} p={p} />)}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
