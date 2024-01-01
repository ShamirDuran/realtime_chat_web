import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton, InputAdornment, TextField, useTheme } from '@mui/material'
import { useForm, useStyles } from '../../../hooks'

interface StyledIConButtonProps {
  onClick: () => void
  children: JSX.Element
}

const StyledIConButton = ({ onClick, children }: StyledIConButtonProps) => {
  return (
    <IconButton size='small' sx={{ p: 0 }} onClick={onClick} disableRipple>
      {children}
    </IconButton>
  )
}

export const SearchBar = () => {
  const styles = useStyles()
  const theme = useTheme()
  const [formValue, handleChange, setValues] = useForm({
    search: '',
  })

  return (
    <Box mx={styles.margin.root.horizontal} my={2.3}>
      <TextField
        name='search'
        value={formValue.search}
        placeholder='Search'
        sx={{
          lineHeight: theme.typography.body2.lineHeight,
          color: theme.typography.body2.color,
          '& .MuiOutlinedInput-root': {
            fontSize: 12,
            bgcolor: theme.palette.grey[200],
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <StyledIConButton onClick={() => {}}>
                <SearchIcon fontSize='small' />
              </StyledIConButton>
            </InputAdornment>
          ),
          endAdornment: !!formValue.search.length && (
            <InputAdornment position='end'>
              <StyledIConButton onClick={() => setValues({ search: '' })}>
                <CloseIcon fontSize='small' />
              </StyledIConButton>
            </InputAdornment>
          ),
        }}
        size='small'
        onChange={handleChange}
        fullWidth
      />
    </Box>
  )
}
