import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Stack } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import * as Yup from 'yup'
import { AuthService } from '../../../api/services'
import { FormProvider, RHFTextField } from '../../../components'

interface Props {
  handleError: (error: string) => void
}

export const RegisterForm = ({ handleError }: Props) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // TODO: Add length validation
  const LoginSchema = Yup.object({
    fullName: Yup.string().required('Full name is required'),
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .required('Password confirm is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const defaultValues = {
    fullName: 'Shamir Duran',
    email: 'shamirduran15@gmail.com',
    password: 'Password1234.',
    passwordConfirmation: 'Password1234.',
  }

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  })

  const {
    watch,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit = handleSubmit((data) => {
    setIsLoading(true)
    AuthService.register(data.fullName, data.email, data.password)
      .then((resp) => {
        toast.success(resp.msg)
        navigate('/auth/login')
      })
      .catch((err) => handleError(err.msg))
      .finally(() => setIsLoading(false))
  })

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} mb={5}>
        <RHFTextField
          name='fullName'
          label='Full name'
          type='text'
          disabled={isLoading}
          fullWidth
        />

        <RHFTextField
          name='email'
          label='Email address'
          type='text'
          disabled={isLoading}
          fullWidth
        />

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
      </Stack>

      <LoadingButton
        fullWidth
        color='inherit'
        size='large'
        type='submit'
        variant='contained'
        loading={isLoading}
        tabIndex={-1}
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
        Register
      </LoadingButton>
    </FormProvider>
  )
}
