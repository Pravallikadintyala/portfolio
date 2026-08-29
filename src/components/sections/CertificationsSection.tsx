/**
 * CertificationsSection — Professional credentials.
 *
 * DESIGN SYSTEM STEP:
 *  - env-light background — returns to primary light
 *  - Horizontal list layout — not a card grid
 *  - Each cert is a clean row with issuer, title, date
 *  - Placeholder styled appropriately
 *  - Content to be filled in by user
 *
 * VISUAL LANGUAGE:
 *  Feels credible and polished — not a LinkedIn list.
 *  Rows > Cards. Simple > Decorated.
 */
export function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="env-light relative overflow-hidden"
      aria-label="Certifications"
    >
      <div className="container-main">
        <div className="rule-h" />
      </div>

      <div className="container-main section-padding">
        {/* Section label */}
        <div className="mb-16 flex items-center justify-between">
          <span className="type-eyebrow">Certifications</span>
          <span className="section-number">06</span>
        </div>

        {/* Heading */}
        <h2
          className="type-display text-[var(--color-ink)] mb-20"
          style={{ maxWidth: '16ch' }}
        >
          Credentials.
        </h2>

        {/* Placeholder cert rows — real certs come later */}
        {[1, 2].map((n) => (
          <div
            key={n}
            className="grid grid-cols-1 gap-4 border-t border-[var(--color-border)] py-8 opacity-25 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-8"
          >
            <div>
              <p className="font-display text-lg font-bold text-[var(--color-ink)]">
                Certification Title
              </p>
              <p
                className="mt-1"
                style={{ fontSize: '0.875rem', color: 'var(--color-navy)' }}
              >
                Issuing Organization
              </p>
            </div>
            <p className="type-meta">Year</p>
          </div>
        ))}

        <div className="rule-h mt-4" />

        <p
          className="mt-6"
          style={{
            fontSize: '0.8rem',
            color: 'color-mix(in srgb, var(--color-ink) 30%, transparent)',
          }}
        >
          Certification details to be added in the next step.
        </p>
      </div>
    </section>
  );
}
