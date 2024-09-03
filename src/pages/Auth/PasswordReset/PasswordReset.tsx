import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import { Container, IconButton, InputAdornment, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { AuthService } from '../../../api/services'
import { FormProvider, RHFTextField } from '../../../components'
import { verifyToken } from '../../../utils'

export const PasswordReset = () => {
  const { token } = useParams()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) return

    const decoded = verifyToken(token)
    if (!decoded) {
      console.log('executed')

      toast.error('Link has expired. Please request a new one.')
      navigate('/auth/password_reset')
    }
  }, [])

  const FormSchema = Yup.object({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .max(20, 'Password must be at most 20 characters')
      .required('Password is required'),
    passwordConfirmation: Yup.string()
      .required('Password confirm is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      password: '',
      passwordConfirmation: '',
    },
  })

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = handleSubmit((data) => {
    if (!token) return
    setIsLoading(true)

    AuthService.passwordReset(token, data.password)
      .then((resp: any) => {
        toast.success(resp.msg)
        navigate('/auth/login')
      })
      .catch((err) => toast.error(err.msg || 'An unexpected error occurred'))
      .finally(() => setIsLoading(false))
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
          <Typography variant='h4'>Change password</Typography>
          <Typography variant='body2'>
            New password must be between 6 and 20 characters long.
          </Typography>
        </Stack>

        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Stack spacing={3}>
            <RHFTextField
              name='password'
              label='Password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: watch('password') && (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
              fullWidth
            />

            <RHFTextField
              name='passwordConfirmation'
              label='Confirm password'
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: watch('passwordConfirmation') && (
                  <InputAdornment position='end'>
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge='end'>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              disabled={isLoading}
              fullWidth
            />

            <LoadingButton
              fullWidth
              color='inherit'
              size='large'
              type='submit'
              variant='contained'
              disabled={isLoading}
              sx={{
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
              Change Password
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </Stack>
  )
}
