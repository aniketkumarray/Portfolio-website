import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '@/data/profile'
import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'
import { Img } from '@/components/ui/Media'
import { TextReveal } from '@/components/ui/TextReveal'
import { ArchitectureDiagram } from '@/components/ui/ArchitectureDiagram'
import { ArrowRight, ArrowUpRight, Github, Play } from '@/components/ui/Icons'

const ease = [0.22, 1, 0.36, 1] as const

function Block({ index, title, items }: { index: string; title: string; items: string[] }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 0.8, ease }}
      aria-labelledby={`cs-${index}`}
      className="grid gap-6 border-t border-border py-12 md:grid-cols-12"
    >
      <div className="md:col-span-4">
        <p className="label-mono"><span className="text-accent">{index}</span></p>
        <h2 id={`cs-${index}`} className="mt-2 font-display text-2xl font-bold tracking-tight text-text md:text-3xl">{title}</h2>
      </div>
      <ul className="space-y-4 text-[1.0625rem] text-text-secondary md:col-span-8">
        {items.map((t) => (
          <li key={t} className="flex gap-3">
            <span aria-hidden className="mt-3 size-1 shrink-0 rounded-full bg-accent" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </motion.section>
  )
}

export function CaseStudy() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!project || !next) return <Navigate to="/404" replace />

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.summary,
    author: { '@type': 'Person', name: 'Aniket Kumar Ray' },
    url: `${import.meta.env.VITE_SITE_URL ?? ''}/projects/${project.slug}`,
  }

  return (
    <article className="container-x pb-24 pt-32">
      <Seo title={project.title} description={project.summary} path={`/projects/${project.slug}`} image={project.image} type="article" jsonLd={jsonLd} />

      <nav aria-label="Breadcrumb" className="label-mono mb-8 flex items-center gap-2">
        <Link to="/#projects" className="link-underline hover:text-text">Projects</Link>
        <span aria-hidden>/</span>
        <span className="text-text-secondary">{project.title}</span>
      </nav>

      <p className="label-mono text-accent">{project.category}</p>
      <TextReveal as="h1" text={project.title} immediate className="display-lg mt-4 text-text" />
      <p className="mt-6 max-w-3xl text-xl text-text-secondary md:text-2xl">{project.kicker}</p>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease, delay: 0.2 }}
        className="card mt-12 overflow-hidden"
      >
        {project.video ? (
          <video src={project.video} poster={project.image} controls playsInline preload="metadata" className="aspect-video w-full object-cover" aria-label={`${project.title} walkthrough`} />
        ) : (
          <Img src={project.image} alt={`${project.title} hero`} seed={project.title.length} {...{ fetchpriority: 'high' }} width={1280} height={720} className="aspect-video w-full object-cover" />
        )}
      </motion.div>

      <dl className="mt-10 grid gap-6 border-b border-border pb-10 sm:grid-cols-2 lg:grid-cols-4">
        <div><dt className="label-mono">Role</dt><dd className="mt-2 text-text">{project.role}</dd></div>
        <div><dt className="label-mono">Timeline</dt><dd className="mt-2 text-text">{project.timeline}</dd></div>
        <div><dt className="label-mono">Context</dt><dd className="mt-2 text-text">{project.context}</dd></div>
        <div>
          <dt className="label-mono">Stack</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">{project.stack.map((s) => <span key={s} className="pill">{s}</span>)}</dd>
        </div>
      </dl>

      {(project.liveUrl || project.repoUrl || project.demoUrl) && (
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && <Button href={project.liveUrl} target="_blank" rel="noreferrer" icon={<ArrowUpRight />}>Live demo</Button>}
          {project.repoUrl && <Button href={project.repoUrl} target="_blank" rel="noreferrer" variant="outline" icon={<Github />}>GitHub</Button>}
          {project.demoUrl && <Button href={project.demoUrl} target="_blank" rel="noreferrer" variant="ghost" icon={<Play />}>Video walkthrough</Button>}
        </div>
      )}

      <div className="mt-12">
        <Block index="01" title="Problem" items={project.problem} />
        <Block index="02" title="Approach" items={project.approach} />
        <section aria-labelledby="cs-arch" className="border-t border-border py-12">
          <p className="label-mono"><span className="text-accent">03</span></p>
          <h2 id="cs-arch" className="mt-2 mb-6 font-display text-2xl font-bold tracking-tight text-text md:text-3xl">Architecture</h2>
          <ArchitectureDiagram nodes={project.architecture.nodes} edges={project.architecture.edges} title={`${project.title} — system flow`} />
        </section>
        <Block index="04" title="Results" items={project.results} />
        <section aria-label="Key metrics" className="grid gap-4 border-t border-border py-12 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="card p-6">
              <p className="font-display text-4xl font-bold tracking-tight text-accent md:text-5xl">{m.value}</p>
              <p className="mt-2 text-sm text-text-secondary">{m.label}</p>
            </div>
          ))}
        </section>
      </div>

      <Link to={`/projects/${next.slug}`} className="group card mt-12 flex items-center justify-between gap-6 p-6 md:p-10" data-cursor="Next">
        <div>
          <p className="label-mono">Next project</p>
          <p className="mt-2 font-display text-2xl font-bold tracking-tight text-text md:text-4xl">{next.title}</p>
          <p className="mt-2 text-text-secondary">{next.kicker}</p>
        </div>
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-accent text-accent-ink transition-transform duration-500 group-hover:translate-x-1">
          <ArrowRight />
        </span>
      </Link>
    </article>
  )
}
