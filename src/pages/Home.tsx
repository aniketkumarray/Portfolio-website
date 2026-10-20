import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ScrollTrigger } from '@/lib/gsap'
import { Seo } from '@/components/ui/Seo'
import { Preloader } from '@/components/ui/Preloader'
import { Hero } from '@/components/hero/Hero'
import { About } from '@/components/sections/About'
import { useScrollTo } from '@/hooks/useLenis'

const Experience = lazy(() => import('@/components/sections/Experience').then((m) => ({ default: m.Experience })))
const Projects = lazy(() => import('@/components/sections/Projects').then((m) => ({ default: m.Projects })))
const Skills = lazy(() => import('@/components/sections/Skills').then((m) => ({ default: m.Skills })))
const Education = lazy(() => import('@/components/sections/Education').then((m) => ({ default: m.Education })))
const Contact = lazy(() => import('@/components/sections/Contact').then((m) => ({ default: m.Contact })))

const Placeholder = () => <div aria-hidden className="min-h-[60vh]" />

let preloaderShown = false

export function Home() {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const [started, setStarted] = useState(preloaderShown)
  const location = useLocation()
  const scrollTo = useScrollTo()

  const onProgress = useCallback((loaded: number, total: number) => setProgress(total ? loaded / total : 1), [])
  const onReady = useCallback(() => setReady(true), [])
  const onComplete = useCallback(() => {
    preloaderShown = true
    setStarted(true)
    ScrollTrigger.refresh()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('lenis-stopped', !started)
    return () => document.documentElement.classList.remove('lenis-stopped')
  }, [started])

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  useEffect(() => {
    if (!started || !location.hash) return
    const id = location.hash.slice(1)
    const t = window.setTimeout(() => scrollTo(`#${id}`, -24), 300)
    return () => window.clearTimeout(t)
  }, [started, location.hash, scrollTo])

  return (
    <>
      <Seo />
      <Helmet>
        <link rel="preload" href="/video-poster.webp" as="image" fetchPriority="high" />
      </Helmet>
      {!preloaderShown && <Preloader progress={progress} done={ready} onComplete={onComplete} />}
      <Hero onProgress={onProgress} onReady={onReady} started={started} />
      <About />
      <Suspense fallback={<Placeholder />}><Experience /></Suspense>
      <Suspense fallback={<Placeholder />}><Projects /></Suspense>
      <Suspense fallback={<Placeholder />}><Skills /></Suspense>
      <Suspense fallback={<Placeholder />}><Education /></Suspense>
      <Suspense fallback={<Placeholder />}><Contact /></Suspense>
    </>
  )
}
