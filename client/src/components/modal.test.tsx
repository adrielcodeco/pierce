import React from 'react'
import { render } from '@testing-library/react'
import { Modal } from './modal'
import { Theme } from 'src/core/theme'

describe('<Modal />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Modal />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})
