import { yupResolver } from '@hookform/resolvers/yup'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  FormControl,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import * as Yup from 'yup'
import { FormProvider, RHFTextField } from '../../../components'
import { useAppSelector, useStyles } from '../../../hooks'
import {
  selectAuthUser,
  setUserDescription,
  setUserName,
} from '../../../redux/slices/auth.slice'
import { upperCammelCase } from '../../../utils'
import { UserService } from '../../../api/services'
import { useDispatch } from 'react-redux'

const avatarSize = 200

const ClickableWrapper = styled(Box)({ cursor: 'pointer' })

const Label = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  color: theme.palette.text.secondary,
}))

const ContentWrapper = styled(Box)(({ theme }) => {
  const styles = useStyles()

  return {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: theme.spacing(styles.margin.root.horizontal),
    paddingRight: theme.spacing(styles.margin.root.horizontal),
  }
})

const DynamicAdortments = ({
  isEditing,
  onClick,
}: {
  isEditing: boolean
  onClick: () => void
}) => {
  return (
    <InputAdornment position='end'>
      {isEditing ? (
        <ClickableWrapper onClick={onClick}>
          <CheckIcon color='success' />
        </ClickableWrapper>
      ) : (
        <ClickableWrapper onClick={onClick}>
          <EditIcon fontSize='small' />
        </ClickableWrapper>
      )}
    </InputAdornment>
  )
}

export const ProfileDrawerBody = () => {
  const [editingName, setEditingName] = useState(false)
  const [editingDescription, setEditingDescription] = useState(false)
  const [isHovered, setHovered] = useState(false)
  const user = useAppSelector(selectAuthUser)
  const dispatch = useDispatch()

  const FormSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(15, 'Name must be less than 15 characters')
      .required('Name is required'),
    description: Yup.string().max(100, 'Description must be less than 100 characters'),
  })

  const methods = useForm({
    resolver: yupResolver(FormSchema),
    defaultValues: {
      name: upperCammelCase(user.fullName),
      description: user?.about ?? '',
    },
  })

  const {
    watch,
    handleSubmit,
    formState: { errors },
    trigger,
  } = methods

  const onSubmit = handleSubmit((data) => {})

  const onSubmitName = async () => {
    const validName = await trigger('name')
    if (!validName) return

    setEditingName(!editingName)

    if (watch('name') !== user.fullName) {
      dispatch(setUserName(watch('name')))
      UserService.updateName(watch('name'))
    }
  }

  const onSubmitDescription = async () => {
    const validDescription = await trigger('description')
    if (!validDescription) return

    setEditingDescription(!editingDescription)

    if (watch('description') !== user.about) {
      dispatch(setUserDescription(watch('description')))
      UserService.updateDescription(watch('description') || '')
    }
  }

  return (
    <ContentWrapper>
      <Stack
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        alignSelf='center'
        position='relative'
        my={3}
      >
        <Avatar sx={{ width: avatarSize, height: avatarSize }} src={user?.avatar ?? ''} />

        {isHovered && (
          <Stack
            sx={{
              width: avatarSize,
              height: avatarSize,
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0,0,0,0.5)',
              borderRadius: '50%',
              color: '#fff',
              transitionDuration: '0.2s',
              cursor: 'pointer',
            }}
          >
            <CameraAltIcon sx={{ color: 'inherit', mb: 1 }} />
            <Typography fontSize={12}>CHANGE</Typography>
            <Typography fontSize={12}>PROFILE PHOTO</Typography>
          </Stack>
        )}
      </Stack>

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <FormControl sx={{ mb: 4 }} disabled={!editingName} fullWidth>
          <Label>Your name</Label>
          <RHFTextField
            name='name'
            type='text'
            placeholder='Add your name'
            slotProps={{
              input: {
                maxRows: 1,
                disabled: !editingName,
                disableUnderline: !editingName,
                inputProps: {
                  maxLength: 15,
                },
                endAdornment: (
                  <DynamicAdortments isEditing={editingName} onClick={onSubmitName} />
                ),
              },
            }}
            variant='standard'
            autoComplete='off'
            autoCorrect='off'
          />
        </FormControl>

        <FormControl disabled={!editingDescription} fullWidth>
          <Label>Your description</Label>
          <RHFTextField
            name='description'
            type='text'
            placeholder='Add a description'
            slotProps={{
              input: {
                maxRows: 3,
                disabled: !editingDescription,
                disableUnderline: !editingDescription,
                inputProps: {
                  maxLength: 100,
                },
                endAdornment: (
                  <DynamicAdortments
                    isEditing={editingDescription}
                    onClick={onSubmitDescription}
                  />
                ),
              },
            }}
            multiline
            variant='standard'
            autoComplete='off'
            autoCorrect='off'
          />
        </FormControl>
      </FormProvider>
    </ContentWrapper>
  )
}
