import { Outlet, useNavigate } from 'react-router-dom'
import { UserService } from '../../api/services'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { JWTDecoded } from '../../interfaces'
import { login, logout, selectAuthState } from '../../redux/slices/auth.slice'
import { selectIsLoading, setIsLoading } from '../../redux/slices/ui.slice'
import { verifyToken } from '../../utils'
import { LoadingPage } from '../../pages'
import { toast } from 'sonner'
import { Stack } from '@mui/material'
import { connectSocket, socket } from '../../socket'
import { useEffect } from 'react'
import { addMessage, setActiveChat } from '../../redux/slices/chat.slice'

export const DashboardLayout = () => {
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectIsLoading)
  const authState = useAppSelector(selectAuthState)
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()

  const validateAuth = () => {
    dispatch(setIsLoading(true))

    if (!token) return clearAndExit()

    const decoded = verifyToken<JWTDecoded>(token)
    if (!decoded || !decoded.uid) return clearAndExit()

    UserService.getById(decoded.uid)
      .then((resp) => {
        dispatch(login({ token, user: resp.user }))
        dispatch(setIsLoading(false))
      })
      .catch(clearAndExit)
  }

  /// Delete token from local storage and redirect to login
  const clearAndExit = () => {
    dispatch(logout())
    dispatch(setIsLoading(false))
    localStorage.removeItem('token')
    toast.warning('Session expired, please login again')
    return navigate('/auth/login')
  }

  if (token && !authState.isLoggedIn) {
    validateAuth()
  }

  /// Connect to socket when user is logged in
  useEffect(() => {
    if (!socket && authState.user.uid != '') {
      connectSocket(authState.user.uid)
    }

    socket?.on('start_chat', (data) => {
      dispatch(setActiveChat({ chat: data }))
    })

    socket?.on('new_message', (data) => {
      console.log('new message: ', data)
      dispatch(addMessage(data))
    })

    return () => {
      socket?.off('start_chat')
      socket?.off('new_message')
    }
  }, [authState.isLoggedIn, authState.user, socket])

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (
        <Stack position='absolute' width='100vw' height='100%' overflow='hidden'>
          <Outlet />
        </Stack>
      )}
    </>
  )
}
