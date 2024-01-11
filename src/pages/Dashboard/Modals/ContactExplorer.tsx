import SendIcon from '@mui/icons-material/Send'
import {
  Box,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { User } from '../../../api/models'
import { UserService } from '../../../api/services'
import { CircleAvatar, SearchBar, StyledModal } from '../../../components'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectUiState, toggleContactExplorerModal } from '../../../redux/slices/ui.slice'
import { upperCammelCase } from '../../../utils'
import { debounce } from 'lodash'
import { socket } from '../../../socket'
import { selectAuthState } from '../../../redux/slices/auth.slice'

interface ContactListProps {
  contacts: User[]
}

const ContactList = ({ contacts }: ContactListProps) => {
  const dispatch = useAppDispatch()
  const authState = useAppSelector(selectAuthState)

  const handleSendMessage = (user: User) => {
    socket.emit('start_chat', { to: user.uid, from: authState.user.uid })
    dispatch(toggleContactExplorerModal())
  }

  if (contacts.length === 0) {
    return (
      <Stack
        height={50}
        justifyContent='center'
        alignItems='center'
        overflow='hidden'
        mt={2}
      >
        <Typography variant='body2' color='text.secondary'>
          No contacts found
        </Typography>
      </Stack>
    )
  }
  return (
    <Box mt={1.5} overflow='auto' maxHeight='320px' borderRadius={1}>
      <List sx={{ bgcolor: 'white', borderRadius: 1, p: 0 }}>
        {contacts.map((user, index) => (
          <ListItem
            key={index}
            divider
            secondaryAction={
              <IconButton
                size='medium'
                edge='end'
                onClick={() => handleSendMessage(user)}
                disableTouchRipple
              >
                <SendIcon fontSize='medium' />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <CircleAvatar src={user.avatar ?? ''} />
            </ListItemAvatar>

            <ListItemText>
              <Typography variant='body2'>{upperCammelCase(user.fullName)}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export const ContactExplorerModal = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [contacts, setContacts] = useState<User[]>([])
  const { openContactExplorerModal: open } = useAppSelector(selectUiState)
  const dispatch = useAppDispatch()

  const handleClose = () => dispatch(toggleContactExplorerModal())

  const handleFetchContacts = async (name?: string) => {
    setIsLoading(true)

    UserService.getAll(name)
      .then((res) => setContacts(res.users))
      .catch((err) => toast.error(`Cannot fetch contacts`))
      .finally(() => setIsLoading(false))
  }

  const debouncedSearch = useRef(
    debounce(async (criteria) => {
      handleFetchContacts(criteria)
    }, 300),
  ).current

  // debounce cleanup
  useEffect(() => {
    return () => debouncedSearch.cancel()
  }, [debouncedSearch])

  // component cleanup
  useEffect(() => {
    return () => {
      setContacts([])
      setIsLoading(true)
    }
  }, [open])

  return (
    <StyledModal
      open={open}
      id='contact-explorer-modal'
      title='Explorer'
      handleClose={handleClose}
      maxWidth='xs'
      fullWidth={true}
    >
      <SearchBar handleSearch={debouncedSearch} bgcolor='white' />

      {isLoading ? (
        <Stack
          height={50}
          justifyContent='center'
          alignItems='center'
          overflow='hidden'
          mt={2}
        >
          <CircularProgress size={35} />
        </Stack>
      ) : (
        <ContactList contacts={contacts} />
      )}
    </StyledModal>
  )
}
