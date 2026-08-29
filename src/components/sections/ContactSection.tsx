import { AnimatedArrow } from '../ui/AnimatedArrow';

/**
 * ContactSection — Strong final CTA section.
 *
 * DESIGN SYSTEM STEP:
 *  - env-tint background — creates closure, different from the light sections
 *  - Very large typographic CTA — editorial and memorable
 *  - Single primary action: get in touch
 *  - Social links: minimal text links
 *  - No card, no form, no box — just typography and intent
 *
 * VISUAL IDENTITY:
 *  The last section the user sees. Should feel confident and inviting.
 *  Large, spacious, direct.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="env-tint relative overflow-hidden"
      aria-label="Contact"
    >
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
              fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
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
              fontSize: '1.0625rem',
              lineHeight: 1.7,
              color: 'color-mix(in srgb, var(--color-ink) 55%, transparent)',
              maxWidth: '46ch',
            }}
          >
            Whether it's a project, a new role, or just a conversation —
            feel free to reach out.
          </p>

          {/* Primary CTA */}
          <div className="mt-10">
            <a
              id="contact-cta-email"
              href="mailto:placeholder@email.com"
              className="btn btn-primary btn-xl"
            >
              Get in touch
              <AnimatedArrow direction="right" size={16} animated={false} />
            </a>
          </div>

          {/* Social links */}
          <div className="mt-12 flex items-center gap-8">
            <a
              id="contact-github"
              href="#"
              className="link-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span
              className="h-3 w-px"
              style={{ background: 'var(--color-border-mid)' }}
              aria-hidden="true"
            />
            <a
              id="contact-linkedin"
              href="#"
              className="link-underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
