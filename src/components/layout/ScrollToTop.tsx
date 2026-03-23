import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import type Lenis from 'lenis'

interface ScrollToTopProps {
  lenis: Lenis | null
}

export function ScrollToTop({ lenis }: ScrollToTopProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleClick = () => {
    lenis?.scrollTo(0, { duration: 1.5 })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={handleClick}
          aria-label="Scroll to top"
          data-cursor="pointer"
          data-testid="scroll-to-top"
          className="fixed bottom-8 right-8 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 border border-accent/30 text-accent backdrop-blur-sm hover:bg-accent/30 transition-colors"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
