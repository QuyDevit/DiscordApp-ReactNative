import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'

import { FlashList } from "@shopify/flash-list";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Overview from '../profile-comp/Overview';
import Display from '../profile-comp/Display';
import Account from '../profile-comp/Account';
import Nitro from '../profile-comp/Nitro';
import ViewPayment from '../profile-comp/ViewPayment';
import PaymentSuccess from '../profile-comp/PaymentSuccess';

const Stack = createNativeStackNavigator();

const ProfileScreen = React.memo((props:any) => {
  const colorMode = useAppColor();
  return (
    <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: colorMode.inverseWhiteLightGray
            },
            headerTitleStyle: {
                color: colorMode.inverseBlack
            }
        }}>
            <Stack.Screen name="Overview" options={{headerShown: false}} component={Overview} />
            <Stack.Screen name="Display" component={Display} options={{title:'Hiển thị'}}/>
            <Stack.Screen name="Account" component={Account} options={{title:'Tài khoản'}}/>
            <Stack.Screen name="Nitro" component={Nitro} options={{title:'Tài khoản'}}/>
            <Stack.Screen name="ViewPayment" component={ViewPayment} options={{title:'Thanh toán'}}/>
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} options={{headerShown:false}}/>
        </Stack.Navigator>
  )
})



export default ProfileScreen