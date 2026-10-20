import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = { width: 18, height: 18, fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

export const ArrowUpRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M7 17 17 7M8 7h9v9" /></svg>
)
export const ArrowRight = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)
export const ArrowDown = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 5v14M6 13l6 6 6-6" /></svg>
)
export const ArrowUp = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 19V5M6 11l6-6 6 6" /></svg>
)
export const Download = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 3v12M7 10l5 5 5-5M4 21h16" /></svg>
)
export const Mail = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const Phone = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
)
export const Copy = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></svg>
)
export const Check = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="m5 12 5 5L20 7" /></svg>
)
export const Close = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const Menu = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 8h16M4 16h16" /></svg>
)
export const Play = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} fill="currentColor" stroke="none" {...p}><path d="M8 5.5v13l11-6.5z" /></svg>
)
export const Pause = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} fill="currentColor" stroke="none" {...p}><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
)
export const Volume = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 10v4h4l5 4V6l-5 4zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11" /></svg>
)
export const VolumeOff = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M4 10v4h4l5 4V6l-5 4zM17 9l4 6M21 9l-4 6" /></svg>
)
export const Send = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M21 3 3 10l8 3 3 8z" /><path d="m11 13 10-10" /></svg>
)
export const Plus = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
)
export const Eye = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
)
export const Github = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2.1c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
export const Linkedin = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
)
export const Instagram = (p: P) => (
  <svg viewBox="0 0 24 24" {...base} {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
)
export const Tableau = (p: P) => (
  <svg viewBox="0 0 24 24" width={18} height={18} fill="currentColor" {...p}>
    <path d="M11.2 2h1.6v3.1h2.9v1.5h-2.9v3.1h-1.6V6.6H8.3V5.1h2.9V2Zm-6.5 4.2h1.2v2.3h2.2v1.2H5.9V12H4.7V9.7H2.5V8.5h2.2V6.2Zm12.4 0h1.2v2.3h2.2v1.2h-2.2V12h-1.2V9.7h-2.2V8.5h2.2V6.2ZM11 10.6h2v3.9h3.7v1.9H13v3.9h-2v-3.9H7.3v-1.9H11v-3.9Zm-6.3 6h1.2v2.3h2.2v1.2H5.9V22H4.7v-2.1H2.5v-1.2h2.2v-2.1Zm12.4 0h1.2v2.3h2.2v1.2h-2.2V22h-1.2v-2.1h-2.2v-1.2h2.2v-2.1Z" />
  </svg>
)
