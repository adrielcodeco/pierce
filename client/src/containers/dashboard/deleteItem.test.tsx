import React from 'react'
import { render } from '@testing-library/react'
import { RemoveItem } from './deleteIItems'
import { Theme } from 'src/core/theme'

describe('<RemoveItem />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <RemoveItem />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})
