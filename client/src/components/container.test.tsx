import React from 'react'
import { render } from '@testing-library/react'
import { Container } from './container'
import { Theme } from 'src/core/theme'

describe('<Container />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Container />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="root-0-2-1 "
      />
    </div>
  `)
  })
})
