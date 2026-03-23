import { useState, useEffect } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 0.5): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')

  useEffect(() => {
    if (sectionIds.length === 0) return

    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      let bestId = sectionIds[0]
      let bestOverlap = -Infinity

      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const visibleTop = Math.max(0, rect.top)
        const visibleBottom = Math.min(viewportHeight, rect.bottom)
        const overlap = visibleBottom - visibleTop
        if (overlap > bestOverlap) {
          bestOverlap = overlap
          bestId = id
        }
      }

      // Also check if a section's top is within the upper portion of the viewport
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= viewportHeight * offset && rect.bottom > 0) {
          bestId = id
          break
        }
      }

      setActiveId(bestId)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sectionIds, offset])

  return activeId
}
