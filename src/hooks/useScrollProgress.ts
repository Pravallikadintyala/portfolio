// ============================================================
// useScrollProgress — Tracks scroll progress of an element
// within the viewport using GSAP ScrollTrigger.
// ============================================================

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from '../lib/gsap';

interface ScrollProgressOptions {
  start?: string;
  end?: string;
}

/**
 * Returns a 0–1 progress value tracking scroll position
 * of the provided ref element.
 *
 * Usage:
 *   const { ref, progress } = useScrollProgress({ start: 'top bottom', end: 'bottom top' });
 *   <div ref={ref} style={{ opacity: progress }} />
 */
export function useScrollProgress<T extends HTMLElement>(options?: ScrollProgressOptions) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  const start = options?.start ?? 'top bottom';
  const end = options?.end ?? 'bottom top';

  useEffect(() => {
    if (!ref.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start,
      end,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    return () => trigger.kill();
  }, [start, end]);

  return { ref, progress };
}
