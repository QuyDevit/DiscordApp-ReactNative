import { FieldValue } from "@react-native-firebase/firestore";
import { TextProps } from "react-native";

export interface IMainSlice {
  safeAreabg: string;
  hideBottomTab:boolean;
  openRightdrawer: boolean;
  appColorMode:TAppColorMode,
}

export interface IServerSlice {
  servers: TServerData[];
  loading: boolean;
  error: string | null;
  channelData:  TChannel,
  serverData: TServerData,
}

export type TUser = {
  id: string;
  name: string;
  hashtagname:string;
  email: string;
  pass:string;
  phone:string;
  birthday:string;
  avatart:string;
  status:number
}

export type TServerData = {
    id: string;
    image: string,
    title: string,
    channels: Array<TChannelSection>,
    createby:string,
    listmember:Array<TUser>,
    cratedate:number
};

export type TChannelSection = {
    id: string
    category: string,
    items: Array<TChannel>
};

export type TChannel = {id: string; title: string, type: TChannelType; image?: string}

export type TChannelType = 'voice' | 'text'

export interface ITText extends TextProps{
    fontFamily?: TFontFamily;
}

export type TNotification = {
    id:string,
    from: TUser,
    checkread : boolean,
    to:string,
    notificationAt:number;
};

export type TFontFamily = 'bold' | 'semiBold' | 'medium' | 'regular'

export type TAppColorMode = 'light' | 'dark'

export interface IChanelListContent {
  navigation:any
}