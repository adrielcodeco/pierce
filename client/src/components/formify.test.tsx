import React from 'react'
import { render } from '@testing-library/react'
import { Formify } from './formify'
import { Theme } from 'src/core/theme'

describe('<Formify />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Formify />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`
    <div>
      <form />
    </div>
  `)
  })
})
