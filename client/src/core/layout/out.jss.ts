import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'
import { fade } from 'src/libs/colors'

export default createUseStyles<typeof theme>((theme) => ({
  header: {
    width: '100%',
    height: '4rem',
    display: 'flex',
    backgroundColor: theme.palette.Primary
  },
  headerClean: {
    backgroundColor: 'transparent !important',
    '& $headerSiteName': {
      color: theme.palette.Primary
    },
    '& $loginButton': {
      backgroundColor: theme.palette.Primary,
      '&:hover': {
        backgroundColor: fade(theme.palette.Primary, 1 - theme.hoverOpacity)
      }
    }
  },
  headerLogo: {
    display: 'flex'
  },
  appLogo: {
    width: '5rem',
    // height: '40vmin',
    pointerEvents: 'none',
    [`@media (max-width:${theme.media['sm']}px)`]: {
      display: 'none'
    }
  },
  '@media (prefers-reduced-motion: no-preference)': {
    appLogo: {
      animation: 'App-logo-spin infinite 20s linear'
    },
    '@global': {
      '@keyframes App-logo-spin': {
        from: {
          transform: 'rotate(0deg)'
        },
        to: {
          transform: 'rotate(360deg)'
        }
      }
    }
  },
  headerSiteName: {
    // fontWeight: 'bold',
    textTransform: 'uppercase',
    // fontFamily: 'monospace',
    color: 'white',
    padding: '.6rem',
    fontSize: '1.5rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '0',
    letterSpacing: '.2rem',
    [`@media (max-width:${theme.media['sm']}px)`]: {
      fontSize: '1rem'
    }
  },
  loginButton: {
    ...theme.linkButton,
    backgroundColor: 'transparent',
    border: 0,
    marginRight: '1rem',
    color: 'white',
    textIndent: '0px',
    textShadow: 'none',
    textAlign: 'center',
    font: '400 13.3333px Arial',
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '2',
    letterSpacing: '.1rem',
    textTransform: 'uppercase',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.black, theme.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  containerHeader: {
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  container: {
    display: 'flex !important',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 'calc(100% - 4rem) !important'
  },
  linkButton: {
    ...theme.linkButton,
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(theme.palette.black, theme.hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  }
}))
