import CameraAltIcon from '@mui/icons-material/CameraAlt'
import CheckIcon from '@mui/icons-material/Check'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  FormControl,
  Input,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import styled from 'styled-components'
import { useAppSelector, useForm, useStyles } from '../../../hooks'
import { selectAuthUser } from '../../../redux/slices/auth.slice'
import { upperCammelCase } from '../../../utils'

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

  const [formValues, handleChange] = useForm({
    name: `${upperCammelCase(user.firstName)} ${upperCammelCase(user.lastName)}`,
    description: user?.about ?? '',
  })

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

      <FormControl sx={{ mb: 4 }} disabled={!editingName} fullWidth>
        <Label>Your name</Label>

        <Input
          name='name'
          type='text'
          value={formValues.name}
          onChange={handleChange}
          maxRows={1}
          disableUnderline={!editingName}
          endAdornment={
            <DynamicAdortments
              isEditing={editingName}
              onClick={() => setEditingName(!editingName)}
            />
          }
          inputProps={{
            maxLength: 15,
          }}
        />
      </FormControl>

      <FormControl disabled={!editingDescription} fullWidth>
        <Label>Your description</Label>
        <Input
          name='description'
          type='text'
          value={formValues.description}
          onChange={handleChange}
          disableUnderline={!editingDescription}
          placeholder='Add a description'
          endAdornment={
            <DynamicAdortments
              isEditing={editingDescription}
              onClick={() => setEditingDescription(!editingDescription)}
            />
          }
          inputProps={{
            maxLength: 100,
          }}
        />
      </FormControl>
    </ContentWrapper>
  )
}
