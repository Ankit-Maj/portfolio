import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

export function bridgeLenisToGSAP(lenis: Lenis): void {
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })
  gsap.ticker.lagSmoothing(0)
  ScrollTrigger.scrollerProxy(document.body, {
    scrollTop() {
      return lenis.scroll
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }
    },
  })
  lenis.on('scroll', () => ScrollTrigger.update())
}

/**
 * Compute scroll progress as a value in [0, 1].
 * Exported as a pure function so it can be property-tested independently.
 */
export function computeScrollProgress(scrollTop: number, maxScroll: number): number {
  if (maxScroll <= 0) return 0
  return Math.min(1, Math.max(0, scrollTop / maxScroll))
}
