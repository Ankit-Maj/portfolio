import { useEffect, useState } from 'react'
import { computeScrollProgress } from '../../lib/gsap'

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      setProgress(computeScrollProgress(scrollTop, maxScroll))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[9997] h-[2px] w-full origin-left bg-gradient-to-r from-accent to-accent-2"
      style={{ transform: `scaleX(${progress})` }}
    />
  )
}
