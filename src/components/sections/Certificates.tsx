import { certificates } from '../../data/certificates'
import { GlassCard } from '../ui/GlassCard'

function CertCard({ cert }: { cert: typeof certificates[0] }) {
  return (
    <a
      href={cert.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${cert.title} certificate`}
      data-cursor="pointer"
      className="group mx-3 w-72 flex-shrink-0 block transition-transform duration-300 hover:scale-105"
    >
      <GlassCard className="overflow-hidden">
        <div className="overflow-hidden">
          <img
            src={cert.image}
            alt={`${cert.title} certificate`}
            loading="lazy"
            className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                'https://via.placeholder.com/320x220/12121a/ffffff?text=Certificate'
            }}
          />
        </div>
        <div className="p-5">
          <p className="mb-1.5 text-sm font-semibold text-white leading-snug">{cert.title}</p>
          <p className="text-xs text-muted">{cert.issuer}</p>
          <p className="mt-1.5 text-xs text-accent">{cert.date}</p>
        </div>
      </GlassCard>
    </a>
  )
}

export function Certificates() {
  return (
    <section id="certificates" className="overflow-x-hidden px-0 py-24">
      {/* Section header */}
      <div className="mx-auto mb-16 max-w-5xl px-6">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Certificates</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Credentials that<br />
          <span className="text-white/40">back the work.</span>
        </h2>
      </div>

      {/* Marquee container */}
      <div
        className="group flex w-full overflow-x-hidden"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        {/* Two identical lists for seamless loop */}
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]">
          {certificates.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>
        <div className="flex animate-marquee group-hover:[animation-play-state:paused]" aria-hidden="true">
          {certificates.map((cert) => (
            <CertCard key={`dup-${cert.id}`} cert={cert} />
          ))}
        </div>
      </div>
    </section>
  )
}
