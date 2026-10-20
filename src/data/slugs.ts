// Kept dependency-free so vite.config.ts can import it for the sitemap.
export const projectSlugs = [
  'ai-assignment-checker',
  'resume-recommender',
  'wingz-rag-support',
  'job-sourcing-automation',
  'task-tracker',
  'interview-peer',
  'moneymap',
  'rag-learning-lab',
] as const

export type ProjectSlug = (typeof projectSlugs)[number]
