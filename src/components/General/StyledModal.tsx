import CancelIcon from '@mui/icons-material/Cancel'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
} from '@mui/material'
import React from 'react'

interface Props extends DialogProps {
  id: string
  title?: string
  children: React.ReactNode
  open: boolean
  handleClose: () => void
  actions?: React.ReactNode
}

export const StyledModal = ({
  id,
  title,
  children,
  open,
  handleClose,
  actions,
  ...rest
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 3,
        },
      }}
      {...rest}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center' pr={2}>
        <DialogTitle sx={{ m: 0, px: 2, py: 1.5 }} id={id}>
          {title}
        </DialogTitle>

        <IconButton
          edge='end'
          sx={{ color: (theme) => theme.palette.grey[500] }}
          onClick={handleClose}
        >
          <CancelIcon color='error' />
        </IconButton>
      </Stack>

      <Divider />

      <DialogContent sx={{ mx: 2, px: 0, pt: 1.5, pb: 0 }}>{children}</DialogContent>

      <DialogActions>{actions}</DialogActions>
    </Dialog>
  )
}
