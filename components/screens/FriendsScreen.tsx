import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import FriendIcon from '../../assets/addfriend.svg'
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
// @ts-ignore
import NewMessIcon from '../../assets/newMessage.svg'
import { FastImageRes } from '../../shared/Reusables'
import { useAppDispatch } from '../../shared/rdx-hooks'
import { setHideBottomTab } from '../../shared/rdx-slice'
import { useFocusEffect } from '@react-navigation/native';

const FriendsScreen = React.memo( (props: any) => {
    const dispatch = useAppDispatch();
  const { navigation } = props;
    const array = [1,2,3,4,5,6,7,8,9,10,11,12];
  const colorMode = useAppColor();
    const onPress = (choose:number) => () =>{
      if(choose === 0){
        navigation.navigate('AddFriend')
      }else{
        navigation.navigate('Newchat')
      }
        dispatch(setHideBottomTab(true))
    }

  useFocusEffect(
    useCallback(() => {
    dispatch(setHideBottomTab(false))
    }, [])
  );

  return (
    <View style={{backgroundColor:colorMode.inverseWhiteGray,position:'relative',flex:1}}>
      <TouchableOpacity onPress={onPress(1)} style={styles.newmessage}>
        <NewMessIcon width={30} height={30}/>
      </TouchableOpacity>
      <View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:15,paddingHorizontal:15}}>
        <TText style={{fontWeight:'bold',fontSize:20}}>Các tin nhắn</TText>
        <TouchableOpacity onPress={onPress(0)} style={{paddingHorizontal:15,paddingVertical:8,backgroundColor:colorMode.appGray,borderRadius:20,flexDirection:"row",alignItems:'center'}}>
            <FriendIcon width={16} height={16}/>
            <TText style={{fontWeight:'bold',marginLeft:5}}>Thêm bạn bè</TText>
        </TouchableOpacity>
      </View>
       <View style={{position:'relative',justifyContent:'center',marginTop:20,paddingHorizontal:15}} >
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                placeholder='Tìm kiếm bạn bè...'
            />
            <View style={{position:'absolute',left:20,top:10}}>
                <SearchIcon width={25} height={25}/>
            </View>
      </View>
  
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical:15}}>
      <TouchableOpacity style={[styles.friendItem,{backgroundColor:colorMode.appGray}]}>
             <View style={styles.imageview} >
                  <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'></FastImageRes>
              </View>
              <View style={[styles.statusIndicator,{backgroundColor: '#6A6A6A'}]} />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.friendItem,{backgroundColor:colorMode.appGray}]}>
              <View style={styles.imageview} >
                  <FastImageRes uri='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai-1.jpg'></FastImageRes>
                   
              </View>
              <View style={[styles.statusIndicator,{backgroundColor: '#55A74E'}]}  />
      </TouchableOpacity>
         <TouchableOpacity style={[styles.friendItem,{backgroundColor:colorMode.appGray}]}>
             <View style={styles.imageview} >
                  <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'></FastImageRes>
              </View>
              <View style={[styles.statusIndicator,{backgroundColor: '#6A6A6A'}]} />
      </TouchableOpacity>
         <TouchableOpacity style={[styles.friendItem,{backgroundColor:colorMode.appGray}]}>
             <View style={styles.imageview} >
                  <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'></FastImageRes>
              </View>
              <View style={[styles.statusIndicator,{backgroundColor: '#6A6A6A'}]} />
      </TouchableOpacity>
         <TouchableOpacity style={[styles.friendItem,{backgroundColor:colorMode.appGray}]}>
             <View style={styles.imageview} >
                  <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'></FastImageRes>
              </View>
              <View style={[styles.statusIndicator,{backgroundColor: '#6A6A6A'}]} />
      </TouchableOpacity>
      </ScrollView>
      </View>
      <ScrollView style={{paddingHorizontal:10}}>
        {
          array.map((item,index) =>(
            <View key={Math.floor(Math.random() *999999).toString()}>
          <TouchableOpacity style={{flexDirection:'row',padding:10,borderRadius:10,}}>
            <View style={styles.imageview} >
                  <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'></FastImageRes>
            </View>
            <View style={{justifyContent:'center',marginLeft:10,flex:1}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TText style={{fontWeight:'bold'}}>Hoàng</TText>
                <TText style={{fontWeight:'bold'}}>6 phút</TText>
              </View>
              <TText>Bạn: Xin chào</TText>
            </View>
          </TouchableOpacity>
          </View>
          ))
        }
          
            
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
    newmessage:{
      position:'absolute',
      width:50,
      height:50,
      backgroundColor:'#5E71EC',
      borderRadius:50,
      bottom:20,
      right:15,
      zIndex:10,
      justifyContent:'center',
      alignItems:'center'
    },
    friendItem:{
        paddingVertical:20,
        position:'relative',
        marginLeft:10,
        height:80,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    inputStyle:{

        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingRight:15,
        paddingLeft:45,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
    imageview:{
        width: 45,
        height: 45,
        borderRadius: 50,
        overflow:'hidden'
    },
    statusIndicator: {
      position: 'absolute',
      height: 12,
      width: 12,
      borderWidth:2,
      borderColor:'white',
      borderRadius: 50,
      bottom: 15,
      right: 22,
    },
  })

export default FriendsScreen