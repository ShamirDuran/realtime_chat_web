import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  openProfileDrawer: true,
  isLoading: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialState,
  reducers: {
    toggleProfileDrawer: (state) => {
      state.openProfileDrawer = !state.openProfileDrawer
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggleProfileDrawer, setIsLoading } = uiSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProfileDrawer = (state: RootState) => state.ui.openProfileDrawer

export default uiSlice.reducer
