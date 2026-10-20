import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { awards, certifications, education } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Img } from '@/components/ui/Media'
import { ArrowUpRight } from '@/components/ui/Icons'

export function Education() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll<HTMLElement>('[data-edu]')
      gsap.set(items, { opacity: 0, y: 32 })
      ScrollTrigger.batch(items, {
        start: 'top 90%',
        once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, overwrite: true }),
      })
    }, el)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="education" ref={ref} aria-labelledby="education-title" className="section container-x">
      <SectionHeader index="05" label="Education & credentials" id="education-title" title={'Finance brain,\nengineering roots.'} />

      <div className="grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label-mono mb-4">Education</p>
          <ol className="space-y-4">
            {education.map((e) => (
              <li key={e.school} data-edu className="card p-6">
                <p className="label-mono text-accent">{e.period}</p>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-text">{e.school}</h3>
                <p className="mt-1 text-text-secondary">{e.degree}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {e.highlights.map((h) => <li key={h} className="pill">{h}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-7">
          <p className="label-mono mb-4">Certifications</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {certifications.map((c) => {
              const Wrapper = c.url ? 'a' : 'div'
              return (
                <li key={c.name} data-edu>
                  <Wrapper
                    {...(c.url ? { href: c.url, target: '_blank', rel: 'noreferrer' } : {})}
                    className="card group flex h-full items-start justify-between gap-3 p-5"
                  >
                    <div>
                      <p className="font-medium text-text">{c.name}</p>
                      <p className="mt-1 text-sm text-text-secondary">{c.issuer}{c.year ? ` · ${c.year}` : ''}</p>
                    </div>
                    {c.url && <ArrowUpRight className="shrink-0 text-text-tertiary transition-colors group-hover:text-accent" />}
                  </Wrapper>
                </li>
              )
            })}
          </ul>

          <p className="label-mono mb-4 mt-10">Awards</p>
          <ul className="grid gap-3 sm:grid-cols-3">
            {awards.map((a, i) => (
              <li key={a.title} data-edu className="card overflow-hidden">
                {a.image && (
                  <div className="aspect-[4/3] overflow-hidden border-b border-border">
                    <Img src={a.image} alt={`${a.title} award`} seed={i + 10} loading="lazy" width={400} height={300} className="h-full w-full object-cover" />
                  </div>
                )}
                <div className="p-5">
                  <p className="label-mono text-accent">{a.issuer}</p>
                  <p className="mt-2 font-display text-lg font-bold tracking-tight text-text">{a.title}</p>
                  <p className="mt-2 text-sm text-text-secondary">{a.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
