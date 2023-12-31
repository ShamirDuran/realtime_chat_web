import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  Collapse,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyledToolbar } from '../../../components'
import { useAppDispatch, useAppSelector, useStyles } from '../../../hooks'
import { selectProfileDrawer, toggleProfileDrawer } from '../../../redux/slices'

const avatarSize = 200

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: avatarSize,
  height: avatarSize,
  margin: 'auto',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
}))

const Label = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
}))

const ClickableWrapper = styled(Box)({
  cursor: 'pointer',
})

export const ProfileDrawer = () => {
  const theme = useTheme()
  const styles = useStyles()
  const dispatch = useAppDispatch()
  const profileDrawerState = useAppSelector(selectProfileDrawer)
  const [editingName, setEditingName] = React.useState(false)
  const [editingDescription, setEditingDescription] = React.useState(false)

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: 'Shamir Duran',
      description: '',
    },
  })

  React.useEffect(() => {
    register('name', {
      required: true,
      maxLength: {
        value: 20,
        message: 'Max length is 20',
      },
    })
  }, [])

  const onSubmit = handleSubmit((data) => {
    console.log(data)
  })

  return (
    <Collapse
      orientation='horizontal'
      in={profileDrawerState}
      sx={{
        position: 'absolute',
        bgcolor: theme.palette.background.default,
        borderRightWidth: 1,
        borderRightColor: theme.palette.divider,
        borderRightStyle: 'solid',
        boxShadow: theme.shadows[1],
        zIndex: 5,
      }}
    >
      <Box
        sx={{
          width: styles.dimensions.profileDrawer.width,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
        }}
      >
        {/* Toolbar */}
        <StyledToolbar
          sx={{
            width: '100%',
            height: theme.spacing(16),
            backgroundColor: theme.palette.action.selected,
            color: theme.palette.primary.contrastText,
            alignItems: 'flex-end',
          }}
        >
          <Stack direction='row' alignItems='center'>
            <IconButton
              onClick={() => dispatch(toggleProfileDrawer())}
              size='small'
              disableRipple
            >
              <ArrowBackIcon sx={{ color: theme.palette.primary.contrastText }} />
            </IconButton>

            <Typography fontWeight='500' component='h1' variant='h6' ml={1.5}>
              Profile
            </Typography>
          </Stack>
        </StyledToolbar>

        <Box width='100%' px={styles.margin.root.horizontal}>
          <StyledAvatar />

          <FormControl sx={{ mb: 5 }} disabled={!editingName} fullWidth>
            <Label>Your name</Label>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  disableUnderline={!editingName}
                  maxRows={1}
                  endAdornment={
                    <InputAdornment position='end'>
                      {editingName ? (
                        <ClickableWrapper
                          onClick={() => {
                            onSubmit()
                            setEditingName(false)
                          }}
                        >
                          <CheckIcon />
                        </ClickableWrapper>
                      ) : (
                        <ClickableWrapper onClick={() => setEditingName(true)}>
                          <EditIcon fontSize='small' />
                        </ClickableWrapper>
                      )}
                    </InputAdornment>
                  }
                />
              )}
            />
            {errors.name && JSON.stringify(errors.name, null, 2)}
          </FormControl>

          <FormControl disabled={!editingDescription} fullWidth>
            <Label>Your description</Label>
            <Input
              type='text'
              disableUnderline={!editingDescription}
              endAdornment={
                <InputAdornment position='end'>
                  {editingDescription ? (
                    <ClickableWrapper onClick={() => setEditingDescription(false)}>
                      <CheckIcon />
                    </ClickableWrapper>
                  ) : (
                    <ClickableWrapper onClick={() => setEditingDescription(true)}>
                      <EditIcon fontSize='small' />
                    </ClickableWrapper>
                  )}
                </InputAdornment>
              }
              inputProps={{
                maxLength: 100,
              }}
            />
          </FormControl>
        </Box>
      </Box>
    </Collapse>
  )
}
