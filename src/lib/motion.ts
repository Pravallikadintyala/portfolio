// ============================================================
// Shared Framer Motion Variants
//
// These are used for component-level animations ONLY.
// GSAP owns scroll-scrubbed transforms. Framer Motion owns
// hover states, micro-interactions, and small entrance
// transitions on separate DOM nodes.
// ============================================================

import type { Variants } from 'framer-motion';

// Standard fade-up — used for medium-priority section reveals
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Staggered container — orchestrates child animations
export const staggerContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Item within a staggered container
export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Scale-in — for cards, tags
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// Hover lift — for cards
export const cardHoverVariants = {
  rest: { y: 0, transition: { duration: 0.25, ease: 'easeOut' } },
  hover: { y: -4, transition: { duration: 0.25, ease: 'easeOut' } },
};

// Button hover — subtle scale
export const buttonHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } },
  tap: { scale: 0.98, transition: { duration: 0.1 } },
};

// Reduced motion alternatives — flat, instant transitions
export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
};
