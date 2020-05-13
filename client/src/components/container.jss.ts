import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'

export default createUseStyles<typeof theme>((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    boxSizing: 'border-box',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    display: 'block',
    [`@media (min-width:${theme.media['xs']}px)`]: {
      // maxWidth: theme.media['xs']
    },
    [`@media (min-width:${theme.media['sm']}px)`]: {
      maxWidth: theme.media['sm']
    },
    [`@media (min-width:${theme.media['md']}px)`]: {
      maxWidth: theme.media['md']
    },
    [`@media (min-width:${theme.media['lg']}px)`]: {
      maxWidth: theme.media['lg']
    },
    [`@media (min-width:${theme.media['xl']}px)`]: {
      maxWidth: theme.media['xl']
    }
  }
}))
