/**
 * ProjectsSection — Dark cinematic environment.
 *
 * DESIGN SYSTEM STEP:
 *  - env-dark: #121E35 background, light text
 *  - Gradient transition ABOVE this section (in App.tsx wrapper)
 *    and BELOW to smoothly return to light
 *  - Large heading on dark with muted eyebrow
 *  - Project slot placeholders styled for the dark env
 *  - Ready for real project cards in Step 4
 *
 * TRANSITION STRATEGY:
 *  The ExperienceSection ends with env-light.
 *  A gradient fade wrapper in App.tsx bridges the gap.
 *  This section internally starts dark.
 */
export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="env-dark relative overflow-hidden"
      aria-label="Featured Projects"
    >
      <div className="container-main section-padding">

        {/* Section label */}
        <div className="mb-16 flex items-center justify-between">
          <span className="type-eyebrow-dark">Featured Projects</span>
          <span className="section-number" style={{ color: 'rgba(143,160,184,0.4)' }}>03</span>
        </div>

        {/* Heading */}
        <h2
          className="type-display text-[var(--color-bg)] mb-20"
          style={{ maxWidth: '20ch' }}
        >
          Things I've built.
        </h2>

        {/* Project slot grid — placeholder, real cards come in Step 4 */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="card-dark relative overflow-hidden"
              style={{
                padding: '2rem',
                minHeight: '280px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}
            >
              {/* Slot indicator */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ opacity: 0.08 }}
              >
                <span
                  className="font-display text-8xl font-bold text-[var(--color-bg)]"
                  aria-hidden="true"
                >
                  0{n}
                </span>
              </div>

              <div className="relative z-10">
                <p className="type-eyebrow-dark mb-3">Project {n}</p>
                <h3 className="font-display text-xl font-bold text-[var(--color-bg)]/30">
                  Details coming soon
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Closing note */}
        <p className="mt-12 type-eyebrow-dark opacity-40 text-center">
          Project content will be added in the next step
        </p>
      </div>
    </section>
  );
}
