import { Stack, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Chat as ChatModel } from '../../../api/models'
import { SearchBar } from '../../../components'
import {
  useAppDispatch,
  useAppSelector,
  useDebouncer,
  useResponsive,
  useStyles,
} from '../../../hooks'
import { selectAuthState } from '../../../redux/slices/auth.slice'
import { setDirectChats } from '../../../redux/slices/chat.slice'
import { socket } from '../../../socket'
import { Header } from './Header'
import { setIsLoadingChats, setSearchValue } from '../../../redux/slices/ui.slice'
import { RegularList } from './RegularList'
import { FilteredList } from './FilteredList'

export const Chats = () => {
  const theme = useTheme()
  const styles = useStyles()
  const isMobile = useResponsive({ query: 'down', key: 'sm' })
  const authState = useAppSelector(selectAuthState)
  const [isFilteringChats, setIsFilteringChats] = useState(false)
  const dispatch = useAppDispatch()

  const handleSearch = (searchTerm: string) => {
    setIsFilteringChats(searchTerm !== '')
    dispatch(setIsLoadingChats({ isLoading: true }))
    dispatch(setSearchValue(searchTerm))
  }

  const debouncedSearch = useDebouncer(handleSearch)

  useEffect(() => {
    if (!socket) return

    socket.emit('get_direct_chats', { uid: authState.user.uid }, (data: ChatModel[]) => {
      dispatch(setDirectChats({ chats: data }))
    })
  }, [socket])

  return (
    <Stack
      sx={{
        borderRight: !isMobile ? 1 : 0,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
        minWidth: !isMobile ? styles.dimensions.profileDrawer.width : '100vw',
        maxWidth: styles.dimensions.profileDrawer.width,
      }}
    >
      {/* Toolbar */}
      <Header />

      <SearchBar
        mx={styles.margin.root.horizontal}
        my={isMobile ? 1.5 : 2.3}
        handleSearch={debouncedSearch}
      />

      {/* Chats */}
      {isFilteringChats ? <FilteredList /> : <RegularList />}
    </Stack>
  )
}
