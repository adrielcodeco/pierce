import React from 'react'
import { render } from '@testing-library/react'
import { AddNewItem } from './addNewItem'
import { Theme } from 'src/core/theme'

describe('<AddNewItem />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <AddNewItem />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})
