import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
// @ts-ignore
import HashTagIcon from '../../assets/channelText.svg'
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
// @ts-ignore
import UserIcon from '../../assets/users.svg'
// @ts-ignore
import BackIcon from '../../assets/back.svg'
// @ts-ignore
import SpeakerIcon from '../../assets/speaker.svg';
import useAppColor from '../../themed/useAppColor'
import { useIsFocused } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks'
import { setHideBottomTab, setOpenRightDrawer } from '../../shared/rdx-slice'
import ChatBox from './ChatBox'
import WelcomeMessage from './WelcomeMessage'
import { FlashList } from '@shopify/flash-list'
import MessageBox from './MessageBox'

const HomeDefault = React.memo((props: any) =>{
     const colorMode = useAppColor();

     const isFocused = useIsFocused();

     useEffect(()=> {
        if(isFocused){
            // dispatch(setHideBottomTab(true));
        }
     },[isFocused])
    return(
        <View style={[styles.mainStyle,{backgroundColor:colorMode.inverseWhiteGray,flex:1}]}>
            <HomeDefaultHeader navigation={props.navigation}/>
            <ScrollView style={{flex:1,flexDirection:'column'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                <WelcomeMessage/>
                <MessageBox/>
            </ScrollView>
            <ChatBox />
        </View>
    )
})

const HomeDefaultHeader = React.memo(({navigation} : {navigation:any}) =>{
    const isFocused = useIsFocused();  
    const colorMode = useAppColor();
    const channel = useAppSelector(state => state.server.channelData);
    const dispatch = useAppDispatch()
     useEffect(()=> {
        if(isFocused){
            navigation.openDrawer()
        }
     },[isFocused])
    return (
        <View style={[styles.titlechannel,{backgroundColor:colorMode.inverseWhiteLightGray,}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{marginLeft:14,marginRight:8}} onTouchEnd={() => navigation.openDrawer()}>
                    <BackIcon width={25} height={25}></BackIcon>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',marginLeft:12}}>
                    {
                        channel?.type === 'text' ?
                         <HashTagIcon width={25} height={25}/>:
                         <SpeakerIcon width={25} height={25}/>
                    }
                    <TText fontFamily='bold' style={{fontWeight:'bold', marginLeft:5,color:colorMode.inverseBlack,fontSize:16}} numberOfLines={1}>{channel?.title}</TText>
                </View>
            </View>
         
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity style={{justifyContent:'center',marginRight:10,backgroundColor:'#ccc',height:32,width:32,borderRadius:50}}>
                  <SearchIcon width={22} height={22} style={{alignSelf:'center'}}/>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=>dispatch(setOpenRightDrawer(true))} style={{justifyContent:'center',alignItems:'center',marginRight:15,backgroundColor:'#ccc',height:32,width:32,borderRadius:50}}>
                  <UserIcon  width={22} height={22}/>
             </TouchableOpacity>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    mainStyle:{

    },
    titlechannel:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        borderBottomWidth:.5,
        borderColor:'lightgray'
    }
})

export default HomeDefault