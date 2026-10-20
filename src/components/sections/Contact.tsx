import { useEffect, useState } from 'react'
import { profile } from '@/data/profile'
import { formatLocalTime } from '@/lib/utils'
import { useToast } from '@/components/ui/Toast'
import { Button } from '@/components/ui/Button'
import { TextReveal } from '@/components/ui/TextReveal'
import { ContactForm } from './ContactForm'
import { ArrowUpRight, Copy, Download, Eye, Github, Instagram, Linkedin, Mail, Phone, Tableau } from '@/components/ui/Icons'

export function Contact() {
  const { toast } = useToast()
  const [time, setTime] = useState(() => formatLocalTime(profile.timezone))
  const [phoneVisible, setPhoneVisible] = useState(false)

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatLocalTime(profile.timezone)), 15000)
    return () => window.clearInterval(id)
  }, [])

  const copy = async (value: string, label: string) => {
    try {
      await navigator.clipboard.writeText(value)
      toast(`${label} copied`)
    } catch {
      toast(`Could not copy — ${value}`)
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section container-x">
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <span className="pill !border-accent/30 !bg-accent/10 !text-accent">
          <span className="animate-pulse-dot size-1.5 rounded-full bg-accent" />
          {profile.availability}
        </span>
        <span className="pill tabular-nums">{profile.location} · {time} IST</span>
      </div>

      <TextReveal as="h2" id="contact-title" text={"Let's build something\nremarkable."} className="display-xl text-text" />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="max-w-md text-lg text-text-secondary">
            Hiring a PM for an AI product, or want a second brain on a hard roadmap call? I reply to every real message.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`} size="lg" magnetic icon={<ArrowUpRight />}>
              Hire me
            </Button>
            <Button href={profile.resumeUrl} download variant="outline" size="lg" icon={<Download />}>
              Resume
            </Button>
          </div>

          <ul className="mt-10 divide-y divide-border border-y border-border">
            <li className="flex items-center justify-between gap-4 py-4">
              <a href={`mailto:${profile.email}`} className="link-underline flex items-center gap-3 text-text">
                <Mail className="text-text-tertiary" /> {profile.email}
              </a>
              <button type="button" onClick={() => copy(profile.email, 'Email')} aria-label="Copy email address" className="grid size-9 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent">
                <Copy width={14} height={14} />
              </button>
            </li>
            <li className="flex items-center justify-between gap-4 py-4">
              {phoneVisible ? (
                <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="link-underline flex items-center gap-3 text-text">
                  <Phone className="text-text-tertiary" /> {profile.phone}
                </a>
              ) : (
                <button type="button" onClick={() => setPhoneVisible(true)} className="flex items-center gap-3 text-text-secondary transition-colors hover:text-text" title="Reveal phone number">
                  <Phone className="text-text-tertiary" />
                  <span className="font-mono tracking-widest">+91 ••••• •••••</span>
                  <span className="pill !py-0.5 !text-[10px]"><Eye width={11} height={11} /> Reveal</span>
                </button>
              )}
              {phoneVisible && (
                <button type="button" onClick={() => copy(profile.phone, 'Phone number')} aria-label="Copy phone number" className="grid size-9 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent">
                  <Copy width={14} height={14} />
                </button>
              )}
            </li>
            {[
              { href: profile.linkedin, label: 'LinkedIn', text: 'linkedin.com/in/aniket-kumar-ray', Icon: Linkedin },
              { href: profile.github, label: 'GitHub', text: 'github.com/aniketkumarray', Icon: Github },
              { href: profile.tableau, label: 'Tableau Public', text: 'public.tableau.com', Icon: Tableau },
              { href: profile.instagram, label: 'Instagram', text: 'instagram.com/rayclicks.1', Icon: Instagram },
            ].map(({ href, label, text, Icon }) => (
              <li key={label} className="py-4">
                <a href={href} target="_blank" rel="noreferrer" className="group flex items-center justify-between gap-4 text-text" title={label}>
                  <span className="flex items-center gap-3"><Icon className="text-text-tertiary" /> {text}</span>
                  <ArrowUpRight className="text-text-tertiary transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-6 md:p-8 lg:col-span-7">
          <p className="label-mono mb-6">Or send it from here</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
