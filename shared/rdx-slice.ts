import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMainSlice, TAppColorMode, TChannel, TServerData } from './types'

// Define a type for the slice state

// Define the initial state using that type
const initialState: IMainSlice = {
  safeAreabg: 'white',
  hideBottomTab:false,
  openRightdrawer:false,
  appColorMode: 'light',
}

export const mainSlice = createSlice({
  name: 'main',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    updateSafeAreaBg: (state, action: PayloadAction<string>) => {
      state.safeAreabg = action.payload
    },
    setHideBottomTab: (state, action: PayloadAction<boolean>) => {
      state.hideBottomTab = action.payload
    },
    setOpenRightDrawer:  (state, action: PayloadAction<boolean>) => {
      state.openRightdrawer = action.payload
    },
    setAppColorMode:  (state, action: PayloadAction<TAppColorMode>) => {
      state.appColorMode = action.payload
    }
  },
})

export const { 
  updateSafeAreaBg,
  setHideBottomTab,
  setOpenRightDrawer,
  setAppColorMode
} = mainSlice.actions


export default mainSlice.reducer