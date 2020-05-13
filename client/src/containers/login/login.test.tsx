import React from 'react'
import { render } from '@testing-library/react'
import { Login } from './'
import { Theme } from 'src/core/theme'

describe('<Login />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <Login />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`
    <div>
      <div
        class="vcenter-0-2-1"
      >
        <div
          class="box-0-2-2"
        >
          <h4
            class="title-0-2-4"
          >
            Login
          </h4>
          <form
            class="form-0-2-3"
            id="siginForm"
          >
            <div
              class="formItemGroup-0-2-5"
            >
              <label
                class="formLabel-0-2-9"
              >
                Email:
              </label>
              <input
                class="formInput-0-2-8"
                type="text"
                value=""
              />
            </div>
            <div
              class="formItemGroup-0-2-5"
            >
              <label
                class="formLabel-0-2-9"
              >
                Password:
              </label>
              <input
                class="formInput-0-2-8"
                type="password"
                value=""
              />
            </div>
            <label
              class="formItemGroupCheckbox-0-2-6"
            >
              <input
                class="checkbox-0-2-11"
                id="rememberme"
                name="rememberme"
                type="checkbox"
              />
              <span
                class="formCheckboxLabel-0-2-10"
              >
                Remember me
              </span>
            </label>
            <div>
              <button
                class="loginButton-0-2-12"
                type="submit"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    `)
  })
})
