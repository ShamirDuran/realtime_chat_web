import { PaletteOptions, alpha } from '@mui/material/styles'

const SUCCESS = {
  main: '#44b700',
}

const ERROR = {
  main: '#DF6675',
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F5F5F5',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#667781',
  600: '#637381',
  700: '#454F5B',
  800: '#111b21',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
}

const COMMON: PaletteOptions = {
  common: { black: '#000', white: '#fff' },
  // disabled color
  grey: GREY,
  divider: GREY[500_24],
  action: {
    active: '#8696a0',
    hover: GREY[500_24],
    focus: '#F5F6F6',
    selected: '#4783DD',
    disabled: GREY[600],
    disabledBackground: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
  success: SUCCESS,
  error: ERROR,
}

const palette: Record<string, PaletteOptions> = {
  light: {
    ...COMMON,
    text: { primary: GREY[800], secondary: GREY[500], disabled: GREY[700] },
    background: { paper: '#f1f1f1', default: '#fff' },
    action: { active: GREY[600], ...COMMON.action },
  },
  dark: {
    ...COMMON,
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[500_8] },
    background: { paper: GREY[800], default: GREY[900] },
    action: { active: GREY[500], ...COMMON.action },
  },
}

export default palette
