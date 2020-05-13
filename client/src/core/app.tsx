import React from 'react'
import { Theme } from './theme'
import { Layout } from 'src/core/layout'
import { Router } from 'src/core/router'

export const App = () => {
  return (
    <React.StrictMode>
      <Theme>
        <Layout>
          <Router />
        </Layout>
      </Theme>
    </React.StrictMode>
  )
}
