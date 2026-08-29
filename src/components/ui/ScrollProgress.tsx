import { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { getLenis } from '../../lib/lenis';

interface ScrollProgressProps {
  className?: string;
}

/**
 * ScrollProgress — A thin horizontal progress bar at the top
 * of the viewport showing overall page scroll progress.
 *
 * Uses Lenis scroll events for position.
 * Framer Motion spring for smooth visual interpolation.
 * No GSAP involvement — separate concern from scroll-scrubbed animations.
 *
 * Note: Polls for Lenis instance because Lenis is created before React
 * renders (in main.tsx) but getLenis() may still be called during the
 * initial synchronous render before the singleton is fully settled.
 */
export function ScrollProgress({ className }: ScrollProgressProps) {
  const [rawProgress, setRawProgress] = useState(0);

  // Spring-smoothed progress for visual display
  const progress = useSpring(rawProgress, { stiffness: 100, damping: 30 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleScroll = (e: any) => {
      setRawProgress(e.progress ?? 0);
    };

    // Lenis is created in main.tsx before React renders, but attach
    // listener after mount to be safe
    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', handleScroll);
      return () => lenis.off('scroll', handleScroll);
    }
  }, []);

  return (
    <motion.div
      className={className}
      style={{
        scaleX,
        transformOrigin: 'left',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'var(--color-navy)',
        zIndex: 9999,
      }}
      aria-hidden="true"
    />
  );
}
