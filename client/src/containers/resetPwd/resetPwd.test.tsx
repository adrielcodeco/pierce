import React from 'react'
import { render } from '@testing-library/react'
import { ResetPwd } from './'
import { Theme } from 'src/core/theme'

describe('<ResetPwd />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <ResetPwd />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`<div />`)
  })
})
