export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v))

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/** Map progress p from [a, b] to [0, 1], clamped. */
export const range = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1)

export const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia('(hover: none)').matches || navigator.maxTouchPoints > 0)

export const isLowPowerDevice = () => {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }
  return (
    (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
    (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
    Boolean(nav.connection?.saveData)
  )
}

export const formatLocalTime = (timeZone: string, date = new Date()) =>
  new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone,
  }).format(date)

export const idle = (cb: () => void, timeout = 1500) => {
  if (typeof window === 'undefined') return () => {}
  const w = window as Window & {
    requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
    cancelIdleCallback?: (id: number) => void
  }
  if (w.requestIdleCallback) {
    const id = w.requestIdleCallback(cb, { timeout })
    return () => w.cancelIdleCallback?.(id)
  }
  const id = window.setTimeout(cb, 1)
  return () => window.clearTimeout(id)
}

export const pad = (n: number, width = 2) => String(n).padStart(width, '0')

export const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
