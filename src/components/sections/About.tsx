import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WallpaperGallery } from '@/components/bento/WallpaperGallery'
import { IntroCard } from '@/components/bento/IntroCard'
import { ToolsMarquee } from '@/components/bento/ToolsMarquee'
import { ProfileCard } from '@/components/bento/ProfileCard'
import { ImpactCard } from '@/components/bento/ImpactCard'

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useLayoutEffect(() => {
    const el = ref.current
    if (!el || reduced) return
    const ctx = gsap.context(() => {
      const cards = el.querySelectorAll<HTMLElement>('[data-bento]')
      gsap.set(cards, { opacity: 0, y: 40 })
      ScrollTrigger.batch(cards, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out', overwrite: true }),
      })
    }, el)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section id="about" ref={ref} aria-labelledby="about-title" className="section container-x">
      <SectionHeader index="01" label="About" id="about-title" title={'Product judgment,\nhands-on execution.'} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:auto-rows-[minmax(180px,auto)]">
        {/* Row 1–2: intro + taste */}
        <div data-bento className="md:col-span-5 md:row-span-2"><WallpaperGallery /></div>
        <div data-bento className="md:col-span-7 md:row-span-2"><IntroCard /></div>

        {/* Row 3: tools full-width */}
        <div data-bento className="md:col-span-12"><ToolsMarquee /></div>

        {/* Row 4–5: portrait beside the three grouped impact cards */}
        <div data-bento className="md:col-span-4 md:row-span-2 lg:col-span-3"><ProfileCard /></div>

        <div data-bento className="md:col-span-8 md:row-span-1 lg:col-span-5">
          <ImpactCard index="01" value={40} prefix="₹" suffix=" Cr" title="Processed in payments" detail="8,000+ expense & reimbursement requests on systems I built from scratch." />
        </div>
        <div data-bento className="md:col-span-8 md:row-span-1 lg:col-span-4">
          <ImpactCard index="02" value={209} title="Product documents" detail="55 BRDs · 136 CRs · RCAs & more." />
        </div>
        <div data-bento className="md:col-span-6 md:row-span-1 lg:col-span-5">
          <ImpactCard index="03" value={362} title="Exits settled" detail="Exit system live since Dec 2025 — 94% hit the Full & Final deadline." />
        </div>
        <div data-bento className="md:col-span-6 md:row-span-1 lg:col-span-4">
          <ImpactCard index="04" value={94} suffix="%" title="FNF on time" detail="Full & Final settlements that met their statutory deadline." />
        </div>
      </div>
    </section>
  )
}
