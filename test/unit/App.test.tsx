import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../../src/App.tsx'

describe('App', () => {
  it('renders headline', () => {
    render(<App />)

    const headline = screen.getByText(/Hexagonal Architecture/i)

    expect(headline).toBeInTheDocument()
  })
})
