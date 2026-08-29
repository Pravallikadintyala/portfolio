/**
 * AboutSection — Personal introduction, editorial layout.
 *
 * DESIGN SYSTEM STEP:
 *  - Large editorial heading (type-display)
 *  - Two-column asymmetric grid
 *  - Left: bold statement heading
 *  - Right: two focused bio paragraphs
 *  - Subtle section divider line at top
 *  - env-light background
 *
 * NOT a traditional "About Me" box — feels like a magazine spread.
 */
export function AboutSection() {
  return (
    <section
      id="about"
      className="env-light relative overflow-hidden"
      aria-label="About Pravallika"
    >
      {/* Top hairline divider */}
      <div className="container-main">
        <div className="rule-h" />
      </div>

      <div className="container-main section-padding">
        {/* Section label row */}
        <div className="mb-16 flex items-center justify-between">
          <span className="type-eyebrow">About</span>
          <span className="section-number">01</span>
        </div>

        {/* Two-column editorial layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20 xl:grid-cols-[5fr_4fr]">

          {/* Left column: Large statement heading */}
          <div>
            <h2
              className="type-display text-[var(--color-ink)]"
              style={{ maxWidth: '26ch' }}
            >
              Building at the intersection of code and client.
            </h2>

            {/* Subtle accent — a short rule under the heading */}
            <div
              className="mt-8 h-px w-12"
              style={{ background: 'var(--color-navy)', opacity: 0.35 }}
              aria-hidden="true"
            />
          </div>

          {/* Right column: Bio content */}
          <div className="flex flex-col justify-center gap-6 lg:pt-2">
            <p className="type-body-lg text-[var(--color-ink)]/65">
              I'm a Forward Deploy Engineer at We2 Systems, focused on MERN
              stack development, AWS cloud infrastructure, and application
              deployment. I work directly with clients to understand their
              requirements and translate them into practical, working solutions.
            </p>
            <p className="type-body text-[var(--color-ink)]/50" style={{ fontSize: '1rem', lineHeight: 1.75 }}>
              I work where engineering meets real-world usage — turning
              requirements into reliable software.
            </p>

            {/* Subtle stat row */}
            <div className="mt-4 flex gap-10 border-t border-[var(--color-border)] pt-6">
              {[
                { value: '2026', label: 'Current year' },
                { value: 'FDE', label: 'Current role' },
                { value: 'We2', label: 'Company' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-xl font-bold text-[var(--color-ink)]">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 type-meta">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
