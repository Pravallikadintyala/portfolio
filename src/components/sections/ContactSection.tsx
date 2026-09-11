import { GithubIcon, LinkedinIcon, MailIcon, ArrowUpRightIcon } from '../ui/Icons';
import { AnimatedArrow } from '../ui/AnimatedArrow';
import { SOCIAL_LINKS } from '../../constants/social';


/**
 * ContactSection — Strong final CTA section.
 *
 * DESIGN SYSTEM STEP:
 *  - env-tint background — creates closure, different from the light sections
 *  - Premium typography & ambient glow background
 *  - Real GitHub & LinkedIn social pill buttons with custom icons & hover animations
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="env-tint relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Background ambient glow accent */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none w-96 h-96 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(33,54,97,0.07) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div
        className="container-main"
        style={{ borderTop: '1px solid var(--color-border)' }}
      />

      <div className="container-main section-padding" style={{ paddingTop: 'calc(var(--space-section) * 1.2)', paddingBottom: 'calc(var(--space-section) * 1.2)' }}>

        {/* Section label */}
        <div className="mb-16 flex items-center justify-between">
          <span className="type-eyebrow">Contact</span>
          <span className="section-number">07</span>
        </div>

        {/* Large CTA text */}
        <div className="max-w-[900px]">
          <h2
            className="type-display text-[var(--color-ink)]"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              fontWeight: 800,
            }}
          >
            Let's work
            <br />
            <span className="text-[var(--color-navy)]">together.</span>
          </h2>

          <p
            className="mt-8"
            style={{
              fontSize: '1.125rem',
              lineHeight: 1.75,
              color: 'color-mix(in srgb, var(--color-ink) 65%, transparent)',
              maxWidth: '48ch',
            }}
          >
            Whether it's a project, a new role, or just a conversation —
            feel free to reach out.
          </p>

          {/* Primary Action Row */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              id="contact-cta-email"
              href={SOCIAL_LINKS.EMAIL}
              className="btn btn-primary btn-xl"
            >
              <MailIcon className="w-5 h-5 mr-1" />
              Get in touch
              <AnimatedArrow direction="right" size={16} animated={false} />
            </a>
          </div>

          {/* Classy Social Links Pill Group with Icons */}
          <div className="mt-14 pt-8 border-t border-[var(--color-border-mid)]/50">
            <p className="type-eyebrow mb-5 text-[var(--color-muted)]">
              Connect & Follow
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                id="contact-github"
                href={SOCIAL_LINKS.GITHUB}
                className="social-pill"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="social-icon w-4 h-4 text-[var(--color-navy)]" />
                <span className="font-medium tracking-tight">GitHub</span>
                <ArrowUpRightIcon className="social-arrow w-3.5 h-3.5 opacity-60 text-[var(--color-navy)]" />
              </a>

              <a
                id="contact-linkedin"
                href={SOCIAL_LINKS.LINKEDIN}
                className="social-pill"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="social-icon w-4 h-4 text-[#0A66C2]" />
                <span className="font-medium tracking-tight">LinkedIn</span>
                <ArrowUpRightIcon className="social-arrow w-3.5 h-3.5 opacity-60 text-[var(--color-navy)]" />
              </a>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
}

