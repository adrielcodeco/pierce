import React from 'react'
import { render } from '@testing-library/react'
import { Messages } from './messages'
import { Theme } from 'src/core/theme'

describe('<Messages />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Messages />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})
