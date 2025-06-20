import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../../src/App.tsx'

describe('App', () => {
  it('renders headline', async () => {
    render(<App />)

    const headline = await screen.findByText(/Hexagonal Architecture/i)

    expect(headline).toBeInTheDocument()
  })
})
