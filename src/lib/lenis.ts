// ============================================================
// Lenis Singleton Factory
//
// Lenis is created ONCE and exported. The GSAP ticker bridge
// is established in main.tsx after both Lenis and GSAP are
// initialized. This separation keeps the singleton clean.
//
// Connection flow:
//   Lenis produces smooth scroll position
//   → GSAP ticker calls lenis.raf() every frame
//   → Lenis scroll event triggers ScrollTrigger.update()
//   → GSAP timelines scrub forward/backward correctly
// ============================================================

import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export function createLenis(): Lenis {
  if (lenisInstance) {
    return lenisInstance;
  }

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  });

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function destroyLenis(): void {
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}
