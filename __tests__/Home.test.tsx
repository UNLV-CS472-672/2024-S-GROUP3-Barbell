import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('should have Docs text', () => {
    render(<Home />)
    const elem = screen.getByText('Docs')
    expect(elem).toBeInTheDocument()
  })
})
