// userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUser } from './types';


interface IUserState {
  currentUser: TUser | null;
}

const initialState: IUserState = {
  currentUser: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.currentUser = action.payload
    },
    clearUser: (state) => {
      state.currentUser = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
