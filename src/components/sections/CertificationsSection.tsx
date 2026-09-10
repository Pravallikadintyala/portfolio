import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { AnimatedArrow } from '../ui/AnimatedArrow';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { CERTIFICATIONS } from '../../constants/certifications';

/* ============================================================
   CertificationsSection — Professional credentials.

   Design philosophy:
   - env-light background — returns to primary warm off-white
   - Row layout (not cards) — editorial, confident, clean
   - Each row: title left, issuer + meta right on desktop
   - AWS certs get a subtle "Active" validity indicator
   - Credential link on each row (arrow affordance)
   - Hover: row brightens + link arrow nudges right
   - Animation: heading reveal + staggered row reveals
   - Respects useReducedMotion
   ============================================================ */

const EASE = [0.16, 1, 0.3, 1] as const;

export function CertificationsSection() {
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
      id="certifications"
      className="env-light relative overflow-hidden"
      aria-label="Certifications"
    >
      {/* Top rule */}
      <div className="container-main">
        <div className="rule-h" />
      </div>

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
            <span className="type-eyebrow">Certifications</span>
            <span className="section-number">06</span>
          </motion.div>

          <motion.h2
            variants={itemV}
            className="type-display text-[var(--color-ink)] mb-20"
            style={{ maxWidth: '16ch' }}
          >
            Credentials.
          </motion.h2>
        </motion.div>

        {/* ── Certification rows ────────────────────────────── */}
        <div role="list" aria-label="Certifications list">
          {CERTIFICATIONS.map((cert, index) => (
            <CertificationRow
              key={cert.id}
              cert={cert}
              index={index}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Closing rule */}
        <div className="rule-h" />
      </div>
    </section>
  );
}

/* ============================================================
   CertificationRow — Single credential row.

   Desktop (lg): three columns
     [Title + issuer] [Meta: date / expires] [Link arrow]
   Mobile: stacked, link arrow at bottom

   AWS certs show a subtle "Valid" pill using existing palette.
   Harvard and C-DAC show a neutral "Certificate" pill.
   ============================================================ */
interface CertificationRowProps {
  cert: {
    id: string;
    title: string;
    issuer: string;
    date: string;
    expires?: string;
    credentialUrl?: string;
  };
  index: number;
  reducedMotion: boolean;
}

function CertificationRow({ cert, index, reducedMotion }: CertificationRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-8% 0px' });

  const delay = index * 0.1;
  const isAWS = cert.issuer === 'Amazon Web Services';

  const containerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
  };

  const itemV = reducedMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.25 } },
      }
    : {
        hidden: { opacity: 0, y: 14 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
      };

  const rowContent = (
    <motion.div
      ref={ref}
      role="listitem"
      id={`cert-${cert.id}`}
      variants={containerV}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className="group"
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0.75rem',
        borderTop: '1px solid var(--color-border)',
        padding: '1.75rem 0',
        transition: 'background 0.25s ease',
        cursor: cert.credentialUrl ? 'pointer' : 'default',
      }}
    >
      {/* Mobile: stacked layout — always visible */}
      {/* Desktop override via inner grid */}
      <motion.div
        variants={itemV}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '0.875rem',
          alignItems: 'center',
        }}
        className="lg:grid-cols-[1fr_auto_auto] lg:gap-8"
      >
        {/* ── Left: title + issuer + validity pill ─────────── */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '0.625rem',
              marginBottom: '0.4rem',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                fontWeight: 700,
                lineHeight: 1.2,
                letterSpacing: '-0.01em',
                color: 'var(--color-ink)',
              }}
            >
              {cert.title}
            </h3>

            {/* Validity pill — only for certs with expiry (AWS) */}
            {cert.expires && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  padding: '0.2rem 0.625rem',
                  borderRadius: '9999px',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  background: 'color-mix(in srgb, var(--color-navy) 8%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--color-navy) 18%, transparent)',
                  color: 'var(--color-navy)',
                  flexShrink: 0,
                  alignSelf: 'center',
                  marginTop: '0.1rem',
                }}
                aria-label="Active certification"
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '0.35rem',
                    height: '0.35rem',
                    borderRadius: '50%',
                    background: 'var(--color-navy)',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                Active
              </span>
            )}
          </div>

          <p
            style={{
              fontSize: '0.875rem',
              fontWeight: 500,
              color: isAWS ? 'var(--color-navy)' : 'var(--color-muted)',
              letterSpacing: '0.01em',
            }}
          >
            {cert.issuer}
          </p>
        </div>

        {/* ── Center: date + expiry meta ────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
          className="lg:text-right"
        >
          <p className="type-meta">{cert.date}</p>
          {cert.expires && (
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'color-mix(in srgb, var(--color-muted) 60%, transparent)',
              }}
            >
              Expires {cert.expires}
            </p>
          )}
        </div>

        {/* ── Right: credential link ────────────────────────── */}
        {cert.credentialUrl && (
          <motion.a
            id={`cert-${cert.id}-link`}
            href={cert.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={
              !reducedMotion
                ? { x: 3, transition: { duration: 0.2, ease: 'easeOut' } }
                : undefined
            }
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'var(--font-sans)',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.02em',
              color: 'var(--color-muted)',
              textDecoration: 'none',
              transition: 'color 0.25s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-navy)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = 'var(--color-muted)';
            }}
            aria-label={`View credential: ${cert.title}`}
          >
            View credential
            <AnimatedArrow direction="right" size={12} animated={false} />
          </motion.a>
        )}
      </motion.div>
    </motion.div>
  );

  return rowContent;
}
