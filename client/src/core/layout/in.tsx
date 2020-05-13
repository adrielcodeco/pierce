import React from 'react'
import styles from './in.jss'
import logo from './logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { redirectToLogin } from 'src/services/redirect'

const logout = () => {
  localStorage.removeItem('authAToken')
  redirectToLogin()
}

export const In = ({ children }: any) => {
  const classes = styles()
  return (
    <>
      <header className={classes.header}>
        <div className={classes.headerLogo}>
          <img src={logo} className={classes.appLogo} alt='logo' />
          <a href='/' className={classes.linkButton}>
            <h1 className={classes.headerSiteName}>Items</h1>
          </a>
        </div>
        <button className={classes.logoutButton} onClick={logout}>
          Logout <FontAwesomeIcon icon={faSignInAlt} />
        </button>
      </header>
      <div className={classes.container}>{children}</div>
    </>
  )
}
