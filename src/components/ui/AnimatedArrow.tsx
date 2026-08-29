import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedArrowProps {
  direction?: 'down' | 'right' | 'up' | 'left';
  size?: number;
  className?: string;
  animated?: boolean;
}

const directionMap = {
  down: 90,
  right: 0,
  up: 270,
  left: 180,
};

/**
 * AnimatedArrow — A minimal animated arrow used for CTAs,
 * scroll indicators, and navigation affordances.
 *
 * Animates with a subtle bounce using Framer Motion.
 * Respects prefers-reduced-motion.
 */
export function AnimatedArrow({
  direction = 'right',
  size = 20,
  className,
  animated = true,
}: AnimatedArrowProps) {
  const reducedMotion = useReducedMotion();
  const rotation = directionMap[direction];

  return (
    <motion.span
      className={clsx('inline-flex items-center justify-center', className)}
      style={{ rotate: rotation }}
      animate={
        animated && !reducedMotion && direction === 'down'
          ? { y: [0, 5, 0] }
          : undefined
      }
      transition={
        animated && !reducedMotion && direction === 'down'
          ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
          : undefined
      }
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 10H16M16 10L11 5M16 10L11 15"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  );
}
