/**
 * EducationSection — Academic background.
 *
 * DESIGN SYSTEM STEP:
 *  - env-tint background — creates alternating rhythm
 *  - Clean two-column horizontal layout matching Experience section style
 *  - Placeholder with proper visual design applied
 *  - Content to be filled in by user
 */
export function EducationSection() {
  return (
    <section
      id="education"
      className="env-tint relative overflow-hidden"
      aria-label="Education"
    >
      <div
        className="container-main"
        style={{ borderTop: '1px solid var(--color-border)' }}
      />

      <div className="container-main section-padding">
        {/* Section label */}
        <div className="mb-16 flex items-center justify-between">
          <span className="type-eyebrow">Education</span>
          <span className="section-number">05</span>
        </div>

        {/* Heading */}
        <h2
          className="type-display text-[var(--color-ink)] mb-20"
          style={{ maxWidth: '18ch' }}
        >
          Academic background.
        </h2>

        {/* Placeholder entry — matches experience layout */}
        <div className="grid grid-cols-1 gap-6 border-t border-[var(--color-border)] py-12 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Left: meta */}
          <div>
            <p className="type-meta">To be added</p>
          </div>

          {/* Right: content */}
          <div>
            <h3 className="font-display text-xl font-bold text-[var(--color-ink)]/25">
              Degree · Institution · Year
            </h3>
            <p
              className="mt-3"
              style={{ fontSize: '0.85rem', color: 'color-mix(in srgb, var(--color-ink) 30%, transparent)' }}
            >
              Education details will be added — degree, institution, and graduation year.
            </p>
          </div>
        </div>

        <div className="rule-h" />
      </div>
    </section>
  );
}
