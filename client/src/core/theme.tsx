import React from 'react'
import { ThemeProvider, SheetsRegistry, JssProvider } from 'react-jss'
import jss from 'jss'
import preset from 'jss-preset-default'
import { fade } from 'src/libs/colors'

jss.setup(preset())

const white = '#ffffff'
const black = '#000000'
const hoverOpacity = 0.2

export const theme = {
  palette: {
    Primary: '#1976d2',
    Secondary: '#dc004e',
    Error: '#f44336',
    Warning: '#ff9800',
    Info: '#2196f3',
    Success: '#4caf50',
    white,
    black
  },
  media: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920
  },
  hoverOpacity,
  button: {
    backgroundColor: 'transparent',
    border: 0,
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
      backgroundColor: fade(black, 1 - hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      },
      '&$disabled': {
        backgroundColor: 'transparent'
      }
    }
  },
  linkButton: {
    boxSizing: 'border-box',
    minWidth: 64,
    padding: '6px 16px',
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: fade(black, 1 - hoverOpacity),
      '@media (hover: none)': {
        backgroundColor: 'transparent'
      }
    }
  },
  form: {
    width: '100%',
    padding: '3rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  formItemGroup: {
    width: '100%',
    display: 'flex'
  },
  formInput: {
    width: '100%',
    margin: '.5rem',
    height: '1.5rem'
  },
  formLabel: {
    margin: '.5rem',
    color: white,
    textIndent: '0px',
    textShadow: 'none',
    textAlign: 'right',
    font: '400 13.3333px Arial',
    fontSize: '0.875rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '2',
    letterSpacing: '.1rem',
    textTransform: 'uppercase',
    alignSelf: 'flex-end'
  },
  vcenter: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
}

const sheetsRegistry = new SheetsRegistry()

const globalStyleSheet = jss
  .createStyleSheet({
    '@global': {
      'html, body': {
        margin: 0,
        width: '100%',
        height: '100%'
      },
      '#root': {
        height: '100%'
      },
      body: {
        margin: 0,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale'
      },
      code: {
        fontFamily:
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace"
      },
      h1: {
        fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        fontSize: '6rem',
        lineHeight: 1.167,
        letterSpacing: '-0.01562em'
      },
      h2: {
        fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 300,
        fontSize: '3.75rem',
        lineHeight: 1.2,
        letterSpacing: '-0.00833em'
      },
      h3: {
        fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '3rem',
        lineHeight: 1.167,
        letterSpacing: '0em'
      },
      h4: {
        fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '2.125rem',
        lineHeight: 1.235,
        letterSpacing: '0.00735em'
      },
      h5: {
        fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        fontSize: '1.5rem',
        lineHeight: 1.334,
        letterSpacing: '0em'
      },
      h6: {
        fontFamily: 'Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.6,
        letterSpacing: '0.0075em'
      },
      button: {
        boxSizing: 'border-box',
        minWidth: 64,
        padding: '6px 16px',
        cursor: 'pointer'
      }
    }
  })
  .attach()

sheetsRegistry.add(globalStyleSheet)

export const Theme = ({ children }: { children: any }) => (
  <ThemeProvider theme={theme}>
    <JssProvider registry={sheetsRegistry}>{children}</JssProvider>
  </ThemeProvider>
)
