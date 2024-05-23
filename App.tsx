/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/screens/HomeScreen';
import FriendsScreen from './components/screens/FriendsScreen';
// @ts-ignore
import DiscordLogo from './assets/discord-logo.svg'
// @ts-ignore
import FriendsLogo from './assets/friends.svg'
// @ts-ignore
import NotificationIcon from './assets/guildNotificationSettings.svg'
// @ts-ignore
import SearchIcon from './assets/search.svg'

import { useAppSelector } from './shared/rdx-hooks';
import NotificationScreen from './components/screens/NotificationScreen';
import ProfileScreen from './components/screens/ProfileScreen';
import { FastImageRes } from './shared/Reusables';
import SearchScreen from './components/screens/SearchScreen';
import CustomTabBar from './components/CustomTabbar';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Host } from 'react-native-portalize';
import AddServer from './components/homedrawer-components/AddServer';
import JoinServer from './components/homedrawer-components/JoinServer';
import AddServerStepFinal from './components/homedrawer-components/AddServerStepFinal';
import NewchatScreen from './components/screens/NewchatScreen';
import RoomChatScreen from './components/screens/RoomChatScreen';
import AddFriendScreen from './components/screens/AddFriendScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeScreenStack = React.memo((props:any) =>{
  return(
    <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='AddServer' component={AddServer} options={{headerShown:false,}}/>
        <Stack.Screen name='JoinServer' component={JoinServer} options={{title:''}}/>
        <Stack.Screen name='AddServerStepFinal' component={AddServerStepFinal} options={{title:''}}/>
    </Stack.Navigator>
  )
})
const FriendScreenStack = React.memo((props:any) =>{
  return(
    <Stack.Navigator initialRouteName='FriendsScreen'>
        <Stack.Screen name='Friends' component={FriendsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Newchat' component={NewchatScreen} options={{title:'Tin nhắn mới',}}/>
        <Stack.Screen name='RoomChat' component={RoomChatScreen} options={{title:''}}/>
        <Stack.Screen name='AddFriend' component={AddFriendScreen} options={{title:'Thêm bạn bè',headerTitleAlign:'center'}}/>
    </Stack.Navigator>
  )
})


const App = React.memo((): React.JSX.Element  =>{
  const isDarkMode = useColorScheme() === 'dark';
  const safeAreaBg = useAppSelector(state => state.main.safeAreabg);
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={safeAreaBg}

        // backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <SafeAreaView style={{backgroundColor:'red'}}></SafeAreaView> */}
      <Host>
           <Tab.Navigator
            tabBar={(props)=> <CustomTabBar {...props}/>}
            screenOptions={{
            tabBarShowLabel: true,
          }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreenStack} 
          options={{
            tabBarIcon: (props) => <DiscordLogo width={25} height={25} />,
            headerShown: false ,
            tabBarLabel:'Máy chủ'
          }} 
        />
        <Tab.Screen 
          name="FriendsStack" 
          component={FriendScreenStack} 
          options={{
            tabBarIcon: (props) => <FriendsLogo width={25} height={25} />,
            tabBarLabel:'Bạn bè',
            headerShown:false
          }} 
        />
         <Tab.Screen 
          name="SearchScreen" 
          component={SearchScreen} 
          options={{
            tabBarIcon: (props) => <SearchIcon width={25} height={25} />,
            tabBarLabel:'Tìm kiếm'
          }} 
        />
        <Tab.Screen 
          name="NotificationScreen" 
          component={NotificationScreen} 
          options={{
            tabBarIcon: (props) => <NotificationIcon width={25} height={25} />,
            tabBarLabel:'Thông báo'
          }} 
        />
        <Tab.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} 
          options={{
            headerShown:false,
            tabBarIcon: (props) => (
              <View style={{ width: 25, height: 25, borderRadius: 50, overflow:'hidden' }} >
                  <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'></FastImageRes>
              </View>
            ),
             tabBarLabel:'Bạn'
          }} 
        />
      </Tab.Navigator>
      </Host>
    </>
  );
})

export default App;
