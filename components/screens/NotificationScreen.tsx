
import { View, Text, TouchableOpacity, Button } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useAppColor from '../../themed/useAppColor';
import Notification from '../notification-comp/Notification';
import Request from '../notification-comp/Request';

const Tab = createMaterialTopTabNavigator();

const NotificationScreen = React.memo((props:any) => {
  const colorMode = useAppColor()
  return (
     <Tab.Navigator screenOptions={{
                tabBarStyle: {
                    backgroundColor: colorMode.inverseWhiteLightGray,
                },
                tabBarLabelStyle: {
                    color: colorMode.inverseBlack
                }
            }}>
                <Tab.Screen name="Notification" component={Notification} options={{title:'Thông báo'}}/>
                <Tab.Screen name="Request" component={Request} options={{title:'Yêu cầu'}}/>
            </Tab.Navigator>
  )
})

export default NotificationScreen