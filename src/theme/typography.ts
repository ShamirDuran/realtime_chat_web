import { TypographyOptions } from '@mui/material/styles/createTypography'
import { pxToRem } from '../utils'

const FONT_PRIMARY = 'Manrope, Public Sans, sans-serif'

const typography: TypographyOptions = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  body1: {
    fontSize: '1rem',
  },
  body2: {
    fontSize: '0.9rem',
    fontWeight: 400,
  },
}

export default typography