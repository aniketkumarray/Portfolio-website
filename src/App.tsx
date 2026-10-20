import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { ScrollTrigger } from '@/lib/gsap'
import { ReducedMotionProvider } from '@/hooks/useReducedMotion'
import { LenisProvider } from '@/hooks/useLenis'
import { ToastProvider } from '@/components/ui/Toast'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { Cursor } from '@/components/ui/Cursor'
import { ScrollProgress } from '@/components/ui/ScrollProgress'
import { Home } from '@/pages/Home'

const CaseStudy = lazy(() => import('@/pages/CaseStudy').then((m) => ({ default: m.CaseStudy })))
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })))
const Cover = import.meta.env.DEV
  ? lazy(() => import('@/pages/Cover').then((m) => ({ default: m.Cover })))
  : null

const ease = [0.22, 1, 0.36, 1] as const

function Analytics() {
  useEffect(() => {
    const domain = import.meta.env.VITE_PLAUSIBLE_DOMAIN as string | undefined
    if (!domain || import.meta.env.DEV) return
    const s = document.createElement('script')
    s.defer = true
    s.dataset.domain = domain
    s.src = 'https://plausible.io/js/script.js'
    document.head.appendChild(s)
    return () => s.remove()
  }, [])
  return null
}

function Routed() {
  const location = useLocation()
  useEffect(() => {
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => window.clearTimeout(t)
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        id="main"
        key={location.pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12, transition: { duration: 0.3 } }}
        transition={{ duration: 0.6, ease }}
      >
        <Suspense fallback={<div className="min-h-svh" />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            {Cover && <Route path="/__cover/:slug" element={<Cover />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <ReducedMotionProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <LenisProvider>
            <ToastProvider>
              <a href="#main" className="skip-link">Skip to content</a>
              <ScrollProgress />
              <Nav />
              <Routed />
              <Footer />
              <Cursor />
              <div aria-hidden className="grain" />
              <Analytics />
            </ToastProvider>
          </LenisProvider>
        </BrowserRouter>
      </ReducedMotionProvider>
    </HelmetProvider>
  )
}
