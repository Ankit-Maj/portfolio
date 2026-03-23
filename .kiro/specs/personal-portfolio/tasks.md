# Implementation Plan: Personal Portfolio

## Overview

Incremental build from scaffold → global infrastructure → section components → enhancements → tests. Each task wires into the previous so there is no orphaned code at any stage.

## Tasks

- [x] 1. Scaffold project and configure tech stack
  - Run `npm create vite@latest . -- --template react-ts`
  - Install dependencies: `tailwindcss`, `framer-motion`, `gsap`, `@studio-freight/lenis`, `lucide-react`, `@radix-ui/react-tooltip`, `@radix-ui/react-dialog`, `fast-check`, `vitest`, `@testing-library/react`, `@testing-library/jest-dom`
  - Run `npx tailwindcss init -p` and configure `tailwind.config.js` with design-system tokens (colors, fonts, fontSize, spacing, backdropBlur, animation, keyframes)
  - Add Satoshi font via `@font-face` in `src/styles/globals.css`; add Inter as Google Fonts fallback
  - Create directory structure: `src/components/layout/`, `src/components/ui/`, `src/components/sections/`, `src/hooks/`, `src/lib/`, `src/data/`, `src/__tests__/unit/`, `src/__tests__/property/`
  - Add placeholder `public/resume.pdf`
  - Configure Vitest in `vite.config.ts` with jsdom environment and `@testing-library/jest-dom` setup file
  - _Requirements: 1.1–1.10_

- [x] 2. Create typed data constants
  - [x] 2.1 Implement `src/data/projects.ts` with `Project` interface and 5–6 placeholder entries spanning `fullstack`, `ai-agent`, and `ml` domains
    - _Requirements: 10.1, 10.6_
  - [x] 2.2 Implement `src/data/skills.ts` with `Skill` and `SkillCategory` interfaces and at least 3 categories (Frontend, Backend, AI/ML), each with ≥ 3 skills; featured skills include `level` field
    - _Requirements: 9.1, 9.2_
  - [x] 2.3 Implement `src/data/certificates.ts` with `Certificate` interface and ≥ 4 placeholder entries
    - _Requirements: 11.5_
  - [x] 2.4 Implement `src/data/education.ts` with `EducationEntry` interface and ≥ 2 placeholder entries
    - _Requirements: 12.1_
  - [x] 2.5 Write property tests for data shape invariants
    - **Property 5: Skills data contains at least three categories**
    - **Property 7: Projects data spans all three required domains**
    - **Validates: Requirements 9.1, 10.6**
    - File: `src/__tests__/property/skills.property.test.tsx`, `src/__tests__/property/projects.property.test.tsx`

- [x] 3. Implement scroll infrastructure and global hooks
  - [x] 3.1 Implement `src/lib/gsap.ts` — register ScrollTrigger, export `bridgeLenisToGSAP` function
    - _Requirements: 3.1_
  - [x] 3.2 Implement `src/hooks/useLenis.ts` — initialize Lenis, call `bridgeLenisToGSAP`, catch init errors and return `null` on failure
    - _Requirements: 3.1, 3.2, 3.5_
  - [x] 3.3 Implement `src/hooks/useScrollSpy.ts` — accept section IDs, return active section ID based on viewport occupancy
    - _Requirements: 6.4_
  - [x] 3.4 Implement `src/hooks/useTilt.ts` — return ref and `onMouseMove`/`onMouseLeave` handlers that apply 3D perspective transform; disable on `(hover: none)` devices
    - _Requirements: 10.4, 16.6_
  - [x] 3.5 Implement `src/hooks/useReducedMotion.ts` — wrap Framer Motion's `useReducedMotion`, export boolean
    - _Requirements: 17.5_
  - [x] 3.6 Implement `src/lib/utils.ts` — export `cn()` helper (clsx + tailwind-merge)
  - [x] 3.7 Write property test for scroll progress computation
    - **Property 2: Scroll progress bar is proportional to scroll position**
    - **Validates: Requirements 3.4**
    - File: `src/__tests__/property/scrollProgress.property.test.ts`
  - [x] 3.8 Write property test for scroll spy
    - **Property 3: Scroll spy correctly identifies active section**
    - **Validates: Requirements 6.4**
    - File: `src/__tests__/property/scrollSpy.property.test.ts`

- [x] 4. Implement UI primitives
  - [x] 4.1 Implement `src/components/ui/GlassCard.tsx` — apply `bg-white/5 backdrop-blur-glass border border-white/10 rounded-2xl`; gradient border via `p-[1px]` wrapper + `::before` pseudo-element
    - _Requirements: 2.4_
  - [x] 4.2 Implement `src/components/ui/MagneticButton.tsx` — `mousemove` offset + Framer Motion spring `transform: translate(x, y)`
    - _Requirements: 2.1_
  - [x] 4.3 Implement `src/components/ui/CustomCursor.tsx` — fixed `pointer-events-none` div; rAF lerp position update; scale on `[data-cursor="pointer"]` hover; hidden via `@media (hover: none)`
    - _Requirements: 5.1–5.4_
  - [x] 4.4 Implement `src/components/ui/ScrollProgressBar.tsx` — fixed `h-[2px]` bar; `scaleX` driven by scroll progress from Lenis
    - _Requirements: 3.4_
  - [x] 4.5 Implement `src/components/ui/LoadingScreen.tsx` — `AnimatePresence` overlay; staggered character reveal; exits after `Math.max(animDuration, 1500)` ms; calls `onComplete` prop
    - _Requirements: 4.1–4.4_
  - [x] 4.6 Write property test for GlassCard glassmorphism classes
    - **Property 1: GlassCard always carries glassmorphism classes**
    - **Validates: Requirements 2.4**
    - File: `src/__tests__/property/glassCard.property.test.tsx`
  - [x] 4.7 Write unit tests for LoadingScreen timing and CustomCursor visibility
    - Test: `LoadingScreen` visible at 1499 ms, hidden after 1500 ms
    - Test: `CustomCursor` hidden on touch devices
    - File: `src/__tests__/unit/LoadingScreen.test.tsx`

- [x] 5. Implement layout components
  - [x] 5.1 Implement `src/components/layout/Navbar.tsx` — fixed top bar; logo left, section links right; applies `backdrop-blur` bg after Hero exits viewport; highlights active link from `useScrollSpy`; calls `lenis?.scrollTo` on link click
    - _Requirements: 6.1–6.5_
  - [x] 5.2 Implement `src/components/layout/MobileMenu.tsx` — full-height slide-in panel with `AnimatePresence`; closes on link click and scrolls to section
    - _Requirements: 6.6–6.8_
  - [x] 5.3 Wire `MobileMenu` into `Navbar` — show hamburger icon below 768 px, toggle `isOpen` state
    - _Requirements: 6.6–6.8_
  - [x] 5.4 Implement `src/components/layout/ScrollToTop.tsx` — listens to Lenis scroll; fades in after 400 px; calls `lenis?.scrollTo(0)` on click
    - _Requirements: 15.1–15.3_
  - [x] 5.5 Implement `src/components/layout/Footer.tsx` — minimal footer with name and copyright
  - [x] 5.6 Write unit tests for Navbar and ScrollToTop
    - Test: renders all 7 nav links
    - Test: active link highlighted based on `activeSection` prop
    - File: `src/__tests__/unit/Navbar.test.tsx`
  - [x] 5.7 Write property test for scroll-to-top button visibility
    - **Property 11: Scroll-to-top button visibility is determined by scroll threshold**
    - **Validates: Requirements 15.1, 15.3**
    - File: `src/__tests__/property/scrollToTop.property.test.ts`

- [x] 6. Checkpoint — wire App.tsx and verify global infrastructure
  - Implement `src/App.tsx`: render `LoadingScreen`, `CustomCursor`, `ScrollProgressBar`, `Navbar`, `<main>` (section stubs), `Footer`, `ScrollToTop`
  - Initialize `useLenis` in `App.tsx`; pass `lenis` instance to components that need it
  - Gate scroll-triggered animations behind `isLoaded` state set by `LoadingScreen.onComplete`
  - Update `src/main.tsx` to import `src/styles/globals.css` and render `<App />`
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 1.10, 3.1–3.5, 4.4_

- [x] 7. Implement Hero section
  - [x] 7.1 Implement `src/components/sections/Hero.tsx` — `min-h-screen` layout; staggered word/character heading reveal via Framer Motion `staggerChildren`; typewriter subtitle; animated gradient orb background
    - _Requirements: 7.1–7.3, 7.6_
  - [x] 7.2 Add CTA buttons to Hero — `MagneticButton` wrappers; "View Projects" calls `lenis?.scrollTo('#projects')`; "Download Resume" uses `<a href="/resume.pdf" download>`; `onError` handler sets `resumeUnavailable` state and shows Radix `Tooltip`
    - _Requirements: 7.4, 7.7, 14.1–14.3_
  - [x] 7.3 Add profile image with GSAP ScrollTrigger parallax (`scrub: true`, `y` offset)
    - _Requirements: 7.5_
  - [x] 7.4 Write unit tests for Hero
    - Test: "Download Resume" anchor has `download` attribute and `href="/resume.pdf"`
    - Test: "View Projects" button present
    - File: `src/__tests__/unit/Hero.test.tsx`

- [x] 8. Implement About section
  - [x] 8.1 Implement `src/components/sections/About.tsx` — `grid grid-cols-1 md:grid-cols-2` split; bio inside `GlassCard`; decorative image/shape on right; stat badges with accent color
    - _Requirements: 8.1–8.3, 8.5_
  - [x] 8.2 Add GSAP ScrollTrigger slide-in animations — left side from `x: -80`, right from `x: 80`
    - _Requirements: 8.4_

- [x] 9. Implement Skills section
  - [x] 9.1 Implement `src/components/sections/Skills.tsx` — three category groups; skill pills with icon + label; hover glow via `box-shadow`; Framer Motion `staggerChildren` on section enter
    - _Requirements: 9.1–9.4_
  - [x] 9.2 Add animated progress bars for featured skills — `scaleX` from 0 → `level/100` triggered by ScrollTrigger
    - _Requirements: 9.5_
  - [x] 9.3 Write property test for skill rendering
    - **Property 4: Every skill is rendered with an icon and label**
    - **Validates: Requirements 9.2**
    - File: `src/__tests__/property/skills.property.test.tsx`

- [x] 10. Implement Projects section
  - [x] 10.1 Implement `src/components/sections/Projects.tsx` — bento grid `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`; each card uses `GlassCard` + `useTilt`; hover overlay with "Live Demo" + "GitHub" buttons; image zoom on hover
    - _Requirements: 10.1–10.4_
  - [x] 10.2 Add GSAP ScrollTrigger staggered fade-up on section enter; disable tilt on touch devices
    - _Requirements: 10.5, 16.6_
  - [x] 10.3 Write property test for project card rendering
    - **Property 6: Every project card renders all required fields**
    - **Validates: Requirements 10.2**
    - File: `src/__tests__/property/projects.property.test.tsx`

- [x] 11. Implement Certificates section
  - [x] 11.1 Implement `src/components/sections/Certificates.tsx` — auto-scrolling CSS marquee (`@keyframes marquee`); two identical lists for seamless loop; each card uses `GlassCard` with image, title, issuer; hover pauses animation and scales card
    - _Requirements: 11.1–11.5_
  - [x] 11.2 Write property test for certificate card rendering
    - **Property 8: Every certificate card renders all required fields**
    - **Validates: Requirements 11.2**
    - File: `src/__tests__/property/certificates.property.test.tsx`

- [x] 12. Implement Education section
  - [x] 12.1 Implement `src/components/sections/Education.tsx` — vertical timeline with accent line + dot connectors; each entry in `GlassCard` with institution, degree, dates, description; GSAP ScrollTrigger `y: 40, opacity: 0` entrance per entry
    - _Requirements: 12.1–12.4_
  - [x] 12.2 Write property test for education entry rendering
    - **Property 9: Every education entry renders all required fields**
    - **Validates: Requirements 12.2**
    - File: `src/__tests__/property/education.property.test.tsx`

- [x] 13. Implement Contact section
  - [x] 13.1 Implement `src/components/sections/Contact.tsx` — `GlassCard` form with Name, Email, Message fields; floating label CSS transitions; per-field error state; success checkmark animation on valid submit; social icon links (GitHub, LinkedIn, Twitter/X); no network requests
    - _Requirements: 13.1–13.6_
  - [x] 13.2 Write property test for contact form validation
    - **Property 10: Contact form validates all required fields before submission**
    - **Validates: Requirements 13.4**
    - File: `src/__tests__/property/contact.property.test.tsx`
  - [x] 13.3 Write unit tests for Contact form
    - Test: shows success state after valid submission
    - Test: shows inline error for each empty field on invalid submission
    - File: `src/__tests__/unit/Contact.test.tsx`

- [x] 14. Checkpoint — integrate all sections into App.tsx
  - Replace section stubs in `<main>` with real section components
  - Verify section IDs match `useScrollSpy` and Navbar link targets
  - Verify `lenis?.scrollTo` calls resolve to correct section IDs
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 3.3, 6.4_

- [x] 15. Apply responsiveness and accessibility
  - [x] 15.1 Audit and fix responsive layouts — Projects grid collapses to single column < 768 px; About stacks vertically < 768 px; Skills pills reflow without overflow; Certificates carousel stays horizontally scrollable
    - _Requirements: 16.1–16.5_
  - [x] 15.2 Add semantic HTML elements throughout — `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`; add `alt` text to all images; add `onError` fallback to placeholder SVG on all `<img>` elements
    - _Requirements: 17.2, 17.3_
  - [x] 15.3 Add `loading="lazy"` to all section images
    - _Requirements: 17.1_
  - [x] 15.4 Apply `prefers-reduced-motion` — collapse Framer Motion variants to instant opacity; set GSAP `duration: 0`; set Lenis `lerp: 1`; pause marquee animation
    - _Requirements: 17.5_
  - [x] 15.5 Write property tests for image accessibility
    - **Property 12: All images have non-empty alt text**
    - **Property 13: All images use lazy loading**
    - **Validates: Requirements 17.3, 17.1**
    - File: `src/__tests__/property/images.property.test.tsx`, `src/__tests__/property/lazyLoading.property.test.tsx`
  - [x] 15.6 Write unit tests for accessibility and data integrity
    - Test: semantic elements present (`<header>`, `<main>`, `<nav>`, `<footer>`)
    - Test: `certificates` array length ≥ 4, `education` array length ≥ 2
    - File: `src/__tests__/unit/accessibility.test.tsx`, `src/__tests__/unit/data.test.ts`

- [x] 16. Final checkpoint — full test suite and polish
  - Run full Vitest suite (`vitest --run`) and fix any failures
  - Verify all 13 correctness properties have corresponding property-based tests
  - Verify `prefers-reduced-motion` behavior across all animated components
  - Ensure all tests pass, ask the user if questions arise.
  - _Requirements: 17.4_

## Notes

- Tasks marked with `*` are optional and can be skipped for a faster MVP
- Each task references specific requirements for traceability
- Checkpoints at tasks 6 and 14 ensure incremental validation before adding more sections
- Property tests validate all 13 correctness properties defined in the design document
- Unit tests cover concrete scenarios, edge cases, and data integrity checks
