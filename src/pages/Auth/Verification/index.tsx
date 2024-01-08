import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred'
import { Link, Stack, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { AuthService } from '../../../api/services'
import { JWTDecoded } from '../../../interfaces'
import { verifyToken } from '../../../utils'
import { LoadingPage } from '../../LoadingPage'

export const VerifyAccount = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState(false)
  const [message, setMessage] = useState('')
  const theme = useTheme()

  useEffect(() => {
    if (token) {
      const decoded = verifyToken<JWTDecoded>(token)

      if (decoded && decoded.uid) {
        AuthService.verifyAccount(token)
          .then((resp) => {
            setStatus(resp.status)
            setMessage(resp.msg)
          })
          .catch((err) => setMessage(err.msg))
          .finally(() => setIsLoading(false))
      }
    } else navigate('/auth/login')
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Stack width='100vw' height='100vh' justifyContent='center' alignItems='center'>
      <>
        <Stack alignItems='flex-start' spacing={2} mb={5}>
          {!isLoading && status ? (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h4'>Account verified!</Typography>
              <CheckCircleOutlineIcon color='success' fontSize='large' />
            </Stack>
          ) : (
            <Stack direction='row' alignItems='center' spacing={2}>
              <Typography variant='h4'>Verification failed!</Typography>
              <ReportGmailerrorredIcon color='error' fontSize='large' />
            </Stack>
          )}

          <Typography variant='body2'>{message}</Typography>

          <Stack
            direction='row'
            spacing={0.5}
            style={{
              marginTop: theme.spacing(5),
            }}
          >
            <Typography variant='body2'>Go to</Typography>

            {!isLoading && status ? (
              <Link to={'/auth/login'} component={RouterLink} variant='subtitle2'>
                Login
              </Link>
            ) : (
              <Link to={'/auth/register'} component={RouterLink} variant='subtitle2'>
                Register
              </Link>
            )}
          </Stack>
        </Stack>
      </>
    </Stack>
  )
}
