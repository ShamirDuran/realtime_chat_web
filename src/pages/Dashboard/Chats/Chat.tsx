import { faker } from '@faker-js/faker'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { CircleAvatar, CircleContainer, TruncatedText } from '../../../components'
import { useConstants } from '../../../hooks'
import moment from 'moment'

interface Props {
  isActive?: boolean
}

export const Chat = ({ isActive = false }: Props) => {
  const constants = useConstants()
  const theme = useTheme()
  const unreadMessageCount = faker.number.int({ min: 0, max: 2 })

  return (
    <Box
      sx={{
        flex: 1,
        mx: constants.margin.root.horizontal / 2,
        px: constants.margin.root.horizontal / 2,
        py: constants.margin.root.vertical / 2,
        borderRadius: 3,
        bgcolor: isActive ? theme.palette.action.selected : 'transparent',
        color: isActive ? 'white' : 'inherit',
        transitionDuration: '0.125s',
        userSelect: 'none',
        '&:hover': {
          bgcolor: isActive ? theme.palette.action.selected : theme.palette.action.focus,
          cursor: 'pointer',
        },
      }}
    >
      <Stack direction='row' alignItems='center'>
        <CircleAvatar src={faker.image.avatarLegacy()} size={53} />

        <Stack ml={2} flex={1}>
          <Stack
            direction='row'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            flex={1}
          >
            <TruncatedText
              fontWeight='bold'
              variant='subtitle1'
              text={faker.person.fullName()}
            />
            <Typography
              variant='caption'
              fontSize={12}
              color={isActive ? 'white' : 'inherit'}
            >
              {moment(faker.date.anytime()).format('hh:ss')}
            </Typography>
          </Stack>

          <Stack direction='row' display='flex' justifyContent='space-between' flex={1}>
            <TruncatedText
              component='p'
              variant='body2'
              color='text.secondary'
              text={faker.lorem.sentence() + faker.lorem.sentence()}
              mr={2}
            />
            {unreadMessageCount > 0 && (
              <CircleContainer
                size={20}
                bgcolor={theme.palette.error.main}
                color={theme.palette.error.contrastText}
              >
                <small>{unreadMessageCount}</small>
              </CircleContainer>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
