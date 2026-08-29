import { useRef } from 'react';
import { AnimatedArrow } from '../ui/AnimatedArrow';
import { useScrollTo } from '../../hooks/useLenis';

/**
 * HeroSection — Immersive opening.
 *
 * DESIGN SYSTEM STEP: Typography, spacing, visual hierarchy applied.
 * Structure is final — GSAP scroll animation targets are ref'd and ready.
 *
 * Visual language:
 *  - Full-viewport height
 *  - Large display typography (type-hero class)
 *  - Content anchored to bottom-left — editorial, not centered
 *  - Subtle tint glow — warm, not dramatic
 *  - Eyebrow label above name
 *  - CTAs use btn system from index.css
 *  - Scroll indicator at bottom
 *
 * GSAP refs ready for Step 3 animation:
 *  - heroNameRef   → large type scrub + parallax
 *  - heroRoleRef   → follow scrub with slight delay
 *  - heroMetaRef   → descriptor fade
 *  - heroCtaRef    → entrance + exit fade
 *  - heroBgRef     → parallax background element
 */
export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const heroRoleRef = useRef<HTMLParagraphElement>(null);
  const heroMetaRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef  = useRef<HTMLDivElement>(null);
  const heroBgRef   = useRef<HTMLDivElement>(null);

  const scrollTo = useScrollTo();

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="env-light relative flex min-h-screen flex-col justify-end overflow-hidden"
      aria-label="Hero — Pravallika Dintyala, Forward Deploy Engineer"
    >
      {/* ── Background ambient element ─────────────────────── */}
      <div
        ref={heroBgRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Warm tint glow — bottom right, very soft */}
        <div
          className="absolute bottom-[-10%] right-[-5%] h-[55%] w-[45%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-tint) 0%, transparent 70%)',
            opacity: 0.7,
            filter: 'blur(80px)',
          }}
        />
        {/* Top-left very subtle navy ghost */}
        <div
          className="absolute top-[10%] left-[-5%] h-[30%] w-[30%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at center, var(--color-tint) 0%, transparent 70%)',
            opacity: 0.3,
            filter: 'blur(100px)',
          }}
        />
      </div>

      {/* ── Main content ───────────────────────────────────── */}
      <div className="container-main relative z-10 w-full pb-24 pt-32 lg:pb-28">

        {/* Eyebrow */}
        <div className="mb-8 flex items-center gap-4">
          <span className="type-eyebrow">Forward Deploy Engineer</span>
          <span
            className="h-px w-8 bg-[var(--color-navy)] opacity-40"
            aria-hidden="true"
          />
          <span className="type-eyebrow opacity-40">2026</span>
        </div>

        {/* Name — primary cinematic element */}
        <h1
          ref={heroNameRef}
          className="type-hero text-[var(--color-ink)]"
          style={{ willChange: 'transform, opacity' }}
        >
          <span className="block">Pravallika</span>
          <span className="block text-[var(--color-navy)]">Dintyala</span>
          <span
            className="text-[var(--color-ink)]"
            style={{ fontSize: '0.9em' }}
          >.</span>
        </h1>

        {/* Role line */}
        <p
          ref={heroRoleRef}
          className="mt-8 font-display font-medium text-[var(--color-ink)]/50"
          style={{
            fontSize: 'clamp(1.1rem, 2.2vw, 1.5rem)',
            letterSpacing: '-0.01em',
            willChange: 'transform, opacity',
          }}
        >
          MERN Stack · AWS · Application Deployment
        </p>

        {/* Brief descriptor */}
        <p
          ref={heroMetaRef}
          className="mt-4 max-w-[520px] text-[var(--color-ink)]/45"
          style={{
            fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
            lineHeight: 1.7,
          }}
        >
          Building practical software solutions across development,
          cloud infrastructure, and deployment.
        </p>

        {/* CTAs */}
        <div
          ref={heroCtaRef}
          className="mt-12 flex flex-wrap items-center gap-3"
        >
          <button
            id="hero-cta-experience"
            className="btn btn-primary btn-lg"
            onClick={() => scrollTo('experience', -70)}
          >
            See My Experience
            <AnimatedArrow direction="right" size={15} animated={false} />
          </button>

          <button
            id="hero-cta-projects"
            className="btn btn-outline btn-lg"
            onClick={() => scrollTo('projects', -70)}
          >
            View Projects
          </button>
        </div>
      </div>

      {/* ── Scroll indicator ───────────────────────────────── */}
      <div className="container-main relative z-10 w-full pb-10">
        <div className="flex items-center gap-3">
          <AnimatedArrow
            direction="down"
            size={16}
            animated
            className="text-[var(--color-navy)]/40"
          />
          <span
            className="type-eyebrow opacity-30"
            style={{ letterSpacing: '0.25em' }}
          >
            Scroll to explore
          </span>
        </div>
      </div>

      {/* ── Section transition: fade to About ──────────────── */}
      {/* Very subtle gradient at bottom — barely visible, creates
          depth as the next section begins */}
      <div
        className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent, rgba(233,237,243,0.15))',
        }}
        aria-hidden="true"
      />
    </section>
  );
}
