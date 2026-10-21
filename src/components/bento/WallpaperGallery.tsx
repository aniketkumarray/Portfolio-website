import { photos, profile } from '@/data/profile'
import { Img } from '@/components/ui/Media'
import { ArrowUpRight, Instagram } from '@/components/ui/Icons'

export function WallpaperGallery() {
  const items = [...photos, ...photos]
  return (
    <div className="card group relative h-full min-h-[300px] overflow-hidden md:min-h-0" aria-label="Photography by Aniket">
      <div className="mask-fade-y absolute inset-0 flex items-center">
        <div className="animate-slide-horizontal pause-on-hover flex w-max gap-3 px-3">
          {items.map((p, i) => (
            <div key={`${p.src}-${i}`} className="h-[220px] w-[160px] shrink-0 overflow-hidden rounded-2xl md:h-[260px] md:w-[190px]">
              <Img src={p.src} alt={i < photos.length ? p.alt : ''} seed={i} loading="lazy" width={190} height={260} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-bg/90 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-bg/90 to-transparent" />
      <p className="label-mono absolute left-5 top-5 text-text-secondary">Through my lens</p>
      <a
        href={profile.instagram}
        target="_blank"
        rel="noreferrer"
        className="absolute bottom-4 left-5 right-5 flex items-center justify-between gap-3 text-sm text-text"
      >
        <span className="flex items-center gap-2">
          <Instagram className="text-text-secondary" />
          <span>
            <span className="font-medium">{profile.instagramHandle}</span>
            <span className="text-text-secondary"> · {profile.instagramBio}</span>
          </span>
        </span>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border bg-bg/60 backdrop-blur transition-colors group-hover:border-accent group-hover:text-accent">
          <ArrowUpRight width={14} height={14} />
        </span>
      </a>
    </div>
  )
}
