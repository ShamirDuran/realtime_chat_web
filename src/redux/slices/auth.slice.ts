import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { User } from '../../api/models'

interface AuthState {
  isLoggedIn: boolean
  user: User
  token?: string
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    status: '',
  },
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true
      state.token = action.payload.token
      state.user = action.payload.user
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.token = undefined
      state.user = initialState.user
      localStorage.removeItem('token')
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAuthState = (state: RootState) => state.auth.isLoggedIn
export const selectAuthUser = (state: RootState) => state.auth.user

export default authSlice.reducer
