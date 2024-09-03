import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Container, Stack, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { AuthService } from '../../../api/services'
import { FormProvider, RHFTextField } from '../../../components'

export const ForgotPassword = () => {
  const navigate = useNavigate()

  const FormSchema = Yup.object({
    email: Yup.string()
      .email('Email must be a validad email address')
      .required('Email is required'),
  })

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = handleSubmit((data) => {
    AuthService.forgotPassword(data.email)
      .then(() => toast.success('Password reset email sent successfully'))
      .catch((err) => toast.error(err.msg || 'An unexpected error occurred'))
      .finally(() => navigate('/auth/login'))
  })

  return (
    <Stack
      position='absolute'
      width='100vw'
      height='100%'
      alignItems='center'
      justifyContent='center'
    >
      <Container maxWidth='sm'>
        <Stack spacing={1} mb={2}>
          <Typography variant='h4'>Reset your password</Typography>
          <Typography variant='body2'>
            Enter your user account's verified email address and we will send you a
            password reset link.
          </Typography>
        </Stack>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <RHFTextField
            autoCapitalize='off'
            autoComplete='off'
            name='email'
            placeholder='Enter your email address'
            type='email'
            fullWidth
          />

          <LoadingButton
            fullWidth
            color='inherit'
            size='large'
            type='submit'
            variant='contained'
            sx={{
              mt: 2,
              bgcolor: 'text.primary',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              '&:hover': {
                bgcolor: 'text.primary',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
              },
            }}
          >
            Send password reset email
          </LoadingButton>
        </FormProvider>
      </Container>
    </Stack>
  )
}
