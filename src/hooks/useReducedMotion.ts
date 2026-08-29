// ============================================================
// useReducedMotion — Respects prefers-reduced-motion
// ============================================================

import { useEffect, useState } from 'react';

/**
 * Returns true if the user has requested reduced motion.
 * All animation hooks and components should check this and
 * skip or simplify animations accordingly.
 *
 * Usage:
 *   const reducedMotion = useReducedMotion();
 *   if (reducedMotion) return; // skip animation setup
 */
export function useReducedMotion(): boolean {
  const [reducedMotion, setReducedMotion] = useState<boolean>(() => {
    // SSR-safe initial read
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return reducedMotion;
}
