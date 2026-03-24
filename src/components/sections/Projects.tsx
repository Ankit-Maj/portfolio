import { useEffect, useRef } from 'react'
import { ExternalLink, GitBranch } from 'lucide-react'
import { projects, type Project } from '../../data/projects'
import { GlassCard } from '../ui/GlassCard'
import { useTilt } from '../../hooks/useTilt'
import { gsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ProjectCardProps {
  project: Project
  index: number
}

function ProjectCard({ project }: ProjectCardProps) {
  const { ref, onMouseMove, onMouseLeave } = useTilt(8)

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group relative ${project.featured ? 'md:col-span-2 lg:col-span-1' : ''}`}
      data-testid={`project-card-${project.id}`}
    >
      <GlassCard className="overflow-hidden">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            loading="lazy"
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                'https://via.placeholder.com/600x400/12121a/ffffff?text=Project'
            }}
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-background hover:bg-accent/90 transition-colors"
                data-cursor="pointer"
                aria-label={`Live demo of ${project.title}`}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              data-cursor="pointer"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <GitBranch size={14} />
              GitHub
            </a>
          </div>
          {/* Domain badge */}
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-background/80 px-2 py-0.5 text-xs font-medium text-accent backdrop-blur-sm border border-accent/20">
              {project.domain === 'ai-agent' ? 'AI Agent' : project.domain === 'ml' ? 'ML' : 'Full Stack'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 font-display text-lg font-semibold text-white">{project.title}</h3>
          <p className="mb-4 text-sm leading-relaxed text-white/60">{project.description}</p>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-muted border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!gridRef.current) return
    const cards = gridRef.current.querySelectorAll('[data-testid^="project-card-"]')
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from(cards, {
        y: reducedMotion ? 0 : 60,
        opacity: 0,
        duration: reducedMotion ? 0 : 0.8,
        stagger: reducedMotion ? 0 : 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      })
    })
    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section ref={sectionRef} id="projects" className="px-6 py-24">
      {/* Section header */}
      <div className="mx-auto mb-16 max-w-7xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Projects</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Things I&apos;ve built,<br />
          <span className="text-white/40">shipped, and learned from.</span>
        </h2>
      </div>

      <div
        ref={gridRef}
        className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
