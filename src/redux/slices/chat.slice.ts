import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { Chat } from '../../api/models'

interface UiState {
  activeChat?: Chat
}

const initialState: UiState = {
  activeChat: undefined,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    setActiveChat: (state, action) => {
      state.activeChat = action.payload.chat
    },
  },
})

// Action creators are generated for each case reducer function
export const { setActiveChat } = chatSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectChatState = (state: RootState) => state.chat
export const selectActiveChatUser = (state: RootState) => {
  const user_id = localStorage.getItem('user_id')

  return state.chat.activeChat?.participants.find(
    (participant) => participant.user.uid !== user_id,
  )?.user
}

export default chatSlice.reducer
