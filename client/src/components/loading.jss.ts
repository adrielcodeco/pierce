import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'

export default createUseStyles<typeof theme>((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  progress: {
    width: '10rem',
    height: '.2rem',
    backgroundColor: theme.palette.Primary,
    animation: 'progress infinite 3s linear',
    position: 'relative'
  },
  '@global': {
    '@keyframes progress': {
      '0%': {
        width: '0rem',
        left: '0rem'
      },
      '20%': {
        width: '2.5rem',
        left: '0rem'
      },
      '40%': {
        width: '2.5rem',
        left: '2.5rem'
      },
      '60%': {
        width: '2.5rem',
        left: '5rem'
      },
      '80%': {
        width: '2.5rem',
        left: '7.5rem'
      },
      '100%': {
        width: '0rem',
        left: '10rem'
      }
    }
  }
}))
