import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { FastImageRes, userLogout } from '../../shared/Reusables'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import HashWithBg from '../../assets/badgeOriginallyKnownAs.svg'
// @ts-ignore
import NitroIcon from '../../assets/userLimitedToNitro.svg'
// @ts-ignore
import AngleRightIcon from '../../assets/angle-right.svg';
// @ts-ignore
import IconUser from '../../assets/iconUser.svg';
// @ts-ignore
import PenIcon from '../../assets/guildEditServerProfile.svg';
// @ts-ignore
import ChatGiftIcon from '../../assets/chatGiftNitro.svg';
// @ts-ignore
import AppearanceIcon from '../../assets/appearance.svg';
// @ts-ignore
import InforIcon from '../../assets/guildInfo.svg';
// @ts-ignore
import SecurityIcon from '../../assets/security.svg';
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks'
import { setHideBottomTab } from '../../shared/rdx-slice'
import { useFocusEffect } from '@react-navigation/native'

const Overview = React.memo((props:any) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user.currentUser);
    const defaultUri:string = 'https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png';
    const userUri:string = user?.avatart || defaultUri;
      const colorMode = useAppColor();
    useFocusEffect(
      useCallback(() => {
        dispatch(setHideBottomTab(false))
    }, [dispatch])
  );
  useEffect(() =>{
    if(user === null){
      props.navigation.navigate('LoginScreen')
    }
  },[user])

  const logout = userLogout();

    
  return (
   <ScrollView style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
        <View style={{height:230,width:'100%',backgroundColor:colorMode.balanced_blue}}/>
          <View style={{flexDirection:'row',paddingHorizontal:20,alignItems:'flex-end',justifyContent:'space-between',paddingTop:60,marginBottom:20}}>
              <View style={{alignItems:'center',position:'relative'}}>
                <View style={{padding:10,backgroundColor:colorMode.inverseWhiteLightGray,width:120,height:120,borderRadius:70,position:'absolute',top:-120,left:0}}>
                  <View style={{width:100,height:100,borderRadius:50,overflow:'hidden'}}>
                      <FastImageRes uri={userUri} />
                  </View>
                </View>
                <View style={{paddingLeft:10}}>
                    <TText style={{fontSize:30,color:colorMode.inverseBlack,fontWeight:'bold'}}>{user?.name}</TText>
                    <TText>{user?.hashtagname}</TText>
                </View>
              </View>
              <TouchableOpacity style={{height:40,width:55,borderRadius:20,backgroundColor:colorMode.appGray,justifyContent:'center',alignItems:'center'}}>
                  <HashWithBg width={30} height={30}/>
              </TouchableOpacity>
    
        </View>

       <View style={{backgroundColor: colorMode.appLightGray, height: 70, justifyContent: 'flex-end', paddingVertical: 10, paddingHorizontal: 10}}>
            <TText style={{color: colorMode.inverseBlack,fontWeight:'bold',fontSize:16}}>Cài đặt tài khoản</TText>
         </View>
        <ListComp title='Lấy Nitro' icon={<NitroIcon  width={35} height={35} />} />
        <ListComp callbackFn={() =>  {props.navigation.navigate('Account');dispatch(setHideBottomTab(true))}} title='Tài khoản' icon={<IconUser  width={30} height={30} style={{opacity:.8}}/>} />
        <ListComp title='Thông tin' icon={<PenIcon  width={30} height={30} style={{opacity:.8}}/>} />
        <ListComp title='Bảo vệ tài khoản' icon={<SecurityIcon  width={30} height={30}/>} />
           <View style={{backgroundColor: colorMode.appLightGray, height: 70, justifyContent: 'flex-end', paddingVertical: 10, paddingHorizontal: 10}}>
            <TText style={{color: colorMode.inverseBlack,fontWeight:'bold',fontSize:16}}>Cài đặt ứng dụng</TText>
         </View>
        <ListComp callbackFn={() => {props.navigation.navigate('Display');dispatch(setHideBottomTab(true))}} title='Hiển thị' icon={<AppearanceIcon  width={30} height={30} style={{opacity:.8}}/>} />
         <View style={{backgroundColor: colorMode.appLightGray, height: 70, justifyContent: 'flex-end', paddingVertical: 10, paddingHorizontal: 10}}>
            <TText style={{color: colorMode.inverseBlack,fontWeight:'bold',fontSize:16}}>Cài đặt thanh toán</TText>
         </View>
        <ListComp title='Tặng Nitro' icon={<ChatGiftIcon  width={30} height={30} style={{opacity:.9}}/>} />
        <ListComp title='Hỗ trợ' icon={<InforIcon  width={30} height={30} style={{opacity:.8}}/>} />

         <TouchableOpacity onPress={logout} style={{alignItems:'center',paddingVertical:15}}>
            <TText style={{fontSize:18,color:'red',fontWeight:'600'}}>Đăng Xuất</TText>
         </TouchableOpacity>

    </ScrollView>
  )
})

const ListComp = React.memo(({title,icon,callbackFn}:{title :string,icon:any,callbackFn?:Function}) =>{
    const colorMode = useAppColor();
  return (
     <TouchableOpacity onPress={() => callbackFn?.()}  style={{flexDirection:'row',alignItems:'center',marginHorizontal:10,paddingVertical:10,paddingHorizontal:10,borderRadius:15,borderBottomWidth:1,borderColor:'lightgray'}}>
          <View>
              {icon}
          </View>
          <View style={{flexDirection:'row',marginLeft:20,justifyContent:'space-between',flex:1,alignItems:'center'}}>
              <TText style={{fontSize:18,color:colorMode.inverseBlack,fontWeight:'600'}}>
                {title}
              </TText>
              <AngleRightIcon  width={30} height={30}/>
          </View>
     </TouchableOpacity>
  )
})

export default Overview