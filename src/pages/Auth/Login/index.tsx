import { Box, Container, Link, Stack, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { Form } from './Form'

export const LoginPage = () => {
  return (
    <Stack width='100vw' height='100vh' alignItems='center' justifyContent='center'>
      <Container maxWidth='sm'>
        <Stack spacing={2} mb={5}>
          <Typography variant='h4'>Login</Typography>

          <Stack direction='row' spacing={0.5}>
            <Typography variant='body2'>New user?</Typography>

            <Link to={'/register'} component={RouterLink} variant='subtitle2'>
              Create an account
            </Link>
          </Stack>
        </Stack>

        <Form />
      </Container>
    </Stack>
  )
}
