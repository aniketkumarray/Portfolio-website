/**
 * Generates the hero scroll-sequence frames from source-assets/hero-video.mp4.
 *
 *   npm run frames
 *   FRAMES_FPS=24 npm run frames   (denser sequence; default 12)
 *
 * Output:
 *   public/frames/frame_0001.webp ...        (1280x720, q80  — source is 720p, upscaling adds no detail)
 *   public/frames-mobile/frame_0001.webp ... (960x540,  q70)
 *   public/video-poster.webp                 (1280 wide, q70)
 *   src/data/frames.json                     ({ count })
 */
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import ffmpeg from 'ffmpeg-static'

const root = resolve(import.meta.dirname, '..')
const source = resolve(root, 'source-assets/hero-video.mp4')
const desktopDir = resolve(root, 'public/frames')
const mobileDir = resolve(root, 'public/frames-mobile')
const poster = resolve(root, 'public/video-poster.webp')
const meta = resolve(root, 'src/data/frames.json')

const FPS = process.env.FRAMES_FPS ?? '12'
const DESKTOP = process.env.FRAMES_DESKTOP ?? '1280:720'
const MOBILE = process.env.FRAMES_MOBILE ?? '960:540'

if (!existsSync(source)) {
  console.error(`Missing ${source}. Place the hero video at source-assets/hero-video.mp4.`)
  process.exit(1)
}

for (const dir of [desktopDir, mobileDir]) {
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
}

const run = (args) =>
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })

const scale = (size) => `fps=${FPS},scale=${size}:force_original_aspect_ratio=increase,crop=${size.replace(':', ':')}`

console.log(`Generating desktop frames (${DESKTOP} @ ${FPS}fps)...`)
run([
  '-i', source,
  '-vf', scale(DESKTOP),
  '-c:v', 'libwebp', '-quality', '80', '-compression_level', '6',
  '-start_number', '1', resolve(desktopDir, 'frame_%04d.webp'),
])

console.log(`Generating mobile frames (${MOBILE} @ ${FPS}fps)...`)
run([
  '-i', source,
  '-vf', scale(MOBILE),
  '-c:v', 'libwebp', '-quality', '70', '-compression_level', '6',
  '-start_number', '1', resolve(mobileDir, 'frame_%04d.webp'),
])

console.log('Generating poster...')
run(['-i', resolve(desktopDir, 'frame_0001.webp'), '-vf', 'scale=1280:-1', '-quality', '70', poster])

const count = readdirSync(desktopDir).filter((f) => f.endsWith('.webp')).length
mkdirSync(resolve(root, 'src/data'), { recursive: true })
writeFileSync(meta, JSON.stringify({ count }, null, 2) + '\n')
console.log(`Done: ${count} frames per set.`)
