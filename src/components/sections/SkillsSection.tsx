import { SKILL_CATEGORIES } from '../../constants/skills';
import clsx from 'clsx';

const levelConfig: Record<string, { dot: string; label: string }> = {
  proficient: {
    dot: 'bg-[var(--color-navy)]',
    label: 'Proficient',
  },
  familiar: {
    dot: 'bg-[var(--color-muted)]',
    label: 'Familiar',
  },
  exploring: {
    dot: 'border border-[var(--color-border-mid)] bg-transparent',
    label: 'Learning',
  },
};

/**
 * SkillsSection — Tech stack, honest proficiency indicators.
 *
 * DESIGN SYSTEM STEP:
 *  - env-light background (not tint — maintains consistency after dark section)
 *  - Categories listed in clean columns — no card boxes
 *  - Each skill is a minimal pill with a dot proficiency indicator
 *  - Legend is small and understated
 *  - Heading on left, content spans full width below
 */
export function SkillsSection() {
  return (
    <section
      id="stack"
      className="env-light relative overflow-hidden"
      aria-label="Tech Stack"
    >
      <div className="container-main">
        <div className="rule-h" />
      </div>

      <div className="container-main section-padding">
        {/* Section label */}
        <div className="mb-16 flex items-center justify-between">
          <span className="type-eyebrow">Tech Stack</span>
          <span className="section-number">04</span>
        </div>

        {/* Heading + subtitle row */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <h2
            className="type-display text-[var(--color-ink)]"
            style={{ maxWidth: '20ch' }}
          >
            What I work with.
          </h2>

          {/* Legend — right aligned on desktop */}
          <div className="flex flex-wrap gap-5 lg:justify-end lg:pb-2">
            {Object.entries(levelConfig).map(([key, config]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className={clsx('h-2 w-2 rounded-full shrink-0', config.dot)}
                  aria-hidden="true"
                />
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'color-mix(in srgb, var(--color-ink) 45%, transparent)',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  {config.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Skills grid — categories in columns */}
        <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {SKILL_CATEGORIES.map((category) => (
            <div key={category.id} id={`skills-${category.id}`}>
              <h3
                className="mb-5"
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'color-mix(in srgb, var(--color-ink) 30%, transparent)',
                }}
              >
                {category.label}
              </h3>

              <ul className="flex flex-col gap-2.5" role="list">
                {category.skills.map((skill) => (
                  <li key={skill.name}>
                    <div
                      className="flex items-center gap-2.5"
                      title={levelConfig[skill.level]?.label}
                    >
                      <span
                        className={clsx(
                          'h-1.5 w-1.5 rounded-full shrink-0',
                          levelConfig[skill.level]?.dot,
                        )}
                        aria-label={levelConfig[skill.level]?.label}
                      />
                      <span
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'color-mix(in srgb, var(--color-ink) 75%, transparent)',
                          letterSpacing: '0.01em',
                        }}
                      >
                        {skill.name}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Honest footnote */}
        <p
          className="mt-16 border-t border-[var(--color-border)] pt-6"
          style={{
            fontSize: '0.8rem',
            color: 'color-mix(in srgb, var(--color-ink) 30%, transparent)',
            letterSpacing: '0.01em',
            maxWidth: '60ch',
          }}
        >
          Dot indicators reflect honest self-assessment — proficient means I use it
          regularly, familiar means I've worked with it, learning means I'm actively exploring it.
        </p>
      </div>
    </section>
  );
}
