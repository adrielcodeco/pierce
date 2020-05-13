import React from 'react'
import { render } from '@testing-library/react'
import { Signup } from './'
import { Theme } from 'src/core/theme'

describe('<Signup />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Signup />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})
