import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedArrow } from '../ui/AnimatedArrow';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { PROJECTS } from '../../constants/projects';
import type { Project } from '../../types';

/* ============================================================
   ProjectsSection — Dark cinematic environment.

   Layout philosophy:
   - FundWave (featured): Full-width editorial block. Large ghost
     project number in background, bold name, description, tech
     stack tags, and links. Left accent border in navy/muted.
   - SmartPulse: Smaller paired block beneath, inset visually
     with accuracy metric as a pull-quote-style stat.

   Animations:
   - Section heading: fade + slide up on scroll enter
   - FundWave block: fade + translate on scroll, slightly delayed
   - SmartPulse block: staggered in after FundWave
   - Hover: subtle translateY lift + border brightening
   - Tech tags: staggered appear within card reveal
   - Links: arrow translates right on hover
   - All animations respect prefers-reduced-motion

   Environment: env-dark (#121E35)
   No images — pure typographic, editorial design.
   ============================================================ */

/* ── Framer Motion variants ─────────────────────────────── */
const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_EXPO } },
};

const fadeUpReduced = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const stagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
});

/* ── Section component ──────────────────────────────────── */
export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const headingInView = useInView(headingRef, { once: true, margin: '-15% 0px' });

  const itemVariant = reducedMotion ? fadeUpReduced : fadeUp;

  const featured = PROJECTS.find((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="env-dark relative overflow-hidden"
      aria-label="Featured Projects"
    >
      {/* ── Subtle background texture ──────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.025 }}
      >
        <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="projects-dot-grid"
              x="0"
              y="0"
              width="36"
              height="36"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#F7F6F2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projects-dot-grid)" />
        </svg>
      </div>

      <div className="container-main section-padding">

        {/* ── Section header ─────────────────────────────────── */}
        <motion.div
          ref={headingRef}
          variants={stagger(0)}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="mb-20"
        >
          <motion.div
            variants={itemVariant}
            className="mb-16 flex items-center justify-between"
          >
            <span className="type-eyebrow-dark">Featured Projects</span>
            <span className="section-number" style={{ color: 'rgba(143,160,184,0.4)' }}>
              03
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariant}
            className="type-display"
            style={{
              color: 'var(--color-dark-text)',
              maxWidth: '22ch',
            }}
          >
            Things I've built.
          </motion.h2>
        </motion.div>

        {/* ── Projects stack ─────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:gap-8">

          {/* ── Featured project — FundWave ─────────────────── */}
          {featured && <FeaturedProjectCard project={featured} reducedMotion={reducedMotion} />}

          {/* ── Secondary projects ──────────────────────────── */}
          {secondary.map((project, i) => (
            <SecondaryProjectCard
              key={project.id}
              project={project}
              index={i}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* ── Bottom rule ────────────────────────────────────── */}
        <div
          className="mt-20"
          style={{
            height: '1px',
            background: 'var(--color-dark-border)',
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

/* ============================================================
   FeaturedProjectCard — Large, primary project block.
   Layout: ghost number background, accent left border,
   bold title, description, tech tags row, links.
   ============================================================ */
interface ProjectCardProps {
  project: Project;
  reducedMotion: boolean;
}

interface SecondaryProjectCardProps extends ProjectCardProps {
  index: number;
}

function FeaturedProjectCard({ project, reducedMotion }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-10% 0px' });

  const EASE = [0.16, 1, 0.3, 1] as const;

  const containerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
  };

  const itemV = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE } },
      };

  const tagContainerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.045, delayChildren: 0.35 } },
  };

  const tagV = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, x: -8 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE } },
      };

  return (
    <motion.article
      ref={cardRef}
      id={`project-${project.id}`}
      variants={containerV}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={!reducedMotion ? { y: -4, transition: { duration: 0.4, ease: EASE } } : undefined}
      aria-label={`Project: ${project.title}`}
      style={{
        position: 'relative',
        background: 'rgba(247,246,242,0.03)',
        border: '1px solid var(--color-dark-border)',
        borderLeft: '3px solid var(--color-navy)',
        borderRadius: '12px',
        padding: '2.5rem',
        overflow: 'hidden',
        transition: 'border-color 0.35s ease, background 0.35s ease',
        cursor: 'default',
      }}
      className="group"
    >
      {/* Ghost project number */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-0.25rem',
          bottom: '-1.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 12vw, 9rem)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'rgba(247,246,242,0.03)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        01
      </span>

      {/* ── Header row: number label + category tags ─────── */}
      <motion.div
        variants={itemV}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '0.75rem',
          marginBottom: '1.75rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            01
          </span>
          <span
            style={{
              width: '1.5rem',
              height: '1px',
              background: 'var(--color-muted)',
              opacity: 0.4,
              display: 'block',
              flexShrink: 0,
            }}
            aria-hidden="true"
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.625rem',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--color-navy)',
            }}
          >
            Featured
          </span>
        </div>

        {/* Category tags */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.tags.map((tag) => (
            <span key={tag} className="tag-dark" style={{ fontSize: '0.7rem', padding: '0.25rem 0.75rem' }}>
              {tag}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Project title ──────────────────────────────────── */}
      <motion.h3
        variants={itemV}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-0.025em',
          color: 'var(--color-dark-text)',
          marginBottom: '1rem',
        }}
      >
        {project.title}
      </motion.h3>

      {/* ── Description ────────────────────────────────────── */}
      <motion.p
        variants={itemV}
        style={{
          fontSize: 'clamp(0.875rem, 1.4vw, 1rem)',
          lineHeight: 1.75,
          color: 'rgba(247,246,242,0.52)',
          maxWidth: '62ch',
          marginBottom: '2rem',
        }}
      >
        {project.description}
      </motion.p>

      {/* ── Tech stack tags ─────────────────────────────────── */}
      <motion.div
        variants={tagContainerV}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2.25rem',
        }}
      >
        {project.techStack.map((tech) => (
          <motion.span
            key={tech}
            variants={tagV}
            className="tag-dark"
            style={{ fontSize: '0.75rem' }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* ── Divider ────────────────────────────────────────── */}
      <motion.div
        variants={itemV}
        style={{
          width: '100%',
          height: '1px',
          background: 'var(--color-dark-border)',
          marginBottom: '1.75rem',
        }}
        aria-hidden="true"
      />

      {/* ── Links row ──────────────────────────────────────── */}
      <motion.div
        variants={itemV}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {project.liveUrl && (
          <ProjectLink
            id={`project-${project.id}-live`}
            href={project.liveUrl}
            label="Live Demo"
            primary
          />
        )}
        {project.githubUrl && (
          <ProjectLink
            id={`project-${project.id}-github`}
            href={project.githubUrl}
            label="GitHub"
          />
        )}
      </motion.div>
    </motion.article>
  );
}

/* ============================================================
   SecondaryProjectCard — Smaller supporting project.
   Inset, metric pull-stat, slightly more compact.
   ============================================================ */
function SecondaryProjectCard({ project, index, reducedMotion }: SecondaryProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-10% 0px' });

  const EASE = [0.16, 1, 0.3, 1] as const;
  const delay = 0.1 + index * 0.08;

  const containerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
  };

  const itemV = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.3 } } }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      };

  const tagContainerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04, delayChildren: delay + 0.25 } },
  };

  const tagV = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : {
        hidden: { opacity: 0, x: -6 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE } },
      };

  return (
    <motion.article
      ref={cardRef}
      id={`project-${project.id}`}
      variants={containerV}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      whileHover={
        !reducedMotion ? { y: -3, transition: { duration: 0.35, ease: EASE } } : undefined
      }
      aria-label={`Project: ${project.title}`}
      style={{
        position: 'relative',
        background: 'rgba(247,246,242,0.02)',
        border: '1px solid var(--color-dark-border)',
        borderRadius: '12px',
        padding: '2rem 2.5rem',
        overflow: 'hidden',
        transition: 'border-color 0.35s ease, background 0.35s ease',
        cursor: 'default',
      }}
      className="group"
    >
      {/* Ghost project number */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '-0.25rem',
          bottom: '-1.5rem',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 10vw, 7rem)',
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: '-0.04em',
          color: 'rgba(247,246,242,0.025)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        0{index + 2}
      </span>

      {/* ── Top row: grid of number/meta + metric stat ─────── */}
      <motion.div
        variants={itemV}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '1.5rem',
          alignItems: 'flex-start',
          marginBottom: '1.5rem',
        }}
      >
        {/* Left: number + category */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.625rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--color-muted)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              0{index + 2}
            </span>
            <span
              style={{
                width: '1.5rem',
                height: '1px',
                background: 'var(--color-muted)',
                opacity: 0.4,
                display: 'block',
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="tag-dark"
                  style={{ fontSize: '0.7rem', padding: '0.2rem 0.65rem' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 2.8vw, 2.1rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: 'var(--color-dark-text)',
            }}
          >
            {project.title}
          </h3>
        </div>

        {/* Right: metric stat (if exists) */}
        {project.metric && (
          <div
            style={{
              textAlign: 'right',
              flexShrink: 0,
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--color-muted)',
                lineHeight: 1,
              }}
            >
              {project.metric.value}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(143,160,184,0.6)',
                marginTop: '0.375rem',
              }}
            >
              {project.metric.label}
            </p>
          </div>
        )}
      </motion.div>

      {/* ── Description ────────────────────────────────────── */}
      <motion.p
        variants={itemV}
        style={{
          fontSize: 'clamp(0.85rem, 1.3vw, 0.9375rem)',
          lineHeight: 1.72,
          color: 'rgba(247,246,242,0.46)',
          maxWidth: '58ch',
          marginBottom: '1.75rem',
        }}
      >
        {project.description}
      </motion.p>

      {/* ── Tech stack tags ─────────────────────────────────── */}
      <motion.div
        variants={tagContainerV}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.4rem',
          marginBottom: '2rem',
        }}
      >
        {project.techStack.map((tech) => (
          <motion.span
            key={tech}
            variants={tagV}
            className="tag-dark"
            style={{ fontSize: '0.72rem', padding: '0.25rem 0.7rem' }}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      {/* ── Divider ────────────────────────────────────────── */}
      <motion.div
        variants={itemV}
        style={{
          width: '100%',
          height: '1px',
          background: 'var(--color-dark-border)',
          marginBottom: '1.5rem',
        }}
        aria-hidden="true"
      />

      {/* ── Links row ──────────────────────────────────────── */}
      <motion.div
        variants={itemV}
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
        }}
      >
        {project.liveUrl && (
          <ProjectLink
            id={`project-${project.id}-live`}
            href={project.liveUrl}
            label="Live Demo"
            primary
          />
        )}
        {project.githubUrl && (
          <ProjectLink
            id={`project-${project.id}-github`}
            href={project.githubUrl}
            label="GitHub"
          />
        )}
      </motion.div>
    </motion.article>
  );
}

/* ============================================================
   ProjectLink — Reusable link with animated arrow on hover.
   Primary: pill button style.
   Default: ghost text link.
   ============================================================ */
interface ProjectLinkProps {
  id: string;
  href: string;
  label: string;
  primary?: boolean;
}

function ProjectLink({ id, href, label, primary = false }: ProjectLinkProps) {
  return (
    <motion.a
      id={id}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={primary ? 'btn btn-outline btn-sm' : undefined}
      whileHover={
        primary
          ? undefined
          : { x: 2, transition: { duration: 0.2, ease: 'easeOut' } }
      }
      style={
        primary
          ? undefined
          : {
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.03em',
              color: 'var(--color-muted)',
              transition: 'color 0.25s ease',
            }
      }
      onMouseEnter={(e) => {
        if (!primary) {
          (e.currentTarget as HTMLElement).style.color = 'var(--color-dark-text)';
        }
      }}
      onMouseLeave={(e) => {
        if (!primary) {
          (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)';
        }
      }}
    >
      {label}
      <AnimatedArrow direction="right" size={13} animated={false} />
    </motion.a>
  );
}
