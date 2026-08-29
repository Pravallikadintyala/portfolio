import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { NAV_ITEMS } from '../../constants/navigation';
import { useScrollTo, useLenisScroll } from '../../hooks/useLenis';

/**
 * Navbar — Refined sticky navigation.
 *
 * Design:
 *  - Transparent + minimal on hero
 *  - Warm white bg + subtle blur + hairline border on scroll
 *  - Active section indicator via Framer Motion layoutId
 *  - Wordmark "PD." as logo — typographic, no icon
 *  - Lightweight pill-style mobile menu
 *
 * No GSAP — Framer Motion handles all nav-level transitions.
 */
export function Navbar() {
  const [isScrolled, setIsScrolled]     = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileOpen, setMobileOpen]     = useState(false);
  const scrollTo = useScrollTo();

  useLenisScroll(({ scroll }) => {
    setIsScrolled(scroll > 80);
  });

  // Track which section is in the middle of the viewport
  useEffect(() => {
    const sectionIds = ['hero', ...NAV_ITEMS.map((n) => n.id)];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = useCallback(
    (id: string) => {
      scrollTo(id, -70);
      setMobileOpen(false);
    },
    [scrollTo],
  );

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <motion.header
        id="navbar"
        className={clsx(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500',
          isScrolled
            ? 'bg-[var(--color-bg)]/96 backdrop-blur-md border-b border-[var(--color-border)]'
            : 'bg-transparent border-b border-transparent',
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        role="banner"
      >
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6 lg:px-10">

          {/* Wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="font-display font-bold text-[1.1rem] tracking-tight text-[var(--color-ink)] hover:text-[var(--color-navy)] transition-colors duration-200"
            aria-label="Back to top"
          >
            PD.
          </button>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:block">
            <ul className="flex items-center gap-0.5" role="list">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    id={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={clsx(
                      'nav-link',
                      activeSection === item.id && 'active',
                    )}
                  >
                    {item.label}
                    {activeSection === item.id && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="nav-indicator"
                        transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            id="nav-mobile-toggle"
            className={clsx(
              'md:hidden relative flex h-9 w-9 items-center justify-center rounded-full',
              'border border-[var(--color-border)] transition-colors duration-200',
              mobileOpen ? 'bg-[var(--color-tint)]' : 'bg-transparent',
            )}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-menu"
          >
            <span className="sr-only">{mobileOpen ? 'Close' : 'Menu'}</span>
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <motion.span
                className="block h-px w-4 bg-[var(--color-ink)] origin-center"
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
              <motion.span
                className="block h-px w-4 bg-[var(--color-ink)]"
                animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                transition={{ duration: 0.15 }}
              />
              <motion.span
                className="block h-px w-4 bg-[var(--color-ink)] origin-center"
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="nav-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-bg)]"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 2rem)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 3rem) 2rem)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 3rem) 2rem)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Menu content */}
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col items-center gap-2" role="list">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={clsx(
                        'font-display text-4xl font-bold tracking-tight',
                        'transition-colors duration-200',
                        activeSection === item.id
                          ? 'text-[var(--color-navy)]'
                          : 'text-[var(--color-ink)]/30 hover:text-[var(--color-ink)]',
                      )}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Subtle footer in mobile menu */}
            <motion.p
              className="absolute bottom-10 text-xs tracking-widest uppercase text-[var(--color-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Pravallika Dintyala
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
