import { TextProps } from "react-native";

export interface IMainSlice {
  safeAreabg: string;
  hideBottomTab:boolean;
}

export interface ITText extends TextProps{
    fontFamily?: TFontFamily;

}

export type TFontFamily = 'bold' | 'semiBold' | 'medium' | 'regular'