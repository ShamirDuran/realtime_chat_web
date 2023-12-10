import { styled } from '@mui/material/styles'
import { BadgeProps, Badge } from '@mui/material'

interface StyledBadgeProps extends BadgeProps {
  bgcolor?: string
  size?: number
  useRipple?: boolean
  useShadow?: boolean
}

const StyledBadgeWrapper = styled(
  ({ useRipple, useShadow, ...rest }: StyledBadgeProps) => <Badge {...rest} />,
)<StyledBadgeProps>(({ theme, bgcolor, size, useRipple, useShadow }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: bgcolor ?? theme.palette.success.main,
    color: bgcolor ?? theme.palette.success.main,
    boxShadow: useShadow ? `0 0 0 2px ${theme.palette.background.paper}` : 'none',
    width: size,
    height: size,
    borderRadius: '50%',
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: useRipple ? 'ripple 1.2s infinite ease-in-out' : 'none',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))

export const BadgeWrapper = ({
  vertical = 'top',
  horizontal = 'right',
  bgcolor,
  size = 8,
  children,
  ripple = false,
  shadow = true,
  ...rest
}: StyledBadgeProps & {
  vertical?: 'top' | 'bottom'
  horizontal?: 'left' | 'right'
  children: JSX.Element
  ripple?: boolean
  bgcolor?: string
  size?: number
  shadow?: boolean
}) => {
  return (
    <StyledBadgeWrapper
      anchorOrigin={{
        vertical,
        horizontal,
      }}
      overlap='circular'
      variant='dot'
      bgcolor={bgcolor}
      size={size}
      useRipple={ripple}
      useShadow={shadow}
      {...rest}
    >
      {children}
    </StyledBadgeWrapper>
  )
}
