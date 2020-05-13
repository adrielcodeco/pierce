import React from 'react'
import { observer } from 'mobx-react'
import { authContext } from 'src/data/authContext'
import { In } from './in'
import { Out } from './out'

export const Layout = observer(({ children }: { children: any }) => {
  const authenticated = authContext.authirized
  return authenticated ? <In>{children} </In> : <Out>{children}</Out>
})
