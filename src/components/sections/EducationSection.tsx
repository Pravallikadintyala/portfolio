import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { EDUCATION } from '../../constants/education';

/* ============================================================
   EducationSection — Academic background.

   Design philosophy:
   - env-tint background — creates section rhythm after Skills
   - Matches ExperienceSection layout: left meta column, right content
   - Two entries: MCA (primary) and B.Sc (preceding)
   - No card boxes — editorial row layout
   - Topmost entry visually distinguished (heavier title weight)
   - Animation: section heading reveal + staggered entry reveals
   - Respects useReducedMotion
   ============================================================ */

const EASE = [0.16, 1, 0.3, 1] as const;

export function EducationSection() {
  const reducedMotion = useReducedMotion();

  const headingRef = useRef<HTMLDivElement>(null);
  const headingInView = useInView(headingRef, { once: true, margin: '-12% 0px' });

  const itemV = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
      }
    : {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      };

  const headingContainerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <section
      id="education"
      className="env-tint relative overflow-hidden"
      aria-label="Education"
    >
      {/* Top border rule */}
      <div
        className="container-main"
        style={{ borderTop: '1px solid var(--color-border)' }}
      />

      <div className="container-main section-padding">

        {/* ── Section heading ──────────────────────────────── */}
        <motion.div
          ref={headingRef}
          variants={headingContainerV}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
        >
          <motion.div
            variants={itemV}
            className="mb-16 flex items-center justify-between"
          >
            <span className="type-eyebrow">Education</span>
            <span className="section-number">05</span>
          </motion.div>

          <motion.h2
            variants={itemV}
            className="type-display text-[var(--color-ink)] mb-20"
            style={{ maxWidth: '18ch' }}
          >
            Academic background.
          </motion.h2>
        </motion.div>

        {/* ── Education entries ─────────────────────────────── */}
        <div className="flex flex-col" aria-label="Education history">
          {EDUCATION.map((entry, index) => (
            <EducationEntry
              key={entry.id}
              entry={entry}
              isPrimary={index === 0}
              delay={index * 0.12}
              reducedMotion={reducedMotion}
            />
          ))}

          {/* Closing border */}
          <div className="rule-h" />
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EducationEntry — Single education row.

   Left: period + location (meta column — 220px on desktop)
   Right: degree name + institution
   First entry (MCA) gets slightly bolder title treatment.
   ============================================================ */
interface EducationEntryProps {
  entry: {
    id: string;
    degree: string;
    institution: string;
    period: string;
    location: string;
    details?: string[];
  };
  isPrimary: boolean;
  delay: number;
  reducedMotion: boolean;
}

function EducationEntry({ entry, isPrimary, delay, reducedMotion }: EducationEntryProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const containerV = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: delay },
    },
  };

  const itemV = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 16 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      };

  return (
    <motion.article
      ref={ref}
      id={`education-${entry.id}`}
      variants={containerV}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group grid grid-cols-1 gap-6 border-t border-[var(--color-border)] py-12 lg:grid-cols-[220px_1fr] lg:gap-16"
    >
      {/* Left: meta column */}
      <motion.div variants={itemV} className="flex flex-col gap-1.5 lg:pt-0.5">
        <p className="type-meta">{entry.period}</p>
        <p
          style={{
            fontSize: '0.8rem',
            fontWeight: 500,
            color: 'color-mix(in srgb, var(--color-muted) 80%, transparent)',
            letterSpacing: '0.04em',
          }}
        >
          {entry.location}
        </p>
      </motion.div>

      {/* Right: content column */}
      <motion.div variants={itemV}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: isPrimary
              ? 'clamp(1.2rem, 2.2vw, 1.6rem)'
              : 'clamp(1rem, 1.8vw, 1.3rem)',
            fontWeight: isPrimary ? 700 : 600,
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
            color: 'var(--color-ink)',
            marginBottom: '0.5rem',
          }}
        >
          {entry.degree}
        </h3>
        <p
          style={{
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--color-navy)',
            letterSpacing: '0.01em',
          }}
        >
          {entry.institution}
        </p>
      </motion.div>
    </motion.article>
  );
}
