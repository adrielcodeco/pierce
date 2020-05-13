import React from 'react'
import styles from './container.jss'

export const Container = ({ children, className, ...props }: any) => {
  const classes = styles()
  return (
    <div className={[classes.root, className].join(' ')} {...props}>
      {children}
    </div>
  )
}
