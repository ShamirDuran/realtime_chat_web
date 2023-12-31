import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './slices/ui.slice'
import authSlice from './slices/auth.slice'

export const store = configureStore({
  reducer: { ui: uiSlice, auth: authSlice },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
