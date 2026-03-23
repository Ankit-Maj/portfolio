import { useEffect, useRef } from 'react'
import { GlassCard } from '../ui/GlassCard'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function About() {
  const cardRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!cardRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: reducedMotion ? 0 : 40,
        opacity: 0,
        duration: reducedMotion ? 0 : 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id="about" className="relative px-6 py-24">
      <div className="mx-auto mb-16 max-w-5xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">About Me</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Crafting intelligent systems,<br />
          <span className="text-white/40">one line at a time.</span>
        </h2>
      </div>

      <div ref={cardRef} className="mx-auto max-w-5xl">
        <GlassCard className="p-10">
          <div className="space-y-5 text-base leading-8 text-white/70">
            <p>
              I'm a <span className="font-semibold text-white">Full Stack Developer</span> with a growing focus on building intelligent systems at the intersection of web development and AI. I enjoy creating scalable applications that are not just functional, but thoughtfully designed and efficient.
            </p>
            <p>
              My work spans across modern frontend frameworks, backend systems, and increasingly into <span className="text-accent">agentic AI</span> and machine learning. I'm particularly interested in how autonomous agents and data-driven models can enhance real-world applications and user experiences.
            </p>
            <p>
              I approach development with a problem-solving mindset — breaking down complex systems, optimizing performance, and continuously refining both code and design. Whether it's building end-to-end web apps or experimenting with <span className="text-accent-2">AI-driven workflows</span>, I focus on writing clean, maintainable, and impactful solutions.
            </p>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
