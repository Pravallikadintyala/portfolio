import { useRef, useEffect } from 'react';
import clsx from 'clsx';
import { gsap } from '../../lib/gsap';
import { ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RevealTextProps {
  children: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  delay?: number;
  threshold?: string;
  splitBy?: 'words' | 'chars' | 'lines';
}

/**
 * RevealText — Text reveal animation using GSAP.
 * Splits text into words/chars and animates them in with a
 * clip-path or y-transform on scroll trigger.
 *
 * GSAP owns the transform and opacity on these spans.
 * Framer Motion is NOT used here to avoid conflicts.
 *
 * In reduced motion mode: text is simply visible, no animation.
 */
export function RevealText({
  children,
  className,
  as: Tag = 'p',
  delay = 0,
  threshold = 'top 85%',
  splitBy = 'words',
}: RevealTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const text = container.textContent ?? '';

    // Split text into spans
    const units = splitBy === 'words' ? text.split(' ') : text.split('');
    const separator = splitBy === 'words' ? ' ' : '';

    container.innerHTML = units
      .map((unit) => `<span class="reveal-unit" style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="reveal-inner" style="display:inline-block;">${unit}</span></span>`)
      .join(separator);

    const inners = container.querySelectorAll<HTMLElement>('.reveal-inner');

    gsap.set(inners, { yPercent: 100, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: threshold,
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(inners, {
      yPercent: 0,
      opacity: 1,
      duration: 0.65,
      ease: 'power3.out',
      stagger: 0.04,
      delay,
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === container) st.kill();
      });
      // Restore original text to avoid DOM drift
      container.textContent = text;
    };
  }, [reducedMotion, delay, threshold, splitBy]);

  return (
    <Tag ref={containerRef as never} className={clsx(className)}>
      {children}
    </Tag>
  );
}
