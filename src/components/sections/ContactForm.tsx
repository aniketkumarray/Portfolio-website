import { useId, useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { formConfigured, useContactForm } from '@/hooks/useContactForm'
import { cn } from '@/lib/utils'
import { Send } from '@/components/ui/Icons'

interface Props {
  /** Compact: single-line input + send (bento). Full: name/email/message. */
  compact?: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

export function ContactForm({ compact = false }: Props) {
  const id = useId()
  const { status, error, submit, reset } = useContactForm()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('')
  const [step, setStep] = useState<'message' | 'email'>('message')

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (compact && step === 'message') {
      if (message.trim().length < 10) {
        await submit({ email: '', message, company })
        return
      }
      setStep('email')
      return
    }
    await submit({ name, email, message, company })
  }

  const inputBase =
    'w-full rounded-full border border-border bg-surface px-5 text-[15px] text-text placeholder:text-text-tertiary transition-colors focus:border-accent focus:outline-none'

  if (status === 'success') {
    return (
      <div aria-live="polite" className="overflow-hidden">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease }}
          className="flex items-center justify-between gap-4 rounded-2xl border border-accent/30 bg-accent/10 px-5 py-4"
        >
          <div>
            <p className="font-medium text-text">Message sent — thanks for reaching out.</p>
            <p className="text-sm text-text-secondary">
              {formConfigured ? "I'll reply within a day or two." : 'Your email client should have opened with the message pre-filled.'}
            </p>
          </div>
          <button type="button" onClick={() => { reset(); setStep('message'); setMessage(''); }} className="link-underline shrink-0 text-sm text-text-secondary">
            Send another
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      {/* Honeypot */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={`${id}-company`}>Company</label>
        <input id={`${id}-company`} name="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      {compact ? (
        <div className="flex flex-col gap-3">
          <label htmlFor={`${id}-compact`} className="label-mono">
            {step === 'message' ? 'Drop me a line' : 'Where should I reply?'}
          </label>
          <div className="flex gap-2">
            <AnimatePresence mode="wait" initial={false}>
              {step === 'message' ? (
                <motion.input
                  key="m"
                  id={`${id}-compact`}
                  type="text"
                  placeholder="What are you building?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={cn(inputBase, 'h-12')}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3 }}
                  aria-invalid={status === 'error'}
                  aria-describedby={`${id}-status`}
                />
              ) : (
                <motion.input
                  key="e"
                  id={`${id}-compact`}
                  type="email"
                  placeholder="you@company.com"
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(inputBase, 'h-12')}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 12 }}
                  transition={{ duration: 0.3 }}
                  aria-invalid={status === 'error'}
                  aria-describedby={`${id}-status`}
                />
              )}
            </AnimatePresence>
            <button
              type="submit"
              disabled={status === 'loading'}
              aria-label={step === 'message' ? 'Continue' : 'Send message'}
              className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-[transform,box-shadow] hover:shadow-glow active:scale-95 disabled:opacity-60"
            >
              {status === 'loading' ? <Spinner /> : <Send />}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className="label-mono mb-2 block">Name</label>
            <input id={`${id}-name`} name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={cn(inputBase, 'h-12')} placeholder="Your name" />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className="label-mono mb-2 block">Email</label>
            <input id={`${id}-email`} name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={cn(inputBase, 'h-12')} placeholder="you@company.com" aria-invalid={status === 'error'} aria-describedby={`${id}-status`} />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${id}-message`} className="label-mono mb-2 block">Message</label>
            <textarea id={`${id}-message`} name="message" required rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={cn(inputBase, 'rounded-3xl py-4')} placeholder="Tell me about the role, the product, or the problem." aria-describedby={`${id}-status`} />
          </div>
          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-medium text-accent-ink transition-[transform,box-shadow] hover:shadow-glow active:scale-[0.97] disabled:opacity-60"
            >
              {status === 'loading' ? <Spinner /> : <Send />}
              {status === 'loading' ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </div>
      )}

      <p id={`${id}-status`} aria-live="polite" className={cn('mt-2 min-h-5 text-sm', error ? 'text-red-300' : 'text-text-tertiary')}>
        {error ?? (!formConfigured && !compact ? 'Opens your email client with the message pre-filled.' : '')}
      </p>
    </form>
  )
}

function Spinner() {
  return (
    <span aria-hidden className="size-4 animate-spin rounded-full border-2 border-accent-ink/30 border-t-accent-ink" />
  )
}
