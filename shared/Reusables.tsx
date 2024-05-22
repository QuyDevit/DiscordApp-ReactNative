import { TextInput } from "react-native-gesture-handler";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image'
import { TText } from "../themed/themeComponents";
// @ts-ignore
import PlusIcon from '../assets/guildAddRole.svg'
// @ts-ignore
import PlusIconServer from '../assets/guildAddServer.svg'
// @ts-ignore
import AngleDownIcon from '../assets/guildDropdownMenu.svg'
// @ts-ignore
import HashTagIcon from '../assets/channelText.svg'
import BottomSheet, { BottomSheetMethods } from '@devvie/bottom-sheet';
import useAppColor from "../themed/useAppColor";
// @ts-ignore
import MessageIcon from '../assets/iconMessage.svg'
// @ts-ignore
import CopyLinkIcon from '../assets/copylink.svg'
// @ts-ignore
import ShareIcon from '../assets/shareinvite.svg'
// @ts-ignore
import MailIcon from '../assets/iconMail.svg'
// @ts-ignore
import MessagerIcon from '../assets/messagerfb.svg'
// @ts-ignore
import ZaloIcon from '../assets/zalo.svg'
// @ts-ignore
import TiktokIcon from '../assets/tiktok.svg'
import { FlashList } from "@shopify/flash-list";

export const ServerIcon = React.memo((props:any) =>{
    return (
        <TouchableOpacity onPress={props.onPress} style={{width:'100%',alignItems:'center',marginBottom:10,position:'relative'}}>
            <View style={{position:'absolute',left:0,width:5,borderRadius:6,height:props.isSelected ? '100%' : '0%',backgroundColor:'#000'}}></View>
            <View style={{width:50,height:50,borderRadius:props.isSelected ?15 : 50,overflow:'hidden'}}>
                <FastImageRes uri="https://toquoc.mediacdn.vn/280518851207290880/2023/5/29/images-8-2023-05-29t052246compress19-1024x540-1685328584193-16853285844042115166976-1685346536930-1685346536991131653137.jpg"/>
            </View>      
        </TouchableOpacity>
    )
})

export const AddServerIcon = React.memo((props:any) =>{
    return (
        <TouchableOpacity onPress={props.onPress} style={{width:'100%',alignItems:'center',marginBottom:10}}>
            <View style={{width:50,height:50,borderRadius:props.isSelected ?15 : 50,overflow:'hidden',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>                     
                <PlusIconServer width={30} height={30}/>
            </View>      
        </TouchableOpacity>
    )
})

export const FastImageRes = React.memo(({uri}:{uri:string}) =>{
    return(
        <FastImage
        style={{width:'100%',height:'100%'}}
        source={{
        uri: uri,
        headers:{ Authorization: 'someAuthToken' },
        priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
    />
    )
})

export const ChanelListHeader = React.memo((props:any) =>{
    return(
        <View style={{width:'100%',flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:5}} >
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <AngleDownIcon width={25} height={25}/>
                <TText style={{fontWeight:'bold',fontSize:17}} fontFamily="bold">Thông tin</TText>
            </View>
            <PlusIcon width={20} height={20}/>
        </View>
    )
})

export const ChanelListSection = React.memo((props:any) =>{
    return(
        <View style={{width:'100%',paddingHorizontal:8,}}>
            <ChanelListHeader/>
            <ChanelListItem/>
            <ChanelListItem/>
        </View>
    )
})

export const ChanelListItem= React.memo((props:any) =>{
    const [isPressed, setIsPressed] = useState(false);
    return(
        <TouchableOpacity 
            style={{width:'100%',paddingHorizontal:10,flexDirection:'row',alignItems:'center',paddingVertical:5,marginBottom:10,borderRadius:5, backgroundColor: isPressed ? 'rgba(0,0,0,0.1)' : 'transparent'}}
            activeOpacity={1}
            onPressIn={() => setIsPressed(true)} 
            onPressOut={() => setIsPressed(false)} 
        >
            <HashTagIcon width={22} height={22}/>
            <TText style={{fontSize:15,marginLeft:6}} numberOfLines={1}>chào-mừng-bạn-đến-với-kênh-của-tôi</TText>
        </TouchableOpacity>
    )
})

export const CustomBottomSheet = React.memo(React.forwardRef((props:any, ref:any) =>{
    const colorMode = useAppColor();
    return(
      <BottomSheet 
        {...props}
        style={{backgroundColor:'transparent'}}
        dragHandleStyle={{backgroundColor:'white',opacity:.9,width:50,top:10}}
        ref={ref}>
        <View style={{width:'100%',height:'100%',backgroundColor:colorMode.inverseWhiteGray,borderTopLeftRadius:10,borderTopRightRadius:10}}>
            {props.children}            
        </View>
      </BottomSheet>
    )
}))

export const ShareApp = React.memo((props:any) =>{
    const colorMode = useAppColor();
    return(
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:30,paddingBottom:20,borderBottomWidth:1,borderColor:'#DBDADA',paddingHorizontal:10}}>
          {[
            {icon: ShareIcon, title: 'Chia Sẻ Lời Mời'},
            {icon: CopyLinkIcon, title: 'Sao Chép Link'},
            {icon: MessageIcon, title: 'Tin Nhắn'},
            {icon: MailIcon, title: 'Email'},
            {icon: MessagerIcon, title: 'Messenger'},
            {icon: ZaloIcon, title: 'Zalo'},
            {icon: TiktokIcon, title: 'Tiktok'},
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconItem}>
              <View style={[styles.iconContainer, {backgroundColor: colorMode.appGray}]}>
                <item.icon width={28} height={28} />
              </View>
              <TText style={styles.titleIcon}>{item.title}</TText>
            </TouchableOpacity>
          ))}
        </ScrollView>
    )
})
const styles = StyleSheet.create({
    iconItem:{
      width:70,
      alignItems:'center'
    },
    titleIcon:{
      fontSize:13,
      fontWeight:'bold',
      color:'black',
      textAlign:'center'
    },
    iconContainer:{
      width:50,
      height:50,
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:6
    }
})