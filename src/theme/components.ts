import { Components, Theme } from '@mui/material'

const components: Components<Omit<Theme, 'components'>> = {
  MuiMenu: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: theme.palette.background.default,
        marginTop: 5,
      }),
    },
  },
  MuiMenuItem: {
    defaultProps: {
      disableRipple: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        minWidth: 150,
        fontSize: theme.typography.body2.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        backgroundColor: theme.palette.background.default,
      }),
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: ({ theme }) => ({
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.primary.main,
        },
      }),
    },
  },
  MuiToolbar: {
    styleOverrides: {
      regular: {
        '@media (min-width: 600px)': {
          minHeight: 64,
        },
      },
    },
  },
}

export default components
