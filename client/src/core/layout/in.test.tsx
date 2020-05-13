import React from 'react'
import { render } from '@testing-library/react'
import { In } from './in'
import { Theme } from 'src/core/theme'

describe('<In />', () => {
  test('clean', () => {
    const { container } = render(
      <Theme>
        <In />
      </Theme>
    )
    expect(container).toMatchInlineSnapshot(`
    <div>
      <header
        class="header-0-2-1"
      >
        <div
          class="headerLogo-0-2-2"
        >
          <img
            alt="logo"
            class="appLogo-0-2-3"
            src="logo.svg"
          />
          <a
            class="linkButton-0-2-6"
            href="/"
          >
            <h1
              class="headerSiteName-0-2-4"
            >
              Items
            </h1>
          </a>
        </div>
        <button
          class="logoutButton-0-2-5"
        >
          Logout${' '}
          <svg
            aria-hidden="true"
            class="svg-inline--fa fa-sign-in-alt fa-w-16 "
            data-icon="sign-in-alt"
            data-prefix="fas"
            focusable="false"
            role="img"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
              fill="currentColor"
            />
          </svg>
        </button>
      </header>
      <div
        class="container-0-2-7"
      />
    </div>
    `)
  })
})
