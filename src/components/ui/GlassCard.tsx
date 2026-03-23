import { type ReactNode } from 'react'
import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 via-white/5 to-transparent">
      <div
        className={cn(
          'relative rounded-2xl bg-white/5 backdrop-blur-glass border border-white/10 h-full w-full',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}
