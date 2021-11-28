import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import App from '.'

describe('App', () => {

  beforeEach(() => {
    act(() => {
      render(<App />)
    })
  })

  it('Should render the main content', () => {
    const main = screen.getAllByRole('main')
    expect(main).toHaveLength(1)
  })
})
