import React from 'react'
import { render } from '@testing-library/react'
import { Dashboard } from './'
import { Theme } from 'src/core/theme'

describe('<Dashboard />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Dashboard />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`
    <div>
      <h4>
        Items
      </h4>
      <div
        class="selectAll-0-2-5"
      >
        <label>
          <input
            type="checkbox"
          />
          <span>
            Select All
          </span>
        </label>
      </div>
      <div
        class="root-0-2-10"
      >
        <div>
          <span>
            loading...
          </span>
          <div
            class="progress-0-2-11"
          />
        </div>
      </div>
      <div
        class="buttons-0-2-6"
      >
        <button
          class="btnAdd-0-2-7"
        >
          Add new item
        </button>
        <button
          class="btnRemove-0-2-8"
          disabled=""
        >
          Delete selected items
        </button>
      </div>
    </div>
    `)
  })
})
