import { Container, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { RegisterForm } from './RegisterForm'

export const RegisterPage = () => {
  return (
    <Stack width='100vw' height='100vh' alignItems='center' justifyContent='center'>
      <Container maxWidth='sm'>
        <Stack spacing={2} mb={5}>
          <Typography variant='h4'>Register</Typography>

          <Stack direction='row' spacing={0.5}>
            <Typography variant='body2'>Have an account?</Typography>

            <Link to={'/login'} component={RouterLink} variant='subtitle2'>
              Login
            </Link>
          </Stack>
        </Stack>

        <RegisterForm />
      </Container>
    </Stack>
  )
}
