import { Components, Theme } from '@mui/material'

const components: Components<Omit<Theme, 'components'>> = {
  // add 5px to top
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
}

export default components
