import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Chat, User } from '../../api/models'

interface UiState {
  openProfileDrawer: boolean
  openContactExplorerModal: boolean
  isLoading: boolean
  isMobile?: boolean
}

const initialState: UiState = {
  openProfileDrawer: false,
  openContactExplorerModal: false,
  isLoading: false,
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
  },
})

// Action creators are generated for each case reducer function
export const { toggleProfileDrawer, toggleContactExplorerModal, setIsLoading } =
  uiSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProfileDrawer = (state: RootState) => state.ui.openProfileDrawer
export const selectIsLoading = (state: RootState) => state.ui.isLoading
export const selectUiState = (state: RootState) => state.ui

export default uiSlice.reducer
