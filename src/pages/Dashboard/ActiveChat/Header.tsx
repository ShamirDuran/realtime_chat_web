import SearchIcon from '@mui/icons-material/Search'
import AddIcCallIcon from '@mui/icons-material/AddIcCall'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { faker } from '@faker-js/faker'
import { Box, Stack, Typography } from '@mui/material'
import { CircleAvatar, TruncatedText, TooltipIconbutton } from '../../../components'
import { useStyles } from '../../../hooks'

export const Header = () => {
  const styles = useStyles()

  return (
    <Box
      sx={{
        py: styles.margin.root.vertical,
        px: styles.margin.root.horizontal,
      }}
    >
      <Stack direction='row'>
        <CircleAvatar src={faker.image.avatarLegacy()} />

        {/* User info */}
        <Stack
          sx={{ cursor: 'pointer', userSelect: 'none' }}
          onClick={() => console.log('Config modal')}
          ml={2}
        >
          <TruncatedText
            fontWeight={styles.fonts.title.weight}
            textOverflow='ellipsis'
            text={faker.person.fullName()}
          />
          <Typography
            component='p'
            color='text.secondary'
            fontSize={14}
            variant='body2'
            letterSpacing={0.4}
          >
            Last seen Yesterday 02:30 PM
          </Typography>
        </Stack>

        <Box flex={1} />

        <Stack direction='row' spacing={1.6}>
          <TooltipIconbutton size='large' tooltipTitle='Search'>
            <SearchIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>

          <TooltipIconbutton size='large' tooltipTitle='Call'>
            <AddIcCallIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>

          <TooltipIconbutton size='large' tooltipTitle='Menu'>
            <MoreVertIcon color='inherit' fontSize='small' />
          </TooltipIconbutton>
        </Stack>
      </Stack>
    </Box>
  )
}
