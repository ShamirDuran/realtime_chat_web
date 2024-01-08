import { Alert, Container, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'
import { useState } from 'react'

export const RegisterPage = () => {
  const [registerError, setRegisterError] = useState('')

  const handleError = (error: string) => {
    setRegisterError(error)
  }

  return (
    <>
      <Stack spacing={2} mb={5}>
        <Typography variant='h4'>Register</Typography>

        <Stack direction='row' spacing={0.5}>
          <Typography variant='body2'>Have an account?</Typography>

          <Link to={'/auth/login'} component={RouterLink} variant='subtitle2'>
            Login
          </Link>
        </Stack>
      </Stack>

      {registerError && (
        <Alert severity='error' variant='filled' sx={{ mb: 3 }}>
          {registerError}
        </Alert>
      )}

      <RegisterForm handleError={handleError} />
    </>
  )
}
