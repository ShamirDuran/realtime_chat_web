import { Alert, Container, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { LoginForm } from './LoginForm'
import { useState } from 'react'

export const LoginPage = () => {
  const [loginError, setLoginError] = useState('')

  const handleError = (error: string) => {
    setLoginError(error)
  }

  return (
    <Stack width='100vw' height='100vh' alignItems='center' justifyContent='center'>
      <Container maxWidth='sm'>
        <Stack spacing={2} mb={5}>
          <Typography variant='h4'>Login</Typography>

          <Stack direction='row' spacing={0.5}>
            <Typography variant='body2'>New user?</Typography>

            <Link to={'/auth/register'} component={RouterLink} variant='subtitle2'>
              Create an account
            </Link>
          </Stack>
        </Stack>

        {loginError && (
          <Alert severity='error' variant='filled' sx={{ mb: 3 }}>
            {loginError}
          </Alert>
        )}

        <LoginForm handleError={handleError} />
      </Container>
    </Stack>
  )
}
