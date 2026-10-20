import { useEffect, useRef, useState } from 'react'

export function useInView<T extends HTMLElement>(options: IntersectionObserverInit = { threshold: 0.2 }) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(Boolean(entry?.isIntersecting)), options)
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.threshold, options.rootMargin])
  return { ref, inView }
}
