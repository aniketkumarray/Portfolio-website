import { wallpapers } from '@/data/profile'
import { Img } from '@/components/ui/Media'

export function WallpaperGallery() {
  const items = [...wallpapers, ...wallpapers]
  return (
    <div className="card group relative h-full min-h-[260px] overflow-hidden md:min-h-0" aria-label="Visual inspiration gallery">
      <div className="mask-fade-y absolute inset-0 flex items-center">
        <div className="animate-slide-horizontal pause-on-hover flex w-max gap-3 px-3">
          {items.map((src, i) => (
            <div key={`${src}-${i}`} className="h-[220px] w-[160px] shrink-0 overflow-hidden rounded-2xl md:h-[260px] md:w-[190px]">
              <Img src={src} alt="" seed={i} loading="lazy" width={190} height={260} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-bg/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg/80 to-transparent" />
      <p className="label-mono absolute left-5 top-5 text-text-secondary">Taste</p>
    </div>
  )
}
