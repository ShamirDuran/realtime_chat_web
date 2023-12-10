import { useMemo } from 'react'
import { CssBaseline, createTheme } from '@mui/material'
import {
  ThemeProvider as MUIThemeProvider,
  StyledEngineProvider,
  ThemeOptions,
} from '@mui/material/styles'
import palette from './palette'
import typography from './typography'

interface Props {
  children: React.ReactNode
}

const ThemeProvider = ({ children }: Props) => {
  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: { ...palette.light, mode: 'light' },
      typography: typography,
    }),
    [],
  )
  const theme = createTheme(themeOptions)

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  )
}

export default ThemeProvider
