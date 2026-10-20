import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string
  alt: string
  /** Fallback gradient hue seed when the image is missing. */
  seed?: number
}

/** Image with a blurred-gradient fallback so a missing asset never renders broken. */
export function Img({ src, alt, className, seed = 0, ...rest }: Props) {
  const [failed, setFailed] = useState(!src)
  const hue = (seed * 47) % 360
  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn('h-full w-full', className)}
        style={{
          background: `radial-gradient(120% 120% at 20% 10%, hsl(${hue} 60% 25% / 0.9), transparent 60%), radial-gradient(100% 100% at 90% 90%, hsl(${(hue + 60) % 360} 70% 30% / 0.8), #0b0b0f 70%)`,
          filter: 'blur(0.5px)',
        }}
      />
    )
  }
  return <img src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />
}
