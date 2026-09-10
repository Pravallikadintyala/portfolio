import { useRef } from 'react';
import { motion, useReducedMotion as useFramerReducedMotion } from 'framer-motion';
import { AnimatedArrow } from '../ui/AnimatedArrow';
import { useScrollTo } from '../../hooks/useLenis';

/* ============================================================
   Hero entrance animation variants
   
   Philosophy:
   - Staggered reveal — each element enters after the previous
   - Upward drift + fade — subtle, not dramatic
   - Reduced motion: opacity only, no movement
   - Duration kept short — this is an entrance, not a feature
   ============================================================ */

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.2,
    },
  },
} as const;

const itemVariants = {
  hidden:   { opacity: 0, y: 18 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE_EXPO } },
} as const;

const itemVariantsReduced = {
  hidden:   { opacity: 0 },
  visible:  { opacity: 1, transition: { duration: 0.3 } },
} as const;

/* Subtle name character stagger — only the name gets char-level stagger */
const nameContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.3 },
  },
} as const;

const nameLineVariants = {
  hidden:   { opacity: 0, y: 28, skewY: 1.5 },
  visible:  { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.85, ease: EASE_EXPO } },
} as const;

/**
 * HeroSection — Fully implemented hero with entrance animation.
 *
 * Animation: Framer Motion staggered entrance (load-time only).
 * GSAP scroll-scrub animation: refs are ready, wired in next step.
 *
 * GSAP targets:
 *  - sectionRef   → pin + overall scroll control
 *  - heroNameRef  → parallax y + scale on scroll
 *  - heroRoleRef  → fade + slight y on scroll
 *  - heroMetaRef  → fade on scroll
 *  - heroCtaRef   → fade on scroll
 *  - heroBgRef    → parallax background
 */
export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const heroRoleRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef  = useRef<HTMLDivElement>(null);
  const heroBgRef   = useRef<HTMLDivElement>(null);

  const scrollTo    = useScrollTo();
  const prefersReducedMotion = useFramerReducedMotion();

  const item    = prefersReducedMotion ? itemVariantsReduced : itemVariants;
  const nameLine = prefersReducedMotion ? itemVariantsReduced : nameLineVariants;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="env-light relative flex min-h-screen flex-col overflow-hidden"
      aria-label="Hero — Pravallika Dintyala, Forward Deploy Engineer"
    >

      {/* ── Background layer ─────────────────────────────────
          Three elements:
          1. Dot grid — fine, editorial technical texture
          2. Tint glow — warm soft bloom, bottom right
          3. Top-left ghost — barely-there depth
          GSAP will move this entire ref on scroll (parallax).
      ──────────────────────────────────────────────────────── */}
      <div
        ref={heroBgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{ willChange: 'transform' }}
      >
        {/* Dot grid — SVG pattern, very subtle */}
        <svg
          className="absolute inset-0 h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          style={{ opacity: 0.035 }}
        >
          <defs>
            <pattern
              id="hero-dot-grid"
              x="0"
              y="0"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="1" fill="#213661" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-dot-grid)" />
        </svg>

        {/* Primary glow — bottom right */}
        <div
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '-8%',
            width: '55%',
            height: '65%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 60% 60%, #E9EDF3 0%, transparent 68%)',
            opacity: 0.65,
            filter: 'blur(72px)',
          }}
        />

        {/* Secondary ghost — top left */}
        <div
          style={{
            position: 'absolute',
            top: '5%',
            left: '-8%',
            width: '35%',
            height: '40%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 40% 40%, #E9EDF3 0%, transparent 70%)',
            opacity: 0.28,
            filter: 'blur(90px)',
          }}
        />

        {/* Thin vertical rule — far right, editorial detail */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '8%',
            width: '1px',
            height: '100%',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(33,54,97,0.1) 30%, rgba(33,54,97,0.1) 70%, transparent 100%)',
          }}
        />

        {/* Coordinate label — very subtle, top right corner */}
        <span
          style={{
            position: 'absolute',
            top: '5.5rem',
            right: '2rem',
            fontSize: '0.6rem',
            fontFamily: "'Inter', monospace",
            fontWeight: 500,
            letterSpacing: '0.12em',
            color: 'rgba(33,54,97,0.2)',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
            userSelect: 'none',
          }}
        >
          Portfolio · 2026
        </span>
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div
        className="container-main relative z-10 flex flex-1 flex-col justify-end"
        style={{ paddingBottom: '5.5rem', paddingTop: '6rem' }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ── Eyebrow ─────────────────────────────────────── */}
          <motion.div
            variants={item}
            className="mb-7 flex items-center gap-3"
          >
            <span
              style={{
                display: 'inline-block',
                width: '1.75rem',
                height: '1px',
                background: 'var(--color-navy)',
                opacity: 0.5,
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            <span className="type-eyebrow" style={{ color: 'var(--color-navy)', opacity: 0.75 }}>
              Forward Deploy Engineer
            </span>
          </motion.div>

          {/* ── Name ────────────────────────────────────────── */}
          <motion.h1
            ref={heroNameRef}
            variants={nameContainerVariants}
            style={{ willChange: 'transform, opacity', overflow: 'hidden' }}
            aria-label="Pravallika Dintyala"
          >
            {/* "Pravallika" line */}
            <motion.span
              variants={nameLine}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 800,
                lineHeight: 0.93,
                letterSpacing: '-0.03em',
                color: 'var(--color-ink)',
              }}
            >
              Pravallika
            </motion.span>

            {/* "Dintyala" line — signature navy */}
            <motion.span
              variants={nameLine}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-hero)',
                fontWeight: 800,
                lineHeight: 0.93,
                letterSpacing: '-0.03em',
                color: 'var(--color-navy)',
              }}
            >
              Dintyala
            </motion.span>
          </motion.h1>

          {/* ── Thin rule under name ─────────────────────────── */}
          <motion.div
            variants={item}
            style={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
            }}
          >
            {/* Short horizontal rule */}
            <div
              style={{
                width: '3rem',
                height: '1px',
                background: 'var(--color-navy)',
                opacity: 0.3,
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {/* Role */}
            <p
              ref={heroRoleRef}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(0.8rem, 1.4vw, 0.9375rem)',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'rgba(18,30,53,0.45)',
                willChange: 'transform, opacity',
              }}
            >
              Forward Deploy Engineer · We2 Systems
            </p>
          </motion.div>

          {/* ── Description ─────────────────────────────────── */}
          <motion.p
            ref={heroMetaRef}
            variants={item}
            style={{
              marginTop: '1.75rem',
              maxWidth: '440px',
              fontSize: 'clamp(0.9rem, 1.3vw, 1rem)',
              lineHeight: 1.75,
              color: 'rgba(18,30,53,0.42)',
              willChange: 'transform, opacity',
            }}
          >
            Building practical software solutions and working across
            development, cloud infrastructure, and deployment.
          </motion.p>

          {/* ── CTAs ────────────────────────────────────────── */}
          <motion.div
            ref={heroCtaRef}
            variants={item}
            style={{
              marginTop: '2.75rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.875rem',
              willChange: 'transform, opacity',
            }}
          >
            {/* Primary CTA — magnetic-ready */}
            <HeroCTA
              id="hero-cta-experience"
              onClick={() => scrollTo('experience', -70)}
              primary
            >
              See My Experience
              <AnimatedArrow direction="right" size={14} animated={false} />
            </HeroCTA>

            {/* Secondary CTA */}
            <HeroCTA
              id="hero-cta-projects"
              onClick={() => scrollTo('projects', -70)}
            >
              View Projects
            </HeroCTA>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────────── */}
      <motion.div
        className="container-main relative z-10 w-full"
        style={{ paddingBottom: '2.25rem' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
          }}
        >
          {/* Animated vertical line */}
          <ScrollLine />

          <span
            style={{
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(18,30,53,0.28)',
            }}
          >
            Scroll
          </span>
        </div>
      </motion.div>

      {/* ── Bottom gradient — blends into About section ──────── */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '5rem',
          background: 'linear-gradient(to bottom, transparent, rgba(233,237,243,0.12))',
        }}
        aria-hidden="true"
      />
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   HeroCTA — Self-contained primary/secondary button
   Magnetic effect lives here: CSS transform via JS event handler.
   Framer Motion handles tap feedback.
   GSAP does NOT touch this element.
──────────────────────────────────────────────────────────── */
interface HeroCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  id?: string;
  primary?: boolean;
}

function HeroCTA({ children, onClick, id, primary = false }: HeroCTAProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const prefersReducedMotion = useFramerReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width  / 2) * 0.25;
    const y = (e.clientY - rect.top  - rect.height / 2) * 0.25;
    ref.current.style.transform  = `translate(${x}px, ${y}px)`;
    ref.current.style.transition = 'transform 0.08s linear';
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform  = 'translate(0, 0)';
    ref.current.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={!prefersReducedMotion ? { scale: 0.97 } : undefined}
      className={primary ? 'btn btn-primary btn-lg' : 'btn btn-outline btn-lg'}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* Shine sweep on hover — only primary */}
      {primary && (
        <span
          className="hero-cta-shine"
          aria-hidden="true"
        />
      )}
      {children}
    </motion.button>
  );
}

/* ────────────────────────────────────────────────────────────
   ScrollLine — Animated vertical line scroll indicator
   CSS animation only. No GSAP, no Framer Motion.
──────────────────────────────────────────────────────────── */
function ScrollLine() {
  return (
    <span
      style={{
        display: 'block',
        width: '1px',
        height: '2.5rem',
        background: 'linear-gradient(to bottom, rgba(33,54,97,0.5), transparent)',
        animation: 'scrollLineAnim 1.8s ease-in-out infinite',
        transformOrigin: 'top',
      }}
      aria-hidden="true"
    />
  );
}
