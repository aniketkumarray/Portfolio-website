import type { ProjectSlug } from './slugs'

export type Proficiency = 'Daily' | 'Comfortable' | 'Familiar'

export interface Skill {
  name: string
  level: Proficiency
  note?: string
}

export interface Experience {
  company: string
  role: string
  period: string
  location: string
  summary: string
  bullets: string[]
  stack: string[]
  url?: string
}

export interface Education {
  school: string
  degree: string
  period: string
  highlights: string[]
}

export interface Certification {
  name: string
  issuer: string
  year?: string
  url?: string
}

export interface Award {
  title: string
  issuer: string
  description: string
  /** Optional image path under /public (e.g. /awards/dashing-debut.webp). Rendered when present. */
  image?: string
}

export type ProjectCategory = 'AI Products' | 'Platforms' | 'Prototypes' | 'Analytics'

export interface ProjectMetric {
  value: string
  label: string
}

export interface ArchitectureNode {
  id: string
  label: string
  sub?: string
}

export interface ArchitectureEdge {
  from: string
  to: string
  label?: string
}

export interface Project {
  slug: ProjectSlug
  title: string
  kicker: string
  summary: string
  category: ProjectCategory
  featured: boolean
  role: string
  timeline: string
  context: string
  stack: string[]
  image?: string
  video?: string
  liveUrl?: string
  repoUrl?: string
  demoUrl?: string
  problem: string[]
  approach: string[]
  results: string[]
  metrics: ProjectMetric[]
  architecture: {
    nodes: ArchitectureNode[]
    edges: ArchitectureEdge[]
  }
}
