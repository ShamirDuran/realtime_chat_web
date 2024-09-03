import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { FormProvider, RHFTextField } from '../../../components'
import { AuthService } from '../../../api/services'
import { toast } from 'sonner'
import { useAppDispatch } from '../../../hooks'

interface Props {
  handleError: (error: string) => void
}

export const LoginForm = ({ handleError }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // TODO: Add length validation
  const LoginSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  })

  const defaultValues = {
    email: 'shamirduran15@gmail.com',
    password: 'Password1234.',
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    AuthService.login(data.email, data.password)
      .then((resp) => {
        toast.success(resp.msg)
        navigate('/')
      })
      .catch((err) => handleError(err.msg))
      .finally(() => setIsLoading(false))
  })

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField
          name='email'
          label='Email address'
          type='email'
          disabled={isLoading}
          fullWidth
        />

        <RHFTextField
          name='password'
          label='Password'
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
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
      </Stack>

      <Stack alignItems='flex-end' sx={{ my: 2 }}>
        <Link
          component={RouterLink}
          to='/auth/password_reset'
          variant='body2'
          color='inherit'
          underline='always'
        >
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        loading={isLoading}
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
        Login
      </LoadingButton>
    </FormProvider>
  )
}
