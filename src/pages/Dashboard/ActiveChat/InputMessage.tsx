import EmojiIcon from '@mui/icons-material/SentimentSatisfiedAlt'
import SendIcon from '@mui/icons-material/Send'
import { Stack, Divider, InputBase, styled, IconButton, Box } from '@mui/material'
import { useStyles } from '../../../hooks'

const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'transparent',
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  width: '100%',
  marginBottom: theme.spacing(1.5),
}))

const Container = styled(Stack)(({ theme }) => ({
  elevation: 1,
  boxShadow:
    'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px',
  borderRadius: 50,
  backgroundColor: theme.palette.background.default,
  alignItems: 'center',
  padding: '4px 5px 4px 16px',
  flex: 1,
}))

const Input = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: 0,
    fontSize: theme.typography.body2.fontSize,
    lineHeight: theme.typography.body2.lineHeight,
    color: theme.typography.body2.color,
  },
  '& .MuiInputBase-root': {
    padding: 0,
  },
}))

// TODO: Change float to fixed design for improve multiline input
export const InputMessage = () => {
  const styles = useStyles()

  return (
    <Wrapper px={styles.margin.root.horizontal}>
      <Container direction='row' spacing={3}>
        <Stack direction='row' alignItems='center' spacing='16px' flex={1}>
          <EmojiIcon sx={{ color: 'text.secondary' }} />
          <Divider orientation='vertical' flexItem />
          <Input
            placeholder='Type Your Message Here...'
            size='small'
            type='text'
            fullWidth
          />
        </Stack>

        <IconButton
          disableRipple
          size='large'
          sx={{
            bgcolor: (theme) => theme.palette.action.selected,
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          <SendIcon fontSize='small' />
        </IconButton>
      </Container>
    </Wrapper>
  )
}
