import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  strength?: number;
  disabled?: boolean;
  type?: 'button' | 'submit';
  id?: string;
}

const variantClass: Record<string, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost:   'btn-ghost',
};

const sizeClass: Record<string, string> = {
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl',
};

/**
 * MagneticButton — Uses the CSS btn system from index.css.
 * Adds a magnetic cursor-follow effect on hover (no GSAP).
 * Framer Motion handles tap feedback only.
 */
export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = 'primary',
  size = 'md',
  strength = 0.28,
  disabled,
  type = 'button',
  id,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement & HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
      ref.current.style.transition = 'transform 0.1s linear';
    },
    [reducedMotion, strength],
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  }, []);

  const classes = clsx(
    'btn',
    variantClass[variant],
    sizeClass[size],
    disabled && 'opacity-50 pointer-events-none',
    className,
  );

  if (href) {
    return (
      <motion.a
        ref={ref as never}
        id={id}
        href={href}
        className={classes}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={!reducedMotion ? { scale: 0.97 } : undefined}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref as never}
      id={id}
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={!reducedMotion ? { scale: 0.97 } : undefined}
    >
      {children}
    </motion.button>
  );
}
