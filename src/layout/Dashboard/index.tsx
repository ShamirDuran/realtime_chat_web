import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { UserService } from '../../api/services'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { JWTDecoded } from '../../interfaces'
import { login, logout, selectAuthState } from '../../redux/slices/auth.slice'
import { selectIsLoading, setIsLoading } from '../../redux/slices/ui.slice'
import { verifyToken } from '../../utils'
import { LoadingPage } from '../../pages'

export const DashboardLayout = () => {
  const navigate = useNavigate()
  const isLoading = useAppSelector(selectIsLoading)
  const authState = useAppSelector(selectAuthState)
  const dispatch = useAppDispatch()

  const validateAuth = () => {
    dispatch(setIsLoading(true))

    const token = localStorage.getItem('token')
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

  const clearAndExit = () => {
    dispatch(logout())
    dispatch(setIsLoading(false))
    localStorage.removeItem('token')
    return navigate('/auth/login')
  }

  if (!authState) {
    console.log('called')
    validateAuth()
  }

  return <>{isLoading ? <LoadingPage /> : <Outlet />}</>
}
