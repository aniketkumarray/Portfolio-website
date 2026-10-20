import { Seo } from '@/components/ui/Seo'
import { Button } from '@/components/ui/Button'
import { TextReveal } from '@/components/ui/TextReveal'
import { ArrowRight } from '@/components/ui/Icons'

export function NotFound() {
  return (
    <section className="container-x flex min-h-svh flex-col items-start justify-center py-32">
      <Seo title="Page not found" description="This page does not exist." path="/404" />
      <p className="label-mono text-accent">404</p>
      <TextReveal as="h1" immediate text={'This route was\nnever on the roadmap.'} className="display-lg mt-4 text-text" />
      <p className="mt-6 max-w-md text-lg text-text-secondary">
        The page you're after moved, got deprioritised, or never shipped. The homepage definitely did.
      </p>
      <div className="mt-8 flex gap-3">
        <Button to="/" size="lg" icon={<ArrowRight />}>Back home</Button>
        <Button to="/#projects" variant="outline" size="lg">See the work</Button>
      </div>
    </section>
  )
}
