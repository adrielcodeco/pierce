import React from 'react'
import { Portal } from './portal'
import styles from './modal.jss'

export const Modal = ({ open, children, onClose }: any) => {
  const classes = styles()
  const ref = React.useRef(null)
  return open ? (
    <Portal>
      <div className={classes.background} ref={ref}>
        <div>{children}</div>
      </div>
    </Portal>
  ) : null
}
