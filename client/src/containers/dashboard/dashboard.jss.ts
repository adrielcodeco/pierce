import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'
import { fade } from 'src/libs/colors'
// import { fade } from 'src/libs/colors'

export default createUseStyles<typeof theme>((theme) => ({
  table: {
    display: 'table',
    width: '100%',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    margin: '1rem'
  },
  tbody: {
    display: 'table-row-group'
  },
  tr: {
    color: 'inherit',
    display: 'table-row',
    verticalAlign: 'middle',
    border: `1px solid ${theme.palette.Info}`,
    outline: 0,
    '&:hover': {
      color: theme.palette.white,
      backgroundColor: fade(theme.palette.Primary, 1 - theme.hoverOpacity)
    },
    [`@media (max-width:${theme.media['sm']}px)`]: {
      display: 'flex',
      flexDirection: 'column'
    }
  },
  td: {
    display: 'table-cell',
    verticalAlign: 'inherit',
    textAlign: 'left',
    padding: 16
  },
  selectAll: {
    margin: '2rem'
  },
  buttons: {
    padding: '1rem'
  },
  btnAdd: {
    margin: '.5rem'
  },
  btnRemove: {
    margin: '.5rem'
  },
  actions: {
    fontSize: '1.5rem',
    cursor: 'pointer',
    marginLeft: '1.5rem'
  }
}))
