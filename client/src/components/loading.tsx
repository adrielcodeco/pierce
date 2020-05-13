import React from 'react'
import styles from './loading.jss'

export const Loading = () => {
  const classes = styles()
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <span>loading...</span>
        <div className={classes.progress} />
      </div>
    </div>
  )
}
