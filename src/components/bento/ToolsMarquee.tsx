import { tools } from '@/data/profile'
import { cn } from '@/lib/utils'

export function ToolsMarquee() {
  const items = [...tools, ...tools]
  return (
    <div className="card group relative flex h-full min-h-[120px] flex-col justify-center overflow-hidden px-0 py-5">
      <p className="label-mono absolute left-5 top-4">Tools I reach for</p>
      <div className="mask-fade-x mt-5 overflow-hidden">
        <ul className="animate-marquee pause-on-hover flex w-max items-center gap-10 px-5">
          {items.map((t, i) => (
            <li key={`${t.name}-${i}`} className="flex shrink-0 items-center gap-3 text-sm text-text-secondary">
              <img
                src={t.src}
                alt=""
                width={28}
                height={28}
                loading="lazy"
                className={cn('size-7 object-contain opacity-90', t.invert && 'invert')}
                onError={(e) => ((e.currentTarget as HTMLImageElement).style.visibility = 'hidden')}
              />
              <span className="whitespace-nowrap">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
