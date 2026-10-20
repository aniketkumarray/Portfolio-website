import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useMagnetic } from '@/hooks/useMagnetic'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap select-none transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out-expo focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 active:scale-[0.97] disabled:opacity-50 disabled:pointer-events-none'

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-accent-ink hover:shadow-glow hover:bg-[#ffc24d]',
  ghost: 'text-text hover:bg-surface-strong',
  outline:
    'border border-border-strong text-text hover:border-accent hover:text-accent bg-surface',
}

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-6 text-sm',
  lg: 'h-14 px-8 text-base',
}

interface CommonProps {
  variant?: Variant
  size?: Size
  magnetic?: boolean
  icon?: ReactNode
  children?: ReactNode
  className?: string
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined; to?: undefined }
type AnchorProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: undefined }
type LinkProps = CommonProps & { to: string; href?: undefined; 'aria-label'?: string }

export type Props = ButtonProps | AnchorProps | LinkProps

function Inner({ icon, children }: { icon?: ReactNode; children?: ReactNode }) {
  return (
    <>
      <span>{children}</span>
      {icon && <span className="transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  )
}

export const Button = forwardRef<HTMLElement, Props>(function Button(props, forwardedRef) {
  const { variant = 'primary', size = 'md', magnetic = false, icon, children, className } = props
  const magneticRef = useMagnetic<HTMLElement>(magnetic ? 0.25 : 0)
  const classes = cn('group', base, variants[variant], sizes[size], className)
  const setRef = (node: HTMLElement | null) => {
    ;(magneticRef as React.MutableRefObject<HTMLElement | null>).current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  if ('to' in props && props.to) {
    const { to, ...rest } = props
    return (
      <Link to={to} ref={setRef as never} className={classes} aria-label={rest['aria-label']}>
        <Inner icon={icon}>{children}</Inner>
      </Link>
    )
  }
  if ('href' in props && props.href) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, magnetic: _m, icon: _i, className: _c, ...rest } = props
    return (
      <a ref={setRef as never} className={classes} {...rest}>
        <Inner icon={icon}>{children}</Inner>
      </a>
    )
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, magnetic: _m, icon: _i, className: _c, ...rest } = props as ButtonProps
  return (
    <button ref={setRef as never} className={classes} type="button" {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  )
})
