import { useParams } from 'react-router-dom'
import { projects } from '@/data/profile'

/**
 * Dev-only cover generator: renders a 1280x720 project cover from the design
 * system so case-study art stays consistent. Screenshot at /__cover/:slug.
 */
export function Cover() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const p = projects[index]
  if (!p) return <p className="p-10">Unknown slug</p>

  const nodes = p.architecture.nodes
  const edges = p.architecture.edges
  // Simple left-to-right lane layout for the hero flow.
  const depth = new Map<string, number>()
  const incoming = new Map<string, string[]>()
  nodes.forEach((n) => incoming.set(n.id, []))
  edges.forEach((e) => incoming.get(e.to)?.push(e.from))
  const resolve = (id: string, seen = new Set<string>()): number => {
    if (depth.has(id)) return depth.get(id)!
    if (seen.has(id)) return 0
    seen.add(id)
    const parents = incoming.get(id) ?? []
    const d = parents.length ? Math.max(...parents.map((x) => resolve(x, seen))) + 1 : 0
    depth.set(id, d)
    return d
  }
  nodes.forEach((n) => resolve(n.id))
  const cols = new Map<number, typeof nodes>()
  nodes.forEach((n) => cols.set(depth.get(n.id)!, [...(cols.get(depth.get(n.id)!) ?? []), n]))
  const colCount = cols.size
  const W = 1280
  const H = 720
  const laneW = 750 / Math.max(colCount, 1)
  const nodeW = Math.min(156, laneW - 30)
  const half = nodeW / 2
  const pos = new Map<string, { x: number; y: number }>()
  cols.forEach((col, c) => {
    col.forEach((n, r) => {
      const y = 360 + (r - (col.length - 1) / 2) * 92
      pos.set(n.id, { x: 500 + c * laneW + laneW / 2, y })
    })
  })

  return (
    <div
      id="cover"
      style={{ width: W, height: H }}
      className="relative overflow-hidden bg-[#07070a] font-sans text-text"
    >
      {/* grid + glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse at 70% 50%, black 30%, transparent 80%)',
        }}
      />
      <div
        aria-hidden
        className="absolute -right-40 top-1/2 size-[720px] -translate-y-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(circle, rgba(255, 176, 32,0.5), transparent 62%)' }}
      />
      <div
        aria-hidden
        className="absolute -bottom-60 -left-20 size-[520px] rounded-full opacity-50"
        style={{ background: 'radial-gradient(circle, rgba(255, 176, 32,0.18), transparent 60%)' }}
      />

      {/* flow diagram */}
      <svg aria-hidden className="absolute inset-0" width={W} height={H}>
        <defs>
          <marker id="c-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill="rgba(255, 176, 32,0.9)" />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = pos.get(e.from)
          const b = pos.get(e.to)
          if (!a || !b) return null
          const x1 = a.x + half
          const x2 = b.x - half
          const cx = (x1 + x2) / 2
          return (
            <path
              key={i}
              d={`M${x1},${a.y} C${cx},${a.y} ${cx},${b.y} ${x2},${b.y}`}
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth={1.5}
              markerEnd="url(#c-arrow)"
            />
          )
        })}
        {nodes.map((n) => {
          const q = pos.get(n.id)!
          return (
            <g key={n.id} transform={`translate(${q.x - half},${q.y - 30})`}>
              <rect width={nodeW} height={60} rx={14} fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.16)" />
              <text x={14} y={n.sub ? 26 : 35} fontSize={12} fontWeight={600} fill="#F5F5F7" fontFamily="Satoshi, sans-serif" {...(n.label.length * 6.4 > nodeW - 24 ? { textLength: nodeW - 24, lengthAdjust: 'spacingAndGlyphs' } : {})}>
                {n.label}
              </text>
              {n.sub && (
                <text x={14} y={44} fontSize={9.5} fill="rgba(245,245,247,0.55)" fontFamily="JetBrains Mono, monospace" {...(n.sub.length * 5.8 > nodeW - 24 ? { textLength: nodeW - 24, lengthAdjust: 'spacingAndGlyphs' } : {})}>
                  {n.sub}
                </text>
              )}
            </g>
          )
        })}
      </svg>

      {/* left copy */}
      <div className="absolute inset-y-0 left-0 flex w-[460px] flex-col justify-between p-14">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          <span className="text-accent">{String(index + 1).padStart(2, '0')}</span> · {p.category}
        </p>
        <div>
          <h1 className="font-display text-[52px] font-bold leading-[0.98] tracking-[-0.04em] text-text">{p.title}</h1>
          <p className="mt-5 max-w-[360px] text-[17px] leading-snug text-text-secondary">{p.kicker}</p>
          <div className="mt-7 flex flex-wrap gap-2">
            {p.stack.slice(0, 4).map((s) => (
              <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-[11px] text-text-secondary">
                {s}
              </span>
            ))}
          </div>
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">{p.context}</p>
      </div>

      {/* metrics strip */}
      <div className="absolute bottom-10 right-14 flex gap-8">
        {p.metrics.slice(0, 2).map((m) => (
          <div key={m.label}>
            <p className="font-display text-3xl font-bold tracking-tight text-accent">{m.value}</p>
            <p className="mt-1 text-xs text-text-secondary">{m.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
