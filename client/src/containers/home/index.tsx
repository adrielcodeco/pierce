import React from 'react'
import styles from './home.jss'
import { layoutContext } from 'src/data/layoutContext'

export const Home = () => {
  layoutContext.cleanMode(false)
  const classes = styles()
  return (
    <>
      <h2 className={classes.wellcome}>Wellcome to the jungle</h2>
    </>
  )
}
