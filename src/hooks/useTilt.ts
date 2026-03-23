import { useRef, useCallback } from 'react'

interface TiltHandlers {
  ref: React.RefObject<HTMLDivElement | null>
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave: () => void
}

const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

export function useTilt(maxTilt = 12): TiltHandlers {
  const ref = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice() || !ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      ref.current.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg) scale3d(1.02, 1.02, 1.02)`
      ref.current.style.transition = 'transform 0.1s ease'
    },
    [maxTilt]
  )

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)'
    ref.current.style.transition = 'transform 0.5s ease'
  }, [])

  return { ref, onMouseMove, onMouseLeave }
}
