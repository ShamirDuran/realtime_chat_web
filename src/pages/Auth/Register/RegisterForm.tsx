import { yupResolver } from '@hookform/resolvers/yup'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { LoadingButton } from '@mui/lab'
import { IconButton, InputAdornment, Link, Stack } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { FormProvider, RHFTextField } from '../../../components'

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // TODO: Add length validation
  const LoginSchema = Yup.object({
    email: Yup.string()
      .required('Email is required')
      .email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
    passwordConfirmation: Yup.string()
      .required('Password confirm is required')
      .oneOf([Yup.ref('password')], 'Passwords must match'),
  })

  const defaultValues = {
    email: '',
    password: '',
    passwordConfirmation: '',
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
    console.log(data)
  })

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3} mb={5}>
        <RHFTextField
          name='email'
          label='Email address'
          type='email'
          tabIndex={1}
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
          fullWidth
        />

        <RHFTextField
          name='passwordConfirmation'
          label='Confirm password'
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
        Login
      </LoadingButton>
    </FormProvider>
  )
}
