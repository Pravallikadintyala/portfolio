// ============================================================
// GSAP Central Registration
// All plugins registered ONCE here. Import from this file
// everywhere — never import directly from 'gsap' to avoid
// duplicate registration warnings.
// ============================================================

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Global GSAP defaults for consistent, premium feel
gsap.defaults({
  ease: 'power2.out',
  duration: 0.8,
});

// ScrollTrigger defaults
ScrollTrigger.defaults({
  // Markers only in development — remove for production
  markers: false,
});

export { gsap, ScrollTrigger, ScrollToPlugin };
