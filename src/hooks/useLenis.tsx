import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { useReducedMotion } from './useReducedMotion'

const LenisContext = createContext<Lenis | null>(null)

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion()
  const [instance, setInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      return
    }
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
    })
    setInstance(lenis)
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      setInstance(null)
    }
  }, [reduced])

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

/** Scroll to a target using Lenis when available, otherwise native. */
export function useScrollTo() {
  const lenis = useLenis()
  return (target: string | HTMLElement | number, offset = 0) => {
    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.2 })
      return
    }
    if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: 'smooth' })
      return
    }
    const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY + offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}
