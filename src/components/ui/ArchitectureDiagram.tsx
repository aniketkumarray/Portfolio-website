import { useMemo } from 'react'
import type { ArchitectureEdge, ArchitectureNode } from '@/data/types'

interface Props {
  nodes: ArchitectureNode[]
  edges: ArchitectureEdge[]
  title?: string
}

const NODE_W = 170
const NODE_H = 56
const GAP_X = 120
const GAP_Y = 36

/**
 * Lays nodes out in columns by longest-path depth from sources, then draws
 * curved edges. Pure SVG, no runtime deps.
 */
export function ArchitectureDiagram({ nodes, edges, title = 'Architecture' }: Props) {
  const layout = useMemo(() => {
    const depth = new Map<string, number>()
    const incoming = new Map<string, string[]>()
    nodes.forEach((n) => incoming.set(n.id, []))
    edges.forEach((e) => incoming.get(e.to)?.push(e.from))
    const resolve = (id: string, seen = new Set<string>()): number => {
      if (depth.has(id)) return depth.get(id)!
      if (seen.has(id)) return 0
      seen.add(id)
      const parents = incoming.get(id) ?? []
      const d = parents.length ? Math.max(...parents.map((p) => resolve(p, seen))) + 1 : 0
      depth.set(id, d)
      return d
    }
    nodes.forEach((n) => resolve(n.id))

    const columns = new Map<number, ArchitectureNode[]>()
    nodes.forEach((n) => {
      const d = depth.get(n.id) ?? 0
      columns.set(d, [...(columns.get(d) ?? []), n])
    })
    const colCount = Math.max(...columns.keys()) + 1
    const rowCount = Math.max(...[...columns.values()].map((c) => c.length))
    const height = rowCount * NODE_H + (rowCount - 1) * GAP_Y
    const pos = new Map<string, { x: number; y: number }>()
    columns.forEach((col, c) => {
      const colH = col.length * NODE_H + (col.length - 1) * GAP_Y
      const offset = (height - colH) / 2
      col.forEach((n, r) => pos.set(n.id, { x: c * (NODE_W + GAP_X), y: offset + r * (NODE_H + GAP_Y) }))
    })
    const width = colCount * NODE_W + (colCount - 1) * GAP_X
    return { pos, width, height }
  }, [nodes, edges])

  const { pos, width, height } = layout
  const pad = 8

  return (
    <figure className="card overflow-x-auto p-6">
      <figcaption className="label-mono mb-5">{title}</figcaption>
      <svg
        viewBox={`${-pad} ${-pad} ${width + pad * 2} ${height + pad * 2}`}
        width={width + pad * 2}
        height={height + pad * 2}
        className="mx-auto h-auto min-w-[640px] max-w-full font-sans"
        role="img"
        aria-label={`${title} diagram: ${edges.map((e) => `${nodes.find((n) => n.id === e.from)?.label} to ${nodes.find((n) => n.id === e.to)?.label}`).join('; ')}`}
      >
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0 10 5 0 10z" fill="rgba(255, 176, 32,0.8)" />
          </marker>
        </defs>
        {edges.map((e, i) => {
          const a = pos.get(e.from)
          const b = pos.get(e.to)
          if (!a || !b) return null
          const x1 = a.x + NODE_W
          const y1 = a.y + NODE_H / 2
          const x2 = b.x
          const y2 = b.y + NODE_H / 2
          const cx = (x1 + x2) / 2
          const d = `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`
          return (
            <g key={i}>
              <path d={d} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={1.25} markerEnd="url(#arrow)" />
              {e.label && (
                <g>
                  <rect x={cx - e.label.length * 3.3 - 4} y={(y1 + y2) / 2 - 15} width={e.label.length * 6.6 + 8} height={16} rx={4} fill="#0b0b0f" stroke="rgba(255,255,255,0.1)" />
                  <text x={cx} y={(y1 + y2) / 2 - 4} textAnchor="middle" fontSize={10} fill="rgba(255, 176, 32,0.85)" fontFamily="JetBrains Mono, monospace">
                    {e.label}
                  </text>
                </g>
              )}
            </g>
          )
        })}
        {nodes.map((n) => {
          const p = pos.get(n.id)
          if (!p) return null
          return (
            <g key={n.id} transform={`translate(${p.x},${p.y})`}>
              <rect width={NODE_W} height={NODE_H} rx={12} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.14)" />
              <text x={14} y={n.sub ? 24 : 33} fontSize={13} fontWeight={600} fill="#F5F5F7">{n.label}</text>
              {n.sub && (
                <text x={14} y={41} fontSize={10.5} fill="rgba(245,245,247,0.55)" fontFamily="JetBrains Mono, monospace">{n.sub}</text>
              )}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}
