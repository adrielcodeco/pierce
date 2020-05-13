import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'

export default createUseStyles<typeof theme>((theme) => ({
  header: {
    color: theme.palette.white
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minWidth: '15rem',
    maxWidth: '30rem',
    alignSelf: 'center',
    padding: '2rem',
    backgroundColor: theme.palette.Primary,
    [`@media (max-width:${theme.media['sm']}px)`]: {
      width: 'auto'
    }
  },
  itemsLabel: {
    color: theme.palette.white,
    alignSelf: 'self-start',
    margin: '.2rem'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%'
  },
  btnOk: {
    margin: '.2rem'
  },
  btnCancel: {
    margin: '.2rem'
  }
}))
