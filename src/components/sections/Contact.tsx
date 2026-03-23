import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, Link2, Mail, CheckCircle2, Send } from 'lucide-react'
import { GlassCard } from '../ui/GlassCard'

interface FormFields {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validateEmail(email: string): boolean {
  const atIdx = email.indexOf('@')
  if (atIdx < 1) return false
  const domain = email.slice(atIdx + 1)
  return domain.includes('.') && domain.length > 2
}

function validate(fields: FormFields): FormErrors {
  const errors: FormErrors = {}
  if (!fields.name.trim()) errors.name = 'Name is required'
  if (!fields.email.trim()) {
    errors.email = 'Email is required'
  } else if (!validateEmail(fields.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!fields.message.trim()) errors.message = 'Message is required'
  return errors
}

const socialLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/Ankit-Maj',
    Icon: GitBranch,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ankitmajumdar27/',
    Icon: Link2,
  },
  {
    label: 'Email',
    href: 'mailto:ankitmajumdar17@gmail.com',
    Icon: Mail,
  },
]

interface FloatingFieldProps {
  id: string
  label: string
  type?: string
  value: string
  error?: string
  onChange: (val: string) => void
  multiline?: boolean
}

function FloatingField({ id, label, type = 'text', value, error, onChange, multiline }: FloatingFieldProps) {
  const [focused, setFocused] = useState(false)
  const floated = focused || value.length > 0

  const baseClass =
    'w-full rounded-xl border bg-white/5 px-4 pt-6 pb-2 text-sm text-white outline-none transition-colors duration-200 ' +
    (error
      ? 'border-red-400/60 focus:border-red-400'
      : 'border-white/10 focus:border-accent/60')

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={
          'pointer-events-none absolute left-4 transition-all duration-200 ' +
          (floated
            ? 'top-2 text-[10px] font-medium ' + (error ? 'text-red-400' : 'text-accent')
            : 'top-1/2 -translate-y-1/2 text-sm text-muted')
        }
        style={multiline && !floated ? { top: '1.1rem', transform: 'none' } : undefined}
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass + ' resize-none'}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={baseClass}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="mt-1 text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)

  const setField = (key: keyof FormFields) => (val: string) => {
    setFields((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    // Simulate success — no network request
    setSubmitted(true)
  }

  const handleReset = () => {
    setFields({ name: '', email: '', message: '' })
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative px-6 py-24">
      {/* Background orbs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute -right-40 top-1/4 h-[400px] w-[400px] rounded-full bg-accent-2/8 blur-[100px]" />
      </div>

      {/* Section header */}
      <div className="mx-auto mb-16 max-w-5xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">Contact</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Get In Touch,<br />
          <span className="text-white/40">let's build something great.</span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 lg:grid-cols-5">
        {/* Form — takes 3 cols */}
        <div className="lg:col-span-3">
          <GlassCard className="p-8">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex flex-col items-center justify-center gap-4 py-16 text-center"
                  data-testid="success-state"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  >
                    <CheckCircle2 size={56} className="text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-semibold text-white">Message sent!</h3>
                  <p className="text-sm text-muted">Thanks for reaching out. I'll get back to you soon.</p>
                  <button
                    onClick={handleReset}
                    className="mt-4 rounded-full border border-white/20 px-6 py-2 text-sm text-white/70 transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-5"
                >
                  <FloatingField
                    id="contact-name"
                    label="Name"
                    value={fields.name}
                    error={errors.name}
                    onChange={setField('name')}
                  />
                  <FloatingField
                    id="contact-email"
                    label="Email"
                    type="email"
                    value={fields.email}
                    error={errors.email}
                    onChange={setField('email')}
                  />
                  <FloatingField
                    id="contact-message"
                    label="Message"
                    value={fields.message}
                    error={errors.message}
                    onChange={setField('message')}
                    multiline
                  />

                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-background transition-all hover:bg-accent/90 hover:shadow-[0_0_30px_rgba(167,139,250,0.35)]"
                    data-cursor="pointer"
                  >
                    Send Message <Send size={15} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </GlassCard>
        </div>

        {/* Sidebar — takes 2 cols */}
        <div className="flex flex-col gap-8 lg:col-span-2">
          {/* Blurb */}
          <GlassCard className="p-6">
            <p className="text-sm leading-relaxed text-white/70">
              Have a project in mind, a question, or just want to say hi? Fill out the form or reach
              me directly through any of the channels below.
            </p>
          </GlassCard>

          {/* Social links */}
          <GlassCard className="p-6">
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">Find me on</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-cursor="pointer"
                  className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/70 transition-all duration-200 hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
                >
                  <Icon size={18} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
