import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navLinks, profile } from '@/data/profile'
import { useScrollTo } from '@/hooks/useLenis'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Close, Download, Menu } from '@/components/ui/Icons'

const ease = [0.22, 1, 0.36, 1] as const

export function Nav() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState<string>('')
  const [open, setOpen] = useState(false)
  const scrollTo = useScrollTo()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > last && y > 200 && !open)
      last = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    if (!isHome) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    // Sections below the fold are lazy-loaded, so keep observing as they mount.
    const observed = new Set<Element>()
    const scan = () => {
      navLinks.forEach((l) => {
        const el = document.getElementById(l.id)
        if (el && !observed.has(el)) {
          observed.add(el)
          io.observe(el)
        }
      })
      return observed.size === navLinks.length
    }
    if (!scan()) {
      const mo = new MutationObserver(() => {
        if (scan()) mo.disconnect()
      })
      mo.observe(document.body, { childList: true, subtree: true })
      return () => {
        mo.disconnect()
        io.disconnect()
      }
    }
    return () => io.disconnect()
  }, [isHome])

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    if (!isHome) {
      navigate(`/#${id}`)
      return
    }
    scrollTo(`#${id}`, -24)
  }

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[100] flex justify-center px-4 pt-4"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <nav
          aria-label="Primary"
          className={cn(
            'glass flex h-14 w-full max-w-[920px] items-center justify-between gap-2 rounded-full pl-5 pr-2 transition-[background-color,box-shadow,border-color] duration-500',
            (scrolled || !isHome) && 'bg-bg-elevated/70 shadow-lg',
          )}
        >
          <Link
            to="/"
            className="font-display text-base font-bold tracking-tight text-text"
            onClick={(e) => {
              if (isHome) {
                e.preventDefault()
                scrollTo(0)
              }
            }}
          >
            AKR<span className="text-accent">.</span>
            <span className="sr-only"> — {profile.name}, home</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => go(l.id)}
                  className={cn(
                    'relative isolate rounded-full px-3.5 py-2 text-sm text-text-secondary transition-colors hover:text-text focus-visible:text-text',
                    active === l.id && isHome && 'text-text',
                  )}
                  aria-current={active === l.id && isHome ? 'true' : undefined}
                >
                  {active === l.id && isHome && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-surface-strong"
                      transition={{ duration: 0.5, ease }}
                    />
                  )}
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              href={profile.resumeUrl}
              download
              size="sm"
              icon={<Download width={14} height={14} />}
              className="hidden sm:inline-flex"
            >
              Download CV
            </Button>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full text-text transition-colors hover:bg-surface-strong md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[95] flex flex-col bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.4 }}
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <li key={l.id} className="overflow-hidden">
                  <motion.button
                    type="button"
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '110%', transition: { duration: 0.3 } }}
                    transition={{ duration: 0.7, ease, delay: 0.05 + i * 0.06 }}
                    onClick={() => go(l.id)}
                    className="flex w-full items-baseline gap-4 py-3 text-left font-display text-4xl font-bold tracking-tight text-text"
                  >
                    <span className="font-mono text-xs text-accent">0{i + 1}</span>
                    {l.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-auto flex flex-col gap-3"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6, ease }}
            >
              <Button href={profile.resumeUrl} download size="lg" icon={<Download />}>
                Download CV
              </Button>
              <Button href={`mailto:${profile.email}`} variant="outline" size="lg">
                Hire me
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
