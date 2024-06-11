import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { WebView } from 'react-native-webview';
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks';
import firestore from '@react-native-firebase/firestore'
import { TUser } from '../../shared/types';
import { setUser } from '../../shared/userSlice';

const ViewPayment = React.memo(({ route, navigation }:{route :any,navigation:any}) => {
  const user = useAppSelector(state=>state.user.currentUser);
  const { orderUrl,paymentmethod } = route.params;
  const dispatch = useAppDispatch();
  const handleNavigationStateChange = async(event: any) => {
    const url = event.url;
    let status
    if(paymentmethod === 0){
      status = getQueryParam(url, 'status');
      if (status === '1') {
        const userDocRef = firestore().collection('USERS').doc(user?.id);
        await userDocRef.set({ nitro: true }, { merge: true });
        const userData = await userDocRef.get();
        dispatch(setUser(userData.data() as TUser));
        navigation.navigate('PaymentSuccess',{ status: true });
      } else if (status === '0') { // Assuming '0' indicates failure
        navigation.navigate('PaymentSuccess',{ status: false });
      }
    }else if(paymentmethod === 1) {
      status = getQueryParam(url, 'resultCode');
      if (status === '0') {
        const userDocRef = firestore().collection('USERS').doc(user?.id);
        await userDocRef.set({ nitro: true }, { merge: true });
        const userData = await userDocRef.get();
        dispatch(setUser(userData.data() as TUser));
        navigation.navigate('PaymentSuccess',{ status: true });
      }else if (status === '1001') { // Assuming '0' indicates failure
      navigation.navigate('PaymentSuccess',{ status: false });
    }
    }else{
      if (url.includes('success')) {
        const userDocRef = firestore().collection('USERS').doc(user?.id);
        await userDocRef.set({ nitro: true }, { merge: true });
        const userData = await userDocRef.get();
        dispatch(setUser(userData.data() as TUser));
        navigation.navigate('PaymentSuccess',{ status: true });
    }
    }

  };

  const getQueryParam = (url: string, param: string): string | null => {
    const queryString = url.split('?')[1] || '';
    const pairs = queryString.split('&');
    const params: { [key: string]: string } = {};
    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    });
    return params[param] || null;
  };
  return (
     <WebView
      source={{ uri: orderUrl }}
      style={{ flex: 1 }}
      onNavigationStateChange={handleNavigationStateChange}
    />
  )
}
)
export default ViewPayment

const styles = StyleSheet.create({})