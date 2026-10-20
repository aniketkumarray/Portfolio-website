import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { TextReveal } from './TextReveal'

interface Props {
  index: string
  label: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
  id?: string
}

export function SectionHeader({ index, label, title, description, align = 'left', className, id }: Props) {
  return (
    <div className={cn('mb-12 md:mb-16', align === 'center' && 'text-center', className)}>
      <p className="label-mono mb-5 flex items-center gap-3">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-8 bg-border-strong" />
        <span>{label}</span>
      </p>
      <TextReveal as="h2" id={id} className="display-lg max-w-4xl text-text" text={title} />
      {description && (
        <p className={cn('mt-6 max-w-xl text-lg text-text-secondary', align === 'center' && 'mx-auto')}>
          {description}
        </p>
      )}
    </div>
  )
}
