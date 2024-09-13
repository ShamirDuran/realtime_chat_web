import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// TODO: replace isLoading from slice with their own state or context
interface UiState {
  openProfileDrawer: boolean
  openContactExplorerModal: boolean
  searchValue?: string
  isLoading: boolean
  isLoadingChats?: boolean
  isMobile?: boolean
}

const initialState: UiState = {
  openProfileDrawer: false,
  openContactExplorerModal: false,
  isLoading: false,
  isLoadingChats: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleProfileDrawer: (state) => {
      state.openProfileDrawer = !state.openProfileDrawer
    },
    toggleContactExplorerModal: (state) => {
      state.openContactExplorerModal = !state.openContactExplorerModal
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setIsLoadingChats: (state, action) => {
      state.isLoadingChats = action.payload
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  toggleProfileDrawer,
  toggleContactExplorerModal,
  setIsLoading,
  setIsLoadingChats,
  setSearchValue,
} = uiSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProfileDrawer = (state: RootState) => state.ui.openProfileDrawer
export const selectIsLoading = (state: RootState) => state.ui.isLoading
export const selectUiState = (state: RootState) => state.ui
export const selectSearchValue = (state: RootState) => state.ui.searchValue

export default uiSlice.reducer
