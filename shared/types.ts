import { FieldValue } from "@react-native-firebase/firestore";
import { TextProps } from "react-native";

export interface IMainSlice {
  safeAreabg: string;
  hideBottomTab:boolean;
  openRightdrawer: boolean;
  appColorMode:TAppColorMode,
  idRoomchat:TRoom,
  channelSection:string;
}
export type TRoom = {
  idroom:string,
  nameuser:string,
  tagname:string,
  image?:string
}

export interface IServerSlice {
  servers: TServerData[] | null;
  loading: boolean;
  error: string | null;
  channelData:  TChannel | null,
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
  status:number,
  listfriend:Array<TUser>;
  nitro:boolean
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
    type:number,
    server:TServerData | null,
    chanel:TChannel | null,
    message:string
};

export type TChatChannel = {
    id:string,
    sendby: TUser,
    to: string,
    notificationAt:number;
    server:TServerData | null,
    mess:string
};

export type TRoomChat = {
    roomname: string,
    type:number,
    members: Array<string>,
    lastmessAt:number;
    lastmesscontent:string,
    lastuser:TUser | null,
};
export type TMess = {
    name: string,
    avatar:string,
    id:string,
    messAt:number,
    messcontent:string,
    type:TMessType,
    image:string
};
export type TMessType = 'image' | 'text' | 'voice'
export type TFontFamily = 'bold' | 'semiBold' | 'medium' | 'regular'

export type TAppColorMode = 'light' | 'dark'

export interface IChannelListContent {
  navigation:any
}
export interface TRoomChatWithAvatar extends TRoomChat {
  opponentAvatar?:string;
  name?: string;
  idroom?:string;
  tagname?:string
}

export interface CheckedFriends {
  [key: string]: boolean;
}