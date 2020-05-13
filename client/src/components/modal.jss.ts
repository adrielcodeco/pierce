import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'
import { fade } from 'src/libs/colors'

export default createUseStyles<typeof theme>((theme) => ({
  background: {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.black, theme.hoverOpacity)
  }
}))
