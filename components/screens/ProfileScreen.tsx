import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'

import { FlashList } from "@shopify/flash-list";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Overview from '../profile-comp/Overview';
import Display from '../profile-comp/Display';
import Account from '../profile-comp/Account';

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
        </Stack.Navigator>
  )
})



export default ProfileScreen