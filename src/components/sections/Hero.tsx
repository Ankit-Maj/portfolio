import { useEffect, useRef, useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowDown, Download, ExternalLink } from 'lucide-react'
import { MagneticButton } from '../ui/MagneticButton'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import type Lenis from 'lenis'

interface HeroProps {
  lenis: Lenis | null
}

const headingWords = ['Ankit', 'Majumdar']
const subtitle = 'Web Development • Data Science'

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 60, skewY: 4 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.8, ease: 'easeOut' as const },
  },
}

const ctaVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 1.1, ease: 'easeOut' as const },
  },
}

export function Hero({ lenis }: HeroProps) {
  const imageRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [resumeUnavailable, setResumeUnavailable] = useState(false)
  const reducedMotion = useReducedMotion()

  // Framer Motion variants — collapse to instant opacity when reduced motion is preferred
  const activeWordVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : wordVariants

  const activeSubtitleVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : subtitleVariants

  const activeCtaVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : ctaVariants

  // GSAP parallax on profile image
  useEffect(() => {
    if (!imageRef.current || !sectionRef.current) return
    if (reducedMotion) return
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        y: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
    return () => ctx.revert()
  }, [reducedMotion])

  const handleViewProjects = () => {
    lenis?.scrollTo('#projects', { offset: -80 })
  }

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
    >
      {/* Animated gradient orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[120px] animate-gradient-shift" />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-accent-2/10 blur-[120px] animate-gradient-shift [animation-delay:4s]" />
        <div className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[100px] animate-gradient-shift [animation-delay:2s]" />
      </div>

      {/* Noise texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left: Text content */}
        <div className="flex flex-col">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-sm text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Available for opportunities
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-4 overflow-hidden font-display text-display-xl font-bold leading-none tracking-tight text-white"
          >
            {headingWords.map((word, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span variants={activeWordVariants} className="block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={activeSubtitleVariants}
            initial="hidden"
            animate="visible"
            className="mb-10 text-lg font-medium text-muted md:text-xl"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={activeCtaVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4"
          >
            <MagneticButton
              onClick={handleViewProjects}
              className="rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-background transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(167,139,250,0.4)]"
            >
              <span className="flex items-center gap-2">
                View Projects <ExternalLink size={16} />
              </span>
            </MagneticButton>

            <div className="relative">
              {resumeUnavailable && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-surface px-2 py-1 text-xs text-muted border border-white/10">
                  Resume not available
                </span>
              )}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="download-resume"
                onError={() => setResumeUnavailable(true)}
                className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-3.5 text-sm font-semibold text-white/80 transition-all hover:border-white/40 hover:text-white hover:bg-white/5"
                data-cursor="pointer"
              >
                Download Resume <Download size={16} />
              </a>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="mt-16 flex items-center gap-3 text-sm text-muted"
          >
            <ArrowDown size={16} className="animate-bounce" />
            Scroll to explore
          </motion.div>
        </div>

        {/* Right: Profile image with parallax */}
        <div className="flex justify-center lg:justify-end">
          <div ref={imageRef} className="relative">
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 to-accent-2/30 blur-2xl scale-110" />
            {/* Image container */}
            <div className="relative h-72 w-72 overflow-hidden rounded-full border border-white/10 bg-surface md:h-96 md:w-96">
              <img
                src="/profile.jpg"
                alt="Ankit Majumdar profile photo"
                loading="lazy"
                className="h-full w-full object-cover"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).src =
                    'https://via.placeholder.com/400x400/12121a/a78bfa?text=AM'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
