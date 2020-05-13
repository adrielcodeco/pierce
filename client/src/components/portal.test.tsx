import React from 'react'
import { render } from '@testing-library/react'
import { Portal } from './portal'
import { Theme } from 'src/core/theme'

describe('<Portal />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Portal />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})
