import { createUseStyles } from 'react-jss'
import { theme } from 'src/core/theme'

export default createUseStyles<typeof theme>((theme) => ({
  close: {
    color: theme.palette.white,
    fontSize: '2rem',
    alignSelf: 'flex-end',
    cursor: 'pointer'
  },
  // box: {
  //   backgroundColor: theme.palette.Primary,
  //   padding: '2rem',
  //   display: 'flex',
  //   justifyContent: 'center',
  //   flexDirection: 'column',
  //   alignItems: 'center'
  // },
  header: {
    color: theme.palette.white
  },
  vcenter: theme.vcenter,
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
  form: {
    ...theme.form
  },
  title: {
    color: theme.palette.white,
    textIndent: '0px',
    textShadow: 'none',
    textTransform: 'uppercase',
    letterSpacing: '.1rem !important'
  },
  formItemGroup: {
    ...theme.formItemGroup,
    [`@media (max-width:${theme.media['sm']}px)`]: {
      flexDirection: 'column'
    }
  },
  formItemGroupCheckbox: {
    ...theme.formItemGroup,
    justifyContent: 'center'
  },
  formItemGroupButton: {
    ...theme.formItemGroup,
    justifyContent: 'center'
  },
  formInput: {
    ...theme.formInput,
    [`@media (max-width:${theme.media['sm']}px)`]: {
      margin: '.5rem 0'
    }
  },
  formLabel: {
    ...theme.formLabel,
    width: '10rem',
    [`@media (max-width:${theme.media['sm']}px)`]: {
      alignSelf: 'flex-start',
      textAlign: 'left'
    }
  },
  formCheckboxLabel: theme.formLabel,
  checkbox: {
    alignSelf: 'center'
  },
  submitButton: {
    height: '2rem',
    margin: '1rem'
  },
  errorMessage: {
    color: theme.palette.white,
    backgroundColor: theme.palette.Error,
    // width: 'calc(100% - 9rem)',
    alignSelf: 'flex-end',
    margin: '0 .5rem 0 0',
    padding: '.1rem .2rem',
    [`@media (max-width:${theme.media['sm']}px)`]: {
      margin: '0'
    }
  },
  loading: {
    backgroundColor: theme.palette.white,
    padding: '1rem',
    margin: '1rem'
  },
  updateDetais: {
    color: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
