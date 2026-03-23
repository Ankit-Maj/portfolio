import { motion, AnimatePresence } from 'framer-motion'
import type Lenis from 'lenis'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  sections: { id: string; label: string }[]
  activeSection: string
  lenis: Lenis | null
}

export function MobileMenu({ isOpen, onClose, sections, activeSection, lenis }: MobileMenuProps) {
  const handleClick = (id: string) => {
    onClose()
    setTimeout(() => {
      lenis?.scrollTo(`#${id}`, { offset: -80 })
    }, 300)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.nav
            key="panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col bg-surface px-8 py-12 shadow-2xl"
            aria-label="Mobile navigation"
          >
            <button
              onClick={onClose}
              className="mb-10 self-end text-muted hover:text-white transition-colors"
              aria-label="Close menu"
              data-cursor="pointer"
            >
              ✕
            </button>
            <ul className="flex flex-col gap-6">
              {sections.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <button
                    onClick={() => handleClick(s.id)}
                    className={`text-xl font-medium transition-colors ${
                      activeSection === s.id ? 'text-accent' : 'text-white/70 hover:text-white'
                    }`}
                    data-cursor="pointer"
                  >
                    {s.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  )
}
