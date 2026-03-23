import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Code2, FileCode, Palette, Server, Rocket, Terminal,
  Database, BarChart2, Container, Layers, Zap, Box,
  Cpu, type LucideIcon,
} from 'lucide-react'
import { skillCategories } from '../../data/skills'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const iconMap: Record<string, LucideIcon> = {
  Code2, FileCode, Palette, Server, Rocket, Terminal,
  Database, BarChart2, Container, Layers, Zap, Box, Cpu,
}

const categoryStyles = [
  {
    pill: 'border-accent/25 bg-accent/8 text-accent hover:bg-accent/15 hover:border-accent/50',
    dot: 'bg-accent',
    heading: 'text-accent',
  },
  {
    pill: 'border-accent-2/25 bg-accent-2/8 text-accent-2 hover:bg-accent-2/15 hover:border-accent-2/50',
    dot: 'bg-accent-2',
    heading: 'text-accent-2',
  },
  {
    pill: 'border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white',
    dot: 'bg-white/40',
    heading: 'text-white/80',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const pillVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const reducedMotion = useReducedMotion()

  const activePillVariants = reducedMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0 } } }
    : pillVariants

  return (
    <section ref={sectionRef} id="skills" className="px-6 py-24">
      {/* Section header */}
      <div className="mx-auto mb-16 max-w-5xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Skills</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Tools of the trade,<br />
          <span className="text-white/40">mastered with purpose.</span>
        </h2>
      </div>

      <div className="mx-auto max-w-5xl grid grid-cols-1 gap-8 md:grid-cols-3">
        {skillCategories.map((category, catIdx) => {
          const style = categoryStyles[catIdx % categoryStyles.length]
          return (
            <div
              key={category.name}
              className="rounded-2xl border border-white/8 bg-white/3 p-7 backdrop-blur-sm"
            >
              {/* Category header */}
              <div className="mb-6 flex items-center gap-2.5">
                <span className={`h-2 w-2 rounded-full ${style.dot}`} />
                <h3 className={`text-sm font-semibold uppercase tracking-widest ${style.heading}`}>
                  {category.name}
                </h3>
              </div>

              {/* Pills */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="flex flex-wrap gap-2.5"
              >
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon]
                  return (
                    <motion.div
                      key={skill.label}
                      variants={activePillVariants}
                      className={`flex cursor-default items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${style.pill}`}
                    >
                      {Icon && <Icon size={13} />}
                      <span data-testid={`skill-label-${skill.label}`}>{skill.label}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
