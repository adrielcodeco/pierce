import React from 'react'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Routes } from './router'
import { Theme } from './theme'

describe('<Router />', () => {
  test('to Home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/home']}>
        <Routes />
      </MemoryRouter>
    )
    const textElement = getByText(/Wellcome to the jungle/i)
    expect(textElement).toBeInTheDocument()
  })

  test('to Login', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/login']}>
        <Theme>
          <Routes />
        </Theme>
      </MemoryRouter>
    )
    const textElement = getByText(/Login/g)
    expect(textElement).toBeInTheDocument()
  })

  test('default route', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/abc']}>
        <Routes />
      </MemoryRouter>
    )
    const textElement = getByText(/Wellcome to the jungle/i)
    expect(textElement).toBeInTheDocument()
  })
})
