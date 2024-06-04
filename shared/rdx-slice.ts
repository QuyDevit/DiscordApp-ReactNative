import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IMainSlice, TAppColorMode, TChannel, TRoom, TServerData } from './types'

// Define a type for the slice state

// Define the initial state using that type
const initialState: IMainSlice = {
  safeAreabg: 'white',
  hideBottomTab:false,
  openRightdrawer:false,
  appColorMode: 'light',
  idRoomchat: {} as TRoom,
  channelSection:''
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
    },  
    setIdRoomChat:  (state, action: PayloadAction<TRoom>) => {
      state.idRoomchat = action.payload
    },
     setChannelSection:  (state, action: PayloadAction<string>) => {
      state.channelSection = action.payload
    },
  },
})

export const { 
  updateSafeAreaBg,
  setHideBottomTab,
  setOpenRightDrawer,
  setAppColorMode,
  setIdRoomChat,
  setChannelSection
} = mainSlice.actions


export default mainSlice.reducer