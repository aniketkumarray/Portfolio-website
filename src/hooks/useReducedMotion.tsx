import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const MotionContext = createContext(false)

export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return <MotionContext.Provider value={reduced}>{children}</MotionContext.Provider>
}

export const useReducedMotion = () => useContext(MotionContext)
