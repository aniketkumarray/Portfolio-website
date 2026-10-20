import { useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { profile, skills } from '@/data/profile'
import type { Proficiency } from '@/data/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/lib/utils'
import { SectionHeader } from '@/components/ui/SectionHeader'

const levelMeta: Record<Proficiency, { dots: number; hint: string }> = {
  Daily: { dots: 3, hint: 'Use every week, can teach it' },
  Comfortable: { dots: 2, hint: 'Ship with it independently' },
  Familiar: { dots: 1, hint: 'Know the concepts, learning the craft' },
}

function Level({ level }: { level: Proficiency }) {
  const { dots } = levelMeta[level]
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`Proficiency: ${level}`}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={cn('size-1.5 rounded-full transition-colors', n <= dots ? 'bg-accent' : 'bg-white/15')} />
      ))}
    </span>
  )
}

export function Skills() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [active, setActive] = useState<Proficiency | null>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>('[data-skill-card]')
      gsap.set(cards, { opacity: 0, y: 40 })
      ScrollTrigger.batch(cards, {
        start: 'top 88%',
        once: true,
        onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, overwrite: true }),
      })
    }, el)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="skills" ref={ref} aria-labelledby="skills-title" className="section container-x">
      <SectionHeader
        index="04"
        label="Capabilities"
        id="skills-title"
        title={'Honest levels,\nno fake bars.'}
        description={
          <span className="flex flex-wrap gap-x-5 gap-y-2">
            {(Object.keys(levelMeta) as Proficiency[]).map((l) => (
              <button
                key={l}
                type="button"
                onMouseEnter={() => setActive(l)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(l)}
                onBlur={() => setActive(null)}
                className="inline-flex items-center gap-2 text-sm text-text-secondary"
                title={levelMeta[l].hint}
              >
                <Level level={l} /> {l}
              </button>
            ))}
          </span>
        }
      />

      <div className="grid gap-4 md:grid-cols-2">
        {Object.values(skills).map((group) => (
          <div key={group.label} data-skill-card className="card p-6 md:p-8">
            <p className="label-mono flex items-center gap-3">
              <span className="text-accent">{group.index}</span>
              {group.label}
            </p>
            <ul className="mt-5 divide-y divide-border">
              {group.items.map((s) => (
                <li
                  key={s.name}
                  className={cn('flex items-center justify-between gap-4 py-3 transition-opacity duration-300', active && active !== s.level && 'opacity-30')}
                >
                  <div>
                    <p className="text-text">{s.name}</p>
                    {s.note && <p className="text-xs text-text-tertiary">{s.note}</p>}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-text-tertiary">{s.level}</span>
                    <Level level={s.level} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <p className="label-mono mb-4">Core competencies</p>
        <ul className="flex flex-wrap gap-2">
          {profile.competencies.map((c) => <li key={c} className="pill">{c}</li>)}
        </ul>
      </div>
    </section>
  )
}
