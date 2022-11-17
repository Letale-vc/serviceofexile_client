import { createTheme } from '@mui/material'

export const themes = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#80d8ff'
    },
    background: { paper: 'rgb(30, 33, 36)' }
  },
  shape: { borderRadius: 0 },
  components: {
    MuiFilledInput: {
      styleOverrides: { hiddenLabel: true },
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiFormControl: {
      defaultProps: {
        size: 'small',
        margin: 'dense'
      }
    },
    MuiFormHelperText: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiIconButton: {
      defaultProps: {
        size: 'small'
      },
      styleOverrides: {
        sizeSmall: {
          marginLeft: 4,
          marginRight: 4,
          padding: 12
        }
      }
    },
    MuiInputBase: {
      defaultProps: {
        margin: 'dense'
      }
    },
    // MuiInputLabel: {
    //   defaultProps: {
    //     margin: 'dense'
    //   }
    // },
    MuiListItem: {
      defaultProps: {
        dense: true
      }
    },
    MuiOutlinedInput: {
      defaultProps: {
        margin: 'dense'
      }
    },
    MuiFab: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiTable: {
      defaultProps: {
        size: 'small'
      }
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          '& .MuiPaper-root': {
            background: 'rgb(30, 33, 36)'
          }
        }
      }
    },
    MuiButton: { defaultProps: { size: 'small' } },
    MuiButtonBase: {},
    MuiTextField: {
      styleOverrides: { root: { background: 'rgb(30, 33, 36)' } },
      defaultProps: {
        margin: 'dense',
        size: 'small',
        autoComplete: 'off',
        SelectProps: {
          MenuProps: {}
        }
      }
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          '&.MuiPaper-root': {
            backgroundColor: `rgba(0, 0, 0, 0.8)`
          }
        }
      }
    },
    MuiToolbar: {
      defaultProps: {
        variant: 'dense'
      },
      styleOverrides: {
        root: {
          '&.MuiToolbar-root': { minHeight: '45px' }
        }
      }
    },
    MuiModal: {
      defaultProps: {
        disableScrollLock: true
      }
    },

    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: `url('https://web.poecdn.com/image/layout/expedition-bg.jpg?1629004850417') #000 no-repeat top center fixed`,
          backgroundSize: 'contain'
        },
        '*': {
          '&::-webkit-scrollbar': {
            backgroundColor: 'rgb(43, 43, 43)'
          },
          '&::-webkit-scrollbar-corner': {
            backgroundColor: 'rgb(43, 43, 43)'
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '8px',
            backgroundColor: 'rgb(107, 107, 107)',
            minHeight: '24px',
            border: '3px solid rgb(43, 43, 43)'
          }
        }
      }
    }
  },

  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol'
    ].join(',')
  }
})
