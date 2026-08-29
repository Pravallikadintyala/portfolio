import { EXPERIENCE } from '../../constants/experience';

/**
 * ExperienceSection — Work history, editorial layout.
 *
 * DESIGN SYSTEM STEP:
 *  - Not a traditional resume timeline
 *  - Large section heading with eyebrow + number
 *  - Each entry is an editorial block, not a card
 *  - Current role visually distinguished
 *  - Tags use the .tag system
 *  - Horizontal layout on desktop: meta left + content right
 *  - Vertical rule replaced with subtle left margin accent
 *
 * ANIMATION ready for GSAP Step 3:
 *  - Timeline line (data-timeline-line)
 *  - Entry blocks (data-experience-entry)
 */
export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="env-light relative overflow-hidden"
      aria-label="Work Experience"
    >
      <div className="container-main">
        <div className="rule-h" />
      </div>

      <div className="container-main section-padding">
        {/* Section label */}
        <div className="mb-16 flex items-center justify-between">
          <span className="type-eyebrow">Experience</span>
          <span className="section-number">02</span>
        </div>

        {/* Heading */}
        <h2
          className="type-display text-[var(--color-ink)] mb-20"
          style={{ maxWidth: '18ch' }}
        >
          Where I've worked.
        </h2>

        {/* Experience entries */}
        <div className="flex flex-col" data-timeline>
          {EXPERIENCE.map((entry, index) => {
            const isCurrent = index === 0;

            return (
              <article
                key={entry.id}
                id={`experience-${entry.id}`}
                data-experience-entry
                className="group relative grid grid-cols-1 gap-6 border-t border-[var(--color-border)] py-12 lg:grid-cols-[220px_1fr] lg:gap-16"
              >
                {/* Left: meta column */}
                <div className="flex flex-col gap-2 lg:pt-0.5">
                  <p className="type-meta">{entry.period}</p>
                  <p
                    className="text-xs font-medium"
                    style={{
                      color: isCurrent ? 'var(--color-navy)' : 'var(--color-muted)',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {entry.type === 'full-time' ? 'Full-time' : 'Internship'}
                  </p>
                  {isCurrent && (
                    <span
                      className="inline-flex items-center gap-1.5 mt-1"
                      style={{ fontSize: '0.7rem', color: 'var(--color-navy)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-navy)]"
                        style={{ animation: 'pulse 2s ease-in-out infinite' }}
                        aria-hidden="true"
                      />
                      Current
                    </span>
                  )}
                </div>

                {/* Right: content column */}
                <div>
                  {/* Role + Company */}
                  <div className="mb-5">
                    <h3 className="font-display text-xl font-bold text-[var(--color-ink)] leading-tight md:text-2xl">
                      {entry.role}
                    </h3>
                    <p
                      className="mt-1 font-medium"
                      style={{ fontSize: '0.9rem', color: 'var(--color-navy)' }}
                    >
                      {entry.company}
                    </p>
                  </div>

                  {/* Description list */}
                  <ul className="flex flex-col gap-2.5 mb-6">
                    {entry.description.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3"
                        style={{ fontSize: '0.9rem', lineHeight: 1.65, color: 'color-mix(in srgb, var(--color-ink) 55%, transparent)' }}
                      >
                        <span
                          className="mt-[0.55rem] block h-px w-3 shrink-0"
                          style={{ background: 'var(--color-muted)', opacity: 0.6 }}
                          aria-hidden="true"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}

          {/* Closing border */}
          <div className="rule-h" />
        </div>
      </div>

      {/* Keyframe for pulse dot — injected inline */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
      `}</style>
    </section>
  );
}
