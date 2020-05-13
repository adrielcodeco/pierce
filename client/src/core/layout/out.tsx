import React from 'react'
import styles from './out.jss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { Container } from 'src/components/container'
import logo from './logo.svg'
import { observer } from 'mobx-react'
import { layoutContext } from 'src/data/layoutContext'

const Header = observer(() => {
  const classes = styles()
  const clean = layoutContext.clean
  return (
    <header
      className={[classes.header, clean ? classes.headerClean : ''].join(' ')}
    >
      <Container className={classes.containerHeader}>
        <div className={classes.headerLogo}>
          <img src={logo} className={classes.appLogo} alt='logo' />
          <a href='/' className={classes.linkButton}>
            <h1 className={classes.headerSiteName}>Items</h1>
          </a>
        </div>
        {!/^\/login/.test(window.location.pathname) ? (
          <a className={classes.loginButton} href='/login'>
            Login <FontAwesomeIcon icon={faSignInAlt} />
          </a>
        ) : null}
      </Container>
    </header>
  )
})

export const Out = ({ children }: any) => {
  const classes = styles()
  return (
    <>
      <Header />
      <Container className={classes.container}>{children}</Container>
    </>
  )
}
