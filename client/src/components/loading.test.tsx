import React from 'react'
import { render } from '@testing-library/react'
import { Loading } from './loading'
import { Theme } from 'src/core/theme'

describe('<Loading />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Loading />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="root-0-2-1"
      >
        <div>
          <span>
            loading...
          </span>
          <div
            class="progress-0-2-2"
          />
        </div>
      </div>
    </div>
  `)
  })
})
