import { IconButton, IconButtonProps, Tooltip } from '@mui/material'
import { useResponsive } from '../../hooks'

interface Props extends IconButtonProps {
  tooltipTitle?: string
  disableBackground?: boolean
  disableTouchRipple?: boolean
}

export const TooltipIconbutton = ({
  tooltipTitle = '',
  disableBackground = false,
  disableTouchRipple = true,
  ...rest
}: Props) => {
  const isMobile = useResponsive({ query: 'down', key: 'sm' })

  return (
    <Tooltip title={!isMobile ? tooltipTitle : ''} arrow>
      <IconButton
        disableRipple={disableTouchRipple}
        disableTouchRipple={disableTouchRipple}
        sx={{
          '&.MuiIconButton-root': {
            backgroundColor: disableBackground
              ? 'inherit'
              : (theme) => theme.palette.grey[200],
            '&:hover': {
              backgroundColor: disableBackground
                ? 'inherit'
                : (theme) => theme.palette.action.hover,
            },
          },
        }}
        size='large'
        {...rest}
      />
    </Tooltip>
  )
}
