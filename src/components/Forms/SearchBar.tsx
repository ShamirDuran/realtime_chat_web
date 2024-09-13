import CloseIcon from '@mui/icons-material/Close'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  useTheme,
} from '@mui/material'
import { useForm } from '../../hooks'
import { useEffect } from 'react'

interface StyledIConButtonProps {
  onClick: () => void
  children: JSX.Element
}

type SearchBarProps = TextFieldProps & {
  handleSearch: (value: string) => void
  bgcolor?: string
  my?: number
  mx?: number
}

const StyledIConButton = ({ onClick, children, ...rest }: StyledIConButtonProps) => {
  return (
    <IconButton size='small' sx={{ p: 0 }} onClick={onClick} disableRipple>
      {children}
    </IconButton>
  )
}

export const SearchBar = ({
  handleSearch,
  bgcolor,
  mx = 0,
  my = 0,
  ...rest
}: SearchBarProps) => {
  const theme = useTheme()
  const [formValue, handleChange, setValues] = useForm({
    search: '',
  })

  useEffect(() => {
    handleSearch(formValue.search)
  }, [formValue.search])

  return (
    <Box mx={mx} my={my}>
      <TextField
        name='search'
        value={formValue.search}
        placeholder='Search'
        autoComplete='off'
        autoCorrect='off'
        sx={{
          lineHeight: theme.typography.body2.lineHeight,
          color: theme.typography.body2.color,
          '& .MuiOutlinedInput-root': {
            fontSize: 12,
            bgcolor: bgcolor ?? theme.palette.grey[200],
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: 0,
          },
        }}
        slotProps={{
          input: {
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
          },
        }}
        size='small'
        onChange={handleChange}
        fullWidth
        {...rest}
      />
    </Box>
  )
}
