import { Toolbar, styled } from '@mui/material'
import { useStyles } from '../../hooks'

export const StyledToolbar = styled(Toolbar)(({ theme }) => {
  const styles = useStyles()

  return {
    borderBottomWidth: 1,
    borderBottomColor: theme.palette.divider,
    borderBottomStyle: 'solid',
    paddingLeft: theme.spacing(styles.margin.root.horizontal),
    paddingRight: theme.spacing(styles.margin.root.horizontal),
    paddingTop: theme.spacing(styles.margin.root.vertical),
    paddingBottom: theme.spacing(styles.margin.root.vertical),
    boxSizing: 'border-box',
  }
})
