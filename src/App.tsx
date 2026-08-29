import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollProgress } from './components/ui/ScrollProgress';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { EducationSection } from './components/sections/EducationSection';
import { CertificationsSection } from './components/sections/CertificationsSection';
import { ContactSection } from './components/sections/ContactSection';

/**
 * App — Root component.
 *
 * DESIGN SYSTEM NOTE: Section ordering and transition handling.
 *
 * LIGHT ENV SEQUENCE:
 *   Hero (env-light)
 *   About (env-light)
 *   Experience (env-light)
 *
 * TRANSITION: light → dark
 *   .transition-to-dark wrapper fades the bottom of Experience
 *   into the dark background of Projects.
 *
 * DARK ENV:
 *   Projects (env-dark — #121E35)
 *
 * TRANSITION: dark → light
 *   The Skills section uses env-light and begins immediately after.
 *   A gradient at the top of the Skills wrapper (via .transition-from-dark)
 *   creates a smooth return from dark.
 *
 * LIGHT ENV SEQUENCE:
 *   Skills (env-light)
 *   Education (env-tint)
 *   Certifications (env-light)
 *   Contact (env-tint)
 */
function App() {
  return (
    <>
      {/* Scroll progress indicator */}
      <ScrollProgress />

      {/* Navigation */}
      <Navbar />

      <main id="main-content">
        {/* ── Light sequence ──────────────────────────────── */}
        <HeroSection />
        <AboutSection />
        <ExperienceSection />

        {/* ── Light → Dark transition ──────────────────────
            The gradient wrapper creates a smooth fade from
            the warm off-white (#F7F6F2) into the deep ink
            (#121E35) before the Projects section starts.
            Height is set to 80px — visible during scroll but
            not so large it looks designed.
        ─────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            height: '80px',
            marginBottom: '-1px',
            background: 'linear-gradient(to bottom, var(--color-bg), var(--color-ink))',
          }}
        />

        {/* ── Dark cinematic section ───────────────────────── */}
        <ProjectsSection />

        {/* ── Dark → Light transition ──────────────────────
            Gradient from ink back to the light bg.
        ─────────────────────────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            height: '80px',
            marginTop: '-1px',
            background: 'linear-gradient(to bottom, var(--color-ink), var(--color-bg))',
          }}
        />

        {/* ── Light sequence returns ────────────────────────── */}
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}

export default App;
