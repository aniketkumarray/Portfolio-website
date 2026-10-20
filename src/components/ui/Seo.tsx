import { Helmet } from 'react-helmet-async'
import { profile } from '@/data/profile'

interface Props {
  title?: string
  description?: string
  path?: string
  image?: string
  type?: 'website' | 'article'
  jsonLd?: Record<string, unknown>
}

const DEFAULT_DESC =
  'Aniket Kumar Ray — Product Manager for AI products. 4+ years owning discovery to adoption across ERP, LMS and CRM platforms; human-in-the-loop AI, RAG and analytics.'

export function Seo({ title, description = DEFAULT_DESC, path = '/', image = '/og-image.png', type = 'website', jsonLd }: Props) {
  const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — Product Manager · AI Products`
  const url = `${profile.siteUrl}${path}`
  const img = `${profile.siteUrl}${image}`
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: profile.siteUrl,
    email: `mailto:${profile.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Mumbai', addressCountry: 'IN' },
    sameAs: [profile.linkedin, profile.github, profile.tableau, profile.instagram],
  }
  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={profile.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
      <script type="application/ld+json">{JSON.stringify(jsonLd ?? person)}</script>
    </Helmet>
  )
}
