import { useCallback, useState } from 'react'
import { profile } from '@/data/profile'
import { isValidEmail } from '@/lib/utils'

export type FormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ContactPayload {
  name?: string
  email: string
  message: string
  /** Honeypot: must be empty. */
  company?: string
}

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

export const formConfigured = Boolean(ENDPOINT)

export function useContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle')
  const [error, setError] = useState<string | null>(null)

  const submit = useCallback(async (payload: ContactPayload) => {
    setError(null)
    if (payload.company) {
      // Bot filled the honeypot; pretend success without sending.
      setStatus('success')
      return
    }
    if (!isValidEmail(payload.email)) {
      setError('That email does not look right.')
      setStatus('error')
      return
    }
    if (payload.message.trim().length < 10) {
      setError('Tell me a little more — at least 10 characters.')
      setStatus('error')
      return
    }

    if (!ENDPOINT) {
      const subject = encodeURIComponent(`Portfolio message from ${payload.name || payload.email}`)
      const body = encodeURIComponent(`${payload.message}\n\n— ${payload.name || ''} (${payload.email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('success')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          message: payload.message,
          _subject: `Portfolio message from ${payload.name || payload.email}`,
        }),
      })
      if (!res.ok) throw new Error(`Request failed (${res.status})`)
      setStatus('success')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Try email instead.')
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
  }, [])

  return { status, error, submit, reset }
}
