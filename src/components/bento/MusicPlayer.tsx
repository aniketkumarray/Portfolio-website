import { useEffect, useRef, useState } from 'react'
import { music } from '@/data/profile'
import { cn } from '@/lib/utils'
import { Img } from '@/components/ui/Media'
import { Pause, Play } from '@/components/ui/Icons'

const BARS = 16

export function MusicPlayer() {
  const audio = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden && audio.current && !audio.current.paused) {
        audio.current.pause()
        setPlaying(false)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [])

  const toggle = async () => {
    const a = audio.current
    if (!a) return
    if (a.paused) {
      try {
        await a.play()
        setPlaying(true)
      } catch {
        setPlaying(false)
      }
    } else {
      a.pause()
      setPlaying(false)
    }
  }

  return (
    <div className="card relative flex h-full min-h-[120px] items-center gap-4 overflow-hidden p-4 md:gap-5 md:p-5">
      <div aria-hidden className="absolute inset-0 -z-0 opacity-40">
        <Img src={music.art} alt="" seed={5} className="h-full w-full scale-110 object-cover blur-2xl" />
      </div>
      <div className="absolute inset-0 bg-bg/60" />

      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl shadow-lg md:size-20">
        <Img src={music.art} alt={`${music.title} album art`} loading="lazy" width={80} height={80} seed={5} className={cn('h-full w-full object-cover transition-transform duration-[4s]', playing && 'scale-110')} />
      </div>

      <div className="relative min-w-0 flex-1">
        <p className="label-mono mb-1">Now playing</p>
        <p className="truncate font-display text-lg font-bold text-text">{music.title}</p>
        <p className="truncate text-sm text-text-secondary">{music.artist}</p>
        <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full bg-accent transition-[width] duration-300 ease-linear" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="relative hidden h-8 items-end gap-[3px] sm:flex md:hidden lg:flex" aria-hidden>
        {Array.from({ length: BARS }).map((_, i) => (
          <span
            key={i}
            className={cn('w-[3px] rounded-full bg-accent/80', playing ? `animate-music-bar-${(i % 3) + 1}` : 'h-1')}
            style={{ animationDelay: `${(i * 0.07) % 0.6}s` }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pause ${music.title}` : `Play ${music.title}`}
        aria-pressed={playing}
        className="relative grid size-12 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform hover:scale-105 active:scale-95"
      >
        {playing ? <Pause /> : <Play />}
      </button>

      <audio
        ref={audio}
        src={music.src}
        preload="none"
        onEnded={() => setPlaying(false)}
        onTimeUpdate={(e) => {
          const a = e.currentTarget
          if (a.duration) setProgress((a.currentTime / a.duration) * 100)
        }}
      />
    </div>
  )
}
