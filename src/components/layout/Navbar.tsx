import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type Lenis from 'lenis'
import { useScrollSpy } from '../../hooks/useScrollSpy'
import { MobileMenu } from './MobileMenu'
import { cn } from '../../lib/utils'

const SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

interface NavbarProps {
  lenis: Lenis | null
}

export function Navbar({ lenis }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const activeSection = useScrollSpy(SECTIONS.map((s) => s.id))

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (id: string) => {
    lenis?.scrollTo(`#${id}`, { offset: -80 })
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed left-0 right-0 top-0 z-30 px-6 py-4 transition-all duration-300',
          scrolled
            ? 'bg-background/80 backdrop-blur-glass border-b border-white/5 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="font-display text-lg font-semibold tracking-tight text-white hover:text-accent transition-colors duration-200"
            data-cursor="pointer"
            aria-label="Go to top"
          >
            Ankit Majumdar
          </button>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleNavClick(s.id)}
                data-cursor="pointer"
                className={cn(
                  'text-sm font-medium transition-colors duration-200',
                  activeSection === s.id
                    ? 'text-accent'
                    : 'text-white/60 hover:text-white'
                )}
              >
                {s.label}
              </button>
            ))}
          </nav>

          {/* Hamburger */}
          <button
            className="flex md:hidden flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            data-cursor="pointer"
          >
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-4 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </button>
        </div>
      </motion.header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        sections={SECTIONS}
        activeSection={activeSection}
        lenis={lenis}
      />
    </>
  )
}
