import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'

export default createUseStyles<typeof theme>((theme) => ({
  errorMessage: {
    color: theme.palette.white,
    backgroundColor: theme.palette.Error,
    padding: '1rem'
  },
  close: {
    margin: '0 0 0 .8rem',
    cursor: 'pointer'
  }
}))
