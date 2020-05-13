import React from 'react'
import { layoutContext } from 'src/data/layoutContext'

export const ResetPwd = () => {
  layoutContext.cleanMode(true)
  return <></>
}
