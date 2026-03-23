import { useEffect, useRef } from 'react'
import { MapPin, Calendar } from 'lucide-react'
import { education } from '../../data/education'
import { GlassCard } from '../ui/GlassCard'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function Education() {
  const sectionRef = useRef<HTMLElement>(null)
  const entriesRef = useRef<(HTMLDivElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const entries = entriesRef.current.filter(Boolean)
    if (entries.length === 0) return

    const ctx = gsap.context(() => {
      entries.forEach((entry) => {
        gsap.from(entry, {
          y: reducedMotion ? 0 : 40,
          opacity: 0,
          duration: reducedMotion ? 0 : 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        })
      })
    })
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id="education" className="px-6 py-24">
      {/* Section header */}
      <div className="mx-auto mb-16 max-w-5xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Education</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          The foundation<br />
          <span className="text-white/40">behind the craft.</span>
        </h2>
      </div>

      {/* Timeline */}
      <div className="mx-auto max-w-3xl">
        <div className="relative">
          {/* Vertical accent line */}
          <div className="absolute left-6 top-0 h-full w-[2px] bg-gradient-to-b from-accent via-accent-2 to-transparent" />

          <div className="space-y-8">
            {education.map((entry, index) => (
              <div
                key={entry.id}
                ref={(el) => { entriesRef.current[index] = el }}
                className="relative pl-16"
              >
                {/* Dot connector */}
                <div className="absolute left-[18px] top-6 h-4 w-4 rounded-full border-2 border-accent bg-background shadow-[0_0_12px_rgba(167,139,250,0.5)]" />

                <GlassCard className="p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg font-semibold text-white leading-snug">
                        {entry.institution}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent">{entry.degree}</p>
                      <p className="mt-2 text-sm font-semibold text-white/80">{entry.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted">
                        <Calendar size={11} />
                        {entry.dateRange}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted">
                        <MapPin size={11} />
                        {entry.location}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
