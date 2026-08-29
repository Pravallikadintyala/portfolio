import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

// ============================================================
// Animation Infrastructure Bootstrap
//
// ORDER IS CRITICAL:
// 1. Import GSAP lib (registers plugins)
// 2. Create Lenis instance
// 3. Connect Lenis to GSAP ticker
// 4. Add Lenis scroll → ScrollTrigger.update bridge
// 5. Render React app
//
// This runs BEFORE React renders, ensuring the scroll
// infrastructure is ready before any component mounts.
// ============================================================

import { gsap, ScrollTrigger } from './lib/gsap';
import { createLenis } from './lib/lenis';

// Step 1: Create the Lenis smooth scroll instance
const lenis = createLenis();

// Step 2: Connect Lenis to GSAP's ticker loop
// This is the KEY bridge — Lenis runs inside GSAP's RAF,
// not its own. This guarantees scroll position and GSAP
// animation timelines are in sync on the exact same frame.
gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // GSAP time is in seconds, Lenis expects ms
});

// Step 3: Disable GSAP's default lag smoothing
// Lenis handles its own easing — GSAP lag smoothing would
// create double-smoothing artifacts.
gsap.ticker.lagSmoothing(0);

// Step 4: Bridge Lenis scroll position → ScrollTrigger
// Without this, ScrollTrigger reads native scroll position,
// not Lenis's smooth-scrolled position. This causes timeline
// scrubbing to be jerky/stuttery.
lenis.on('scroll', () => {
  ScrollTrigger.update();
});

// Step 5: Mount React
const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
