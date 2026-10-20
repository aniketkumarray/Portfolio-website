import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { WallpaperGallery } from '@/components/bento/WallpaperGallery'
import { IntroCard } from '@/components/bento/IntroCard'
import { ToolsMarquee } from '@/components/bento/ToolsMarquee'
import { ProfileCard } from '@/components/bento/ProfileCard'
import { VideoCard } from '@/components/bento/VideoCard'

const MusicPlayer = lazy(() => import('@/components/bento/MusicPlayer').then((m) => ({ default: m.MusicPlayer })))

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
        <div data-bento className="md:col-span-5 md:row-span-2"><WallpaperGallery /></div>
        <div data-bento className="md:col-span-7 md:row-span-2"><IntroCard /></div>
        <div data-bento className="md:col-span-6 md:row-span-1"><ToolsMarquee /></div>
        <div data-bento className="md:col-span-3 md:row-span-2 lg:col-span-2"><ProfileCard /></div>
        <div data-bento className="md:col-span-3 md:row-span-2 lg:col-span-4"><VideoCard /></div>
        <div data-bento className="md:col-span-6 md:row-span-1">
          <Suspense fallback={<div className="card h-full min-h-[120px]" />}>
            <MusicPlayer />
          </Suspense>
        </div>
      </div>
    </section>
  )
}
