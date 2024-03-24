import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import { Box, Stack, Typography, useTheme } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { CircleContainer } from '../../../components'
import { useStyles } from '../../../hooks'

interface Props {
  title: string
  Icon: React.ElementType
  color: string
  children: JSX.Element
  mt?: number
}

const useClasses = makeStyles({
  headerContainer: {
    cursor: 'pointer',
    userSelect: 'none',
    alignItems: 'center',
  },
  rotateIcon: {
    transform: 'rotate(180deg)',
  },
})

export const Section = React.memo(({ title, Icon, color, children, mt = 2 }: Props) => {
  const theme = useTheme()
  const classes = useClasses()
  const styles = useStyles()
  const [isVisible, setIsVisible] = React.useState(true)

  return (
    <Stack alignItems='flex-start'>
      <Stack
        flex={1}
        direction='row'
        className={classes.headerContainer}
        onClick={() => setIsVisible((prev) => !prev)}
        mx={styles.margin.root.horizontal}
        mt={mt}
        mb={1.5}
      >
        <CircleContainer bgcolor={color} size={28}>
          {<Icon sx={{ color: theme.palette.common.white, fontSize: 17 }} />}
        </CircleContainer>

        <Typography color='grey.600' fontSize={14} fontWeight={500} ml={1.5} mr={1}>
          {title}
        </Typography>

        <ArrowDropDownIcon
          className={isVisible ? classes.rotateIcon : ''}
          fontSize='small'
        />
      </Stack>

      {isVisible && children}
    </Stack>
  )
})
