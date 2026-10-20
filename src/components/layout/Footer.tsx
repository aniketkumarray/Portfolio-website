import { Link, useLocation, useNavigate } from 'react-router-dom'
import { navLinks, profile } from '@/data/profile'
import { useScrollTo } from '@/hooks/useLenis'
import { ArrowUp, Github, Linkedin, Mail, Tableau } from '@/components/ui/Icons'

export function Footer() {
  const scrollTo = useScrollTo()
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const year = new Date().getFullYear()

  const go = (id: string) => (isHome ? scrollTo(`#${id}`, -24) : navigate(`/#${id}`))

  return (
    <footer className="relative border-t border-border">
      <div className="container-x flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Link to="/" className="font-display text-2xl font-bold tracking-tight text-text">
            {profile.name}<span className="text-accent">.</span>
          </Link>
          <p className="mt-2 max-w-xs text-sm text-text-secondary">{profile.roleLine}</p>
          <ul className="mt-6 flex items-center gap-2">
            {[
              { href: profile.linkedin, label: 'LinkedIn', Icon: Linkedin },
              { href: profile.github, label: 'GitHub', Icon: Github },
              { href: profile.tableau, label: 'Tableau Public', Icon: Tableau },
              { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="grid size-10 place-items-center rounded-full border border-border text-text-secondary transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer">
          <ul className="grid grid-cols-3 gap-x-8 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.id}>
                <button type="button" onClick={() => go(l.id)} className="link-underline text-text-secondary hover:text-text">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => scrollTo(0)}
          className="group inline-flex items-center gap-2 self-start text-sm text-text-secondary transition-colors hover:text-text md:self-end"
        >
          Back to top
          <span className="grid size-9 place-items-center rounded-full border border-border transition-[border-color,transform] group-hover:-translate-y-0.5 group-hover:border-accent">
            <ArrowUp />
          </span>
        </button>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-border py-5 text-xs text-text-tertiary sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} {profile.name}. All rights reserved.</p>
        <p className="font-mono">Built with React, GSAP & a lot of coffee in {profile.location}.</p>
      </div>
    </footer>
  )
}
