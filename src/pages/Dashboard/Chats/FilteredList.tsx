import ChatIcon from '@mui/icons-material/Chat'
import PersonIcon from '@mui/icons-material/Person'
import { Box, Stack } from '@mui/material'
import { useAppSelector, useStyles } from '../../../hooks'
import { selectChatState } from '../../../redux/slices/chat.slice'
import { Section } from './Section'

export const FilteredList = () => {
  const styles = useStyles()
  const chatState = useAppSelector(selectChatState)

  return (
    <Stack overflow='auto'>
      <Section Icon={ChatIcon} title='Messages' color={styles.colors.purple} mt={0}>
        <Box>
          {/* {[].map((_, index) => (
    <Chat key={index} />
  ))} */}
        </Box>
      </Section>

      <Section Icon={PersonIcon} title='Contacts' color={styles.colors.accentGreen}>
        <Box>
          {/* {[].map((_, index) => (
    <Chat key={index} />
  ))} */}
        </Box>
      </Section>
    </Stack>
  )
}
