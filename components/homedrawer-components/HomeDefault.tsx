import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
// @ts-ignore
import HashTagIcon from '../../assets/channelText.svg'
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
// @ts-ignore
import UserIcon from '../../assets/users.svg'
// @ts-ignore
import BarsIcon from '../../assets/bars.svg'
import useAppColor from '../../themed/useAppColor'
import { useIsFocused } from '@react-navigation/native'
import { useAppDispatch } from '../../shared/rdx-hooks'
import { setHideBottomTab } from '../../shared/rdx-slice'
import ChatBox from './ChatBox'
import WelcomeMessage from './WelcomeMessage'
import { FlashList } from '@shopify/flash-list'
import MessageBox from './MessageBox'

const HomeDefault = React.memo((props: any) =>{
     const colorMode = useAppColor();
     const isFocused = useIsFocused();
     const dispatch = useAppDispatch();
     useEffect(()=> {
        if(isFocused){
            // dispatch(setHideBottomTab(true));
        }
     },[isFocused])
    return(
        <View style={[styles.mainStyle,{backgroundColor:colorMode.inverseWhiteGray,flex:1}]}>
            <HomeDefaultHeader navigation={props.navigation}/>
            <View style={{flex:1}}>
                <FlatList
                    data={[{}]}
                    contentContainerStyle={{flexDirection:'column-reverse',height:'100%'}}
                    renderItem={({ item }) => 
                        <>
                            <WelcomeMessage/>
                            <MessageBox/>
                        </>
                    }
                />
        
            </View>
            <ChatBox />
        </View>
    )
})

const HomeDefaultHeader = React.memo(({navigation} : {navigation:any}) =>{
    const isFocused = useIsFocused();  
    const colorMode = useAppColor();
     useEffect(()=> {
        if(isFocused){
            navigation.openDrawer()
        }
     },[isFocused])
    return (
        <View style={[styles.titleChanel,{backgroundColor:colorMode.inverseWhiteLightGray,}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{marginLeft:14,marginRight:8}} onTouchEnd={() => navigation.openDrawer()}>
                    <BarsIcon width={20} height={20}></BarsIcon>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',marginLeft:12}}>
                    <HashTagIcon width={25} height={25}/>
                    <TText fontFamily='bold' style={{fontWeight:'bold', marginLeft:5,color:colorMode.inverseBlack,fontSize:16}} numberOfLines={1}>chào-mừng-bạn</TText>
                </View>
            </View>
         

            <View style={{flexDirection:'row',alignItems:'center',paddingRight:15}}>
                  <SearchIcon width={25} height={25} style={{marginRight:10}}/>
                  <UserIcon width={25} height={25}/>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    mainStyle:{

    },
    titleChanel:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        borderBottomWidth:.5,
        borderColor:'lightgray'
    }
})

export default HomeDefault