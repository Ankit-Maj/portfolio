import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Contact } from '../../components/sections/Contact'

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>('framer-motion')
  return {
    ...actual,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    motion: new Proxy(actual.motion, {
      get: (_target, prop: string) => {
        const Tag = prop as keyof JSX.IntrinsicElements
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return ({ children, ...rest }: any) => {
          const { initial, animate, exit, transition, whileHover, whileTap, ...domProps } = rest
          void initial; void animate; void exit; void transition; void whileHover; void whileTap
          return <Tag {...domProps}>{children}</Tag>
        }
      },
    }),
  }
})

describe('Contact', () => {
  it('shows success state after valid submission', () => {
    render(<Contact />)

    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Doe' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello there!' } })
    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByTestId('success-state')).toBeInTheDocument()
    expect(screen.getByText('Message sent!')).toBeInTheDocument()
  })

  it('shows inline error for each empty field on invalid submission', () => {
    render(<Contact />)

    fireEvent.click(screen.getByRole('button', { name: /send message/i }))

    expect(screen.getByText('Name is required')).toBeInTheDocument()
    expect(screen.getByText('Email is required')).toBeInTheDocument()
    expect(screen.getByText('Message is required')).toBeInTheDocument()
  })
})
