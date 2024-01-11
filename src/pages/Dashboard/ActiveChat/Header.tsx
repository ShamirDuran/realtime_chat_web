import AddIcCallIcon from '@mui/icons-material/AddIcCall'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Stack } from '@mui/material'
import {
  CircleAvatar,
  StyledToolbar,
  TooltipIconbutton,
  TruncatedText,
} from '../../../components'
import {
  useAppDispatch,
  useAppSelector,
  useMenu,
  useResponsive,
  useStyles,
} from '../../../hooks'
import { upperCammelCase } from '../../../utils'
import { ChatMenu } from './Menus/ChatMenu'
import { selectActiveChatUser, setActiveChat } from '../../../redux/slices/chat.slice'

export const Header = () => {
  const styles = useStyles()
  const [menuRef, isMenuOpen, handleOpenMenu, handleCloseMenu] = useMenu()
  const isMobile = useResponsive({ query: 'down', key: 'sm' })
  const isTabled = useResponsive({ query: 'down', key: 'lg' })
  const user = useAppSelector(selectActiveChatUser)
  const dispatch = useAppDispatch()

  const handleCloseActiveChat = () => {
    dispatch(setActiveChat({ chat: null }))
  }

  return (
    <StyledToolbar>
      <Stack p={0} direction='row' flex={1} alignItems='center'>
        {isMobile && (
          <TooltipIconbutton
            disableBackground
            tooltipTitle='Return'
            onClick={handleCloseActiveChat}
          >
            <ArrowBackIcon fontSize='small' color='inherit' />
          </TooltipIconbutton>
        )}

        <CircleAvatar src={user?.avatar ?? ''} />

        {/* User info */}
        <Stack
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => console.log('Config modal')}
          justifyContent='center'
          ml={isMobile ? 1.5 : 2}
        >
          <TruncatedText
            fontWeight={styles.fonts.title.weight}
            textOverflow='ellipsis'
            text={upperCammelCase(user?.fullName ?? '')}
          />
          <TruncatedText
            component='p'
            color='text.secondary'
            fontSize={styles.fonts.subtitle.fontSize}
            variant='body2'
            letterSpacing={0.4}
            text='Last seen Yesterday 02:30 PM'
          />
        </Stack>

        <Box flex={1} />

        <Stack
          direction='row'
          alignItems='center'
          spacing={{
            xs: 0.5,
            sm: 1,
            md: 1.2,
          }}
        >
          {!isMobile && !isTabled && (
            <TooltipIconbutton tooltipTitle='Search'>
              <SearchIcon fontSize='small' color='inherit' />
            </TooltipIconbutton>
          )}

          <TooltipIconbutton tooltipTitle='Call'>
            <AddIcCallIcon fontSize='small' color='inherit' />
          </TooltipIconbutton>

          <TooltipIconbutton tooltipTitle='Menu' onClick={handleOpenMenu}>
            <MoreVertIcon fontSize='small' color='inherit' />
          </TooltipIconbutton>
        </Stack>
      </Stack>

      <ChatMenu menuRef={menuRef} isOpen={isMenuOpen} handleClose={handleCloseMenu} />
    </StyledToolbar>
  )
}
