/**
 * Asset normalisation. Heavy originals live in source-assets/ (not served);
 * compressed web versions are written to public/.
 *
 *   npm run assets
 *
 *  - public/"Hero video.mp4"      -> source-assets/hero-video.mp4
 *  - public/mine.jpg              -> source-assets/mine.jpg, public/mine_pic.webp (1200px, q82)
 *  - public/carchase.mp4          -> source-assets/, public/carchase.mp4 (720p, crf 28, audio 96k)
 *  - public/*-demo.mp4            -> source-assets/, public/*-demo.mp4 (720p, crf 30, audio 96k) + poster
 *  - public/og-image.png          (1200x630) from the hero poster
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, renameSync } from 'node:fs'
import { resolve } from 'node:path'
import ffmpeg from 'ffmpeg-static'

const root = resolve(import.meta.dirname, '..')
const pub = resolve(root, 'public')
const src = resolve(root, 'source-assets')
mkdirSync(src, { recursive: true })

const force = process.argv.includes('--force')
const run = (args) => {
  const out = args[args.length - 1]
  if (!force && existsSync(out)) {
    console.log(`Skip (exists): ${out.replace(root, '.')}`)
    return
  }
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
}

const stash = (from, to) => {
  const a = resolve(pub, from)
  const b = resolve(src, to)
  if (existsSync(a) && !existsSync(b)) {
    renameSync(a, b)
    console.log(`Moved ${from} -> source-assets/${to}`)
  }
  return existsSync(b) ? b : null
}

stash('Hero video.mp4', 'hero-video.mp4')

const photo = stash('mine.jpg', 'mine.jpg')
if (photo) {
  run(['-i', photo, '-vf', 'scale=1200:-1', '-quality', '82', resolve(pub, 'mine_pic.webp')])
  console.log('Created mine_pic.webp')
}

const car = stash('carchase.mp4', 'carchase.mp4')
if (car) {
  run([
    '-i', car, '-t', '20',
    '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', resolve(pub, 'carchase.mp4'),
  ])
  run(['-ss', '1', '-i', car, '-frames:v', '1', '-vf', 'scale=1280:-1', '-quality', '75', resolve(pub, 'carchase-poster.webp')])
  console.log('Created carchase.mp4 (web) + poster')
}

for (const name of ['moneymap-demo', 'task-tracker-demo']) {
  const original = stash(`${name}.mp4`, `${name}.mp4`)
  if (!original) continue
  run([
    '-i', original,
    '-vf', 'scale=1280:-2', '-c:v', 'libx264', '-preset', 'slow', '-crf', '30', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', resolve(pub, `${name}.mp4`),
  ])
  run(['-ss', '2', '-i', original, '-frames:v', '1', '-vf', 'scale=1280:-1', '-quality', '75', resolve(pub, `${name}-poster.webp`)])
  console.log(`Created ${name}.mp4 (web) + poster`)
}

const poster = resolve(pub, 'video-poster.webp')
if (existsSync(poster)) {
  run([
    '-i', poster,
    '-vf', 'scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630,eq=brightness=-0.12',
    resolve(pub, 'og-image.png'),
  ])
  console.log('Created og-image.png')
}
