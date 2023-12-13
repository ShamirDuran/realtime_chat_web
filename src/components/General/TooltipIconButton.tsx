import { IconButton, Tooltip } from '@mui/material'
import { styled } from '@mui/material/styles'

interface WithTooltipProps {
  tooltipTitle?: string
  [x: string]: any
}

const withTooltip = (Component: React.ComponentType) => {
  return styled(({ tooltipTitle = '', ...props }: WithTooltipProps) => (
    <Tooltip title={tooltipTitle} arrow>
      <Component {...props} />
    </Tooltip>
  ))(({ theme }) => ({
    '&.MuiIconButton-root': {
      backgroundColor: theme.palette.grey[200],
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))
}

export const TooltipIconbutton = withTooltip(styled(IconButton)``)
