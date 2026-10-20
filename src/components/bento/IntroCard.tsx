import { profile } from '@/data/profile'
import { Counter } from '@/components/ui/Counter'
import { ContactForm } from '@/components/sections/ContactForm'

export function IntroCard() {
  return (
    <div className="card flex h-full flex-col p-6 md:p-8">
      <p className="label-mono">Hello</p>
      <h3 className="display-md mt-3 text-text">
        Hi, I'm {profile.firstName}<span className="text-accent">.</span>
      </h3>
      <p className="mt-4 max-w-2xl text-base text-text-secondary md:text-[1.0625rem]">{profile.about[0]}</p>
      <p className="mt-3 max-w-2xl text-base text-text-secondary md:text-[1.0625rem]">{profile.about[2]}</p>

      <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {profile.stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface px-4 py-3">
            <dt className="order-2 text-[11px] leading-tight text-text-tertiary">{s.label}</dt>
            <dd className="font-display text-3xl font-bold text-text">
              <Counter value={s.value} prefix={'prefix' in s ? s.prefix : ''} suffix={'suffix' in s ? s.suffix : ''} />
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 border-t border-border pt-5">
        <ContactForm compact />
      </div>
    </div>
  )
}
