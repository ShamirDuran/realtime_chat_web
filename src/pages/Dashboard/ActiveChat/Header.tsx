import { faker } from '@faker-js/faker'
import AddIcCallIcon from '@mui/icons-material/AddIcCall'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchIcon from '@mui/icons-material/Search'
import { Box, Stack } from '@mui/material'
import {
  CircleAvatar,
  StyledToolbar,
  TooltipIconbutton,
  TruncatedText,
} from '../../../components'
import { useAppSelector, useMenu, useStyles } from '../../../hooks'
import { ChatMenu } from './Menus/ChatMenu'
import { selectUiState } from '../../../redux/slices/ui.slice'
import { upperCammelCase } from '../../../utils'

export const Header = () => {
  const styles = useStyles()
  const { activeUserChat } = useAppSelector(selectUiState)
  const [menuRef, isMenuOpen, handleOpenMenu, handleCloseMenu] = useMenu()

  return (
    <StyledToolbar>
      <Stack p={0} direction='row' flex={1}>
        <CircleAvatar src={activeUserChat?.avatar ?? ''} />

        {/* User info */}
        <Stack
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => console.log('Config modal')}
          justifyContent='center'
          ml={2}
        >
          <TruncatedText
            fontWeight={styles.fonts.title.weight}
            textOverflow='ellipsis'
            text={upperCammelCase(activeUserChat?.fullName ?? '')}
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

        <Stack direction='row' spacing={1.2}>
          <TooltipIconbutton size='large' tooltipTitle='Search'>
            <SearchIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>

          <TooltipIconbutton size='large' tooltipTitle='Call'>
            <AddIcCallIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>

          <TooltipIconbutton size='large' tooltipTitle='Menu' onClick={handleOpenMenu}>
            <MoreVertIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>
        </Stack>
      </Stack>

      <ChatMenu menuRef={menuRef} isOpen={isMenuOpen} handleClose={handleCloseMenu} />
    </StyledToolbar>
  )
}
