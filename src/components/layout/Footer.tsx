import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { useScrollTo } from '../../hooks/useLenis';
import { NAV_ITEMS } from '../../constants/navigation';
import { SOCIAL_LINKS } from '../../constants/social';


/**
 * Footer — Minimal, editorial. Consistent with design system.
 */
export function Footer() {
  const scrollTo = useScrollTo();

  return (
    <footer
      id="footer"
      className="env-tint"
      style={{ borderTop: '1px solid var(--color-border)' }}
    >
      <div className="container-main py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Brand */}
          <div>
            <button
              onClick={() => scrollTo('hero')}
              className="font-display text-lg font-bold text-[var(--color-ink)] hover:text-[var(--color-navy)] transition-colors"
            >
              Pravallika Dintyala
            </button>
            <p className="mt-1 type-meta">Forward Deploy Engineer</p>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollTo(item.id)}
                    className="nav-link"
                    style={{ fontSize: '0.8125rem' }}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 flex flex-col gap-4 border-t border-[var(--color-border)] pt-8 md:flex-row md:items-center md:justify-between"
        >
          <p
            style={{
              fontSize: '0.75rem',
              color: 'color-mix(in srgb, var(--color-ink) 45%, transparent)',
            }}
          >
            © {new Date().getFullYear()} Pravallika Dintyala. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a
              href={SOCIAL_LINKS.GITHUB}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-ink)]/60 hover:text-[var(--color-navy)] transition-colors font-medium"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-[var(--color-border-mid)]">•</span>
            <a
              href={SOCIAL_LINKS.LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[var(--color-ink)]/60 hover:text-[#0A66C2] transition-colors font-medium"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4 text-[#0A66C2]" />
              <span>LinkedIn</span>
            </a>
          </div>


          <button
            id="footer-scroll-top"
            onClick={() => scrollTo('hero')}
            style={{
              fontSize: '0.75rem',
              color: 'color-mix(in srgb, var(--color-ink) 50%, transparent)',
            }}
            className="hover:text-[var(--color-navy)] transition-colors font-medium"
            aria-label="Scroll to top"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}

