import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
  isLoggedIn: false,
  uid: '',
  firstName: '',
  lastName: '',
  email: '',
  token: '',
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.uid = action.payload.uid
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
      state.email = action.payload.email
      state.token = action.payload.token
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.uid = ''
      state.firstName = ''
      state.lastName = ''
      state.email = ''
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAuthUser = (state: RootState) => state.auth.uid
export const selectAuthState = (state: RootState) => state.auth

export default authSlice.reducer
