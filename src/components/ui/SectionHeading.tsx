import clsx from 'clsx';

interface SectionHeadingProps {
  label?: string;       // Small eyebrow label above the heading
  title: string;        // Main heading text
  subtitle?: string;    // Optional subtitle
  align?: 'left' | 'center';
  className?: string;
  dark?: boolean;       // For use on dark backgrounds (Projects section)
  id?: string;
}

/**
 * SectionHeading — Consistent heading treatment across all sections.
 *
 * Structure:
 *   [label]    ← small uppercase label/eyebrow
 *   [title]    ← large bold heading
 *   [subtitle] ← optional supporting text
 *
 * This component has NO animation built in.
 * Parent sections apply scroll-triggered animations to this component
 * so the animation context is always controlled upstream.
 */
export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'left',
  className,
  dark = false,
  id,
}: SectionHeadingProps) {
  return (
    <div
      id={id}
      className={clsx(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {label && (
        <span
          className={clsx(
            'mb-3 text-xs font-semibold uppercase tracking-[0.2em]',
            dark ? 'text-[var(--color-muted)]' : 'text-[var(--color-navy)]',
          )}
        >
          {label}
        </span>
      )}

      <h2
        className={clsx(
          'font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl',
          dark ? 'text-[var(--color-bg)]' : 'text-[var(--color-ink)]',
        )}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className={clsx(
            'mt-4 max-w-xl text-base leading-relaxed md:text-lg',
            dark ? 'text-[var(--color-muted)]' : 'text-[var(--color-ink)]/60',
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
