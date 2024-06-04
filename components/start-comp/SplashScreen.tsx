import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LottieView from 'lottie-react-native';
import useAppColor from '../../themed/useAppColor';
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore'
import { TServerData, TUser } from '../../shared/types';
import { useAppDispatch } from '../../shared/rdx-hooks';
import { setUser } from '../../shared/userSlice';
import { fetchUserServers, setChannelData, setServerData } from '../../shared/serverSlice';

const SplashScreen = React.memo(({ navigation }: { navigation: any }) => {
      const dispatch = useAppDispatch();
      const animationRef = useRef<LottieView>(null);
      const onAuthStateChanged = async (user:any) => {
        if (user) {
           const userDocRef = firestore().collection('USERS').doc(user.uid);
            try {
              const userDoc = await userDocRef.get();
              if (userDoc.exists) {
                const newUser: TUser = {
                  id: user.uid,
                  name: userDoc.data()?.name,
                  hashtagname: userDoc.data()?.hashtagname, 
                  email: userDoc.data()?.email,
                  pass: userDoc.data()?.pass, 
                  phone: userDoc.data()?.phone,
                  birthday: userDoc.data()?.birthday, 
                  avatart:  userDoc.data()?.avatart,
                  status: 1,
                  listfriend:userDoc.data()?.listfriend
                };
                await userDocRef.set({ status: 1 }, { merge: true });
                dispatch(setUser(newUser));
                const resultAction = await dispatch(fetchUserServers(user.uid));
                 if (fetchUserServers.fulfilled.match(resultAction)) {
                  const servers: TServerData[] = resultAction.payload;
                  if(servers.length>0){
                    dispatch(setServerData(servers?.[0]));
                    dispatch(setChannelData(servers?.[0].channels?.[0].items?.[0]));
                  }
                } else {
                  console.error("Failed to fetch user servers:", resultAction.payload);
                }
                navigation.navigate('App'); 
              } 
            } catch (error) {
              console.error("Lỗi khi truy xuất dữ liệu từ Firestore:", error);
              navigation.navigate('StartScreen');
            }
        }else {
          navigation.navigate('StartScreen');
        }
    };
  useEffect(() => {
    // Điều hướng sau khi animation kết thúc
    animationRef.current?.play();
    const timer = setTimeout(() => {
      onAuthStateChanged(auth().currentUser)
    }, 500);

    // Clear timeout nếu component bị unmounted
    return () => clearTimeout(timer);
  }, [navigation]);
  const colorMdoe = useAppColor();

  return (
    <View style={{flex:1,backgroundColor:colorMdoe.inverseWhite,justifyContent:'center',alignItems:'center'}}>
      <LottieView source={require('../../assets/lottie/splash.json')} autoPlay loop={false}
        style={{width:200,height:200}}/>
    </View>
  )
})

export default SplashScreen