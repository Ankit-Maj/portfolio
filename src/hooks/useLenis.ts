import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { bridgeLenisToGSAP } from '../lib/gsap'
import { useReducedMotion } from './useReducedMotion'

export function useLenis(): Lenis | null {
  const lenisRef = useRef<Lenis | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    let lenis: Lenis | null = null
    try {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        ...(reducedMotion ? { lerp: 1 } : {}),
      })
      lenisRef.current = lenis
      bridgeLenisToGSAP(lenis)
    } catch (err) {
      console.warn('[useLenis] Failed to initialize Lenis, falling back to native scroll.', err)
      lenisRef.current = null
    }

    return () => {
      lenis?.destroy()
      lenisRef.current = null
    }
  }, [reducedMotion])

  return lenisRef.current
}
