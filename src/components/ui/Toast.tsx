import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check } from './Icons'

interface ToastCtx {
  toast: (message: string) => void
}

const Ctx = createContext<ToastCtx>({ toast: () => {} })

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | null>(null)

  const toast = useCallback((m: string) => {
    setMessage(m)
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 2400)
  }, [])

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[120] flex justify-center px-4">
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-text"
            >
              <span className="grid size-5 place-items-center rounded-full bg-accent text-accent-ink">
                <Check width={12} height={12} strokeWidth={3} />
              </span>
              {message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  )
}

export const useToast = () => useContext(Ctx)
