// ============================================================
// useLenis — Access the Lenis scroll instance from components
// ============================================================

import { useEffect, useRef } from 'react';
import { getLenis } from '../lib/lenis';
import type Lenis from 'lenis';

/**
 * Returns the global Lenis instance.
 * Components can use this to programmatically scroll to
 * sections or listen to scroll events.
 */
export function useLenis(): Lenis | null {
  return getLenis();
}

/**
 * Smoothly scrolls to a DOM element by ID using Lenis.
 * Falls back to native scrollIntoView if Lenis isn't available.
 */
export function useScrollTo() {
  const lenis = getLenis();

  return (targetId: string, offset = 0) => {
    const target = document.getElementById(targetId);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target, { offset, duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 3) });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

/**
 * Subscribe to Lenis scroll events.
 * Automatically unsubscribes on component unmount.
 */
export function useLenisScroll(
  callback: (e: { scroll: number; progress: number; velocity: number }) => void,
) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => callbackRef.current(e);
    lenis.on('scroll', handler);

    return () => {
      lenis.off('scroll', handler);
    };
  }, []);
}
