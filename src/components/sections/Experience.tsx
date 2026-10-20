import { useLayoutEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { experience } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Plus } from '@/components/ui/Icons'

const ease = [0.22, 1, 0.36, 1] as const

export function Experience() {
  const ref = useRef<HTMLElement>(null)
  const line = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [open, setOpen] = useState<number | null>(0)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      gsap.set(line.current, { scaleY: 0, transformOrigin: 'top' })
      gsap.to(line.current, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: '[data-timeline]', start: 'top 70%', end: 'bottom 60%', scrub: 0.5 },
      })
      const items = el.querySelectorAll<HTMLElement>('[data-role]')
      gsap.set(items, { opacity: 0, y: 32 })
      ScrollTrigger.batch(items, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, overwrite: true }),
      })
      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: 'top 60%',
          onEnter: () => item.classList.add('is-lit'),
          onLeaveBack: () => item.classList.remove('is-lit'),
        })
      })
    }, el)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="experience" ref={ref} aria-labelledby="experience-title" className="section container-x">
      <SectionHeader
        index="02"
        label="Experience"
        id="experience-title"
        title={'Four years of\nshipping decisions.'}
        description="Three companies, six platforms, one operating principle: discovery before delivery, measurement after."
      />

      <div data-timeline className="relative">
        <div aria-hidden className="absolute left-[7px] top-0 h-full w-px bg-border md:left-1/2">
          <div ref={line} className="h-full w-full bg-accent" />
        </div>

        <ol className="space-y-10 md:space-y-16">
          {experience.map((job, i) => {
            const isOpen = open === i
            const left = i % 2 === 0
            return (
              <li key={job.company} data-role className="group relative grid gap-4 pl-8 md:grid-cols-2 md:gap-12 md:pl-0">
                <span
                  aria-hidden
                  className="absolute left-0 top-2 size-[15px] rounded-full border-2 border-border bg-bg transition-[border-color,box-shadow] duration-500 group-[.is-lit]:border-accent group-[.is-lit]:shadow-[0_0_0_4px_rgba(255, 176, 32,0.2)] md:left-1/2 md:-translate-x-1/2"
                />
                <div className={cn('md:text-right', left ? 'md:order-1 md:pr-12' : 'md:order-2 md:pl-12 md:text-left')}>
                  <p className="label-mono text-accent">{job.period}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-text md:text-3xl">{job.company}</h3>
                  <p className="mt-1 text-text-secondary">{job.role}</p>
                  <p className="label-mono mt-2">{job.location}</p>
                </div>

                <div className={cn('card p-5 md:p-7', left ? 'md:order-2' : 'md:order-1')}>
                  <p className="text-text">{job.summary}</p>
                  <ul className="mt-4 space-y-3 text-[15px] text-text-secondary">
                    {job.bullets.slice(0, 3).map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <AnimatePresence initial={false}>
                    {isOpen && job.bullets.length > 3 && (
                      <motion.ul
                        key="more"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease }}
                        className="overflow-hidden text-[15px] text-text-secondary"
                      >
                        {job.bullets.slice(3).map((b) => (
                          <li key={b} className="flex gap-3 pt-3">
                            <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-accent" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                  <div className="mt-5 flex flex-wrap items-center gap-2">
                    {job.stack.map((s) => (
                      <span key={s} className="pill">{s}</span>
                    ))}
                  </div>
                  {job.bullets.length > 3 && (
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="mt-5 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-accent"
                    >
                      <span className={cn('grid size-6 place-items-center rounded-full border border-border transition-transform duration-500', isOpen && 'rotate-45 border-accent text-accent')}>
                        <Plus width={12} height={12} />
                      </span>
                      {isOpen ? 'Show less' : `${job.bullets.length - 3} more highlights`}
                    </button>
                  )}
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
