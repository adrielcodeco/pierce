import React from 'react'
import { render } from '@testing-library/react'
import { Home } from './'
import { Theme } from 'src/core/theme'

describe('<Home />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Home />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`
    <div>
      <h2
        class="wellcome-0-2-1"
      >
        Wellcome to the jungle
      </h2>
    </div>
    `)
  })
})
