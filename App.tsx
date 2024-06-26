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
import useAppColor from './themed/useAppColor';
import AddGroupChatScreen from './components/screens/AddGroupChatScreen';
import AddChannel from './components/homedrawer-components/AddChannel';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeScreenStack = React.memo((props:any) =>{
  const colorMode = useAppColor();
  return(
    <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name='AddServer' component={AddServer} options={{headerShown:false,}}/>
        <Stack.Screen name='AddChannel' component={AddChannel} options={{title:'Thêm kênh',headerStyle:{backgroundColor:colorMode.inverseWhiteGray,},headerTintColor :colorMode.inverseBlack}}/>
        <Stack.Screen name='JoinServer' component={JoinServer} options={{title:'',headerStyle:{backgroundColor:colorMode.inverseWhiteGray,},headerTintColor :colorMode.inverseBlack}}/>
        <Stack.Screen name='AddServerStepFinal' component={AddServerStepFinal} options={{title:'',headerStyle:{backgroundColor:colorMode.inverseWhiteGray,},headerTintColor :colorMode.inverseBlack}}/>
    </Stack.Navigator>
  )
})
const FriendScreenStack = React.memo((props:any) =>{
    const colorMode = useAppColor();
  return(
    <Stack.Navigator initialRouteName='FriendsScreen'>
        <Stack.Screen name='Friends' component={FriendsScreen} options={{headerShown:false}}/>
        <Stack.Screen name='Newchat' component={NewchatScreen} options={{title:'Tin nhắn mới',headerStyle:{backgroundColor:colorMode.inverseWhiteGray,},headerTintColor :colorMode.inverseBlack}}/>
        <Stack.Screen name='RoomChat' component={RoomChatScreen} options={{title:'',headerStyle:{backgroundColor:colorMode.inverseWhiteGray,},headerTintColor :colorMode.inverseBlack}}/>
        <Stack.Screen name='AddFriend' component={AddFriendScreen} options={{title:'Thêm bạn bè',headerTitleAlign:'center',headerStyle:{backgroundColor:colorMode.inverseWhiteGray,},headerTintColor :colorMode.inverseBlack}}/>
        <Stack.Screen name='AddGroup' component={AddGroupChatScreen} options={{title:'Tạo nhóm chat',headerTitleAlign:'center',headerStyle:{backgroundColor:colorMode.inverseWhiteGray,},headerTintColor :colorMode.inverseBlack}}/>
    </Stack.Navigator>
  )
})

const App = React.memo((): React.JSX.Element  =>{
  const colorMode = useAppColor();
  const isDarkMode = useColorScheme() === 'dark';
  const safeAreaBg = useAppSelector(state => state.main.safeAreabg);
  const user = useAppSelector(state => state.user.currentUser);
    const defaultUri:string = 'https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png';
    const userUri:string = user?.avatart || defaultUri;
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
            tabBarLabel:'Thông báo',
            headerTitleAlign:'center',
            headerStyle:{backgroundColor:colorMode.appLightGray,},
            headerTitleStyle:{color:colorMode.inverseBlack},
            title:'Các thông báo'
          }} 
        />
        <Tab.Screen 
          name="ProfileScreen" 
          component={ProfileScreen} 
          options={{
            headerShown:false,
            tabBarIcon: (props) => (
              <View style={{ width: 25, height: 25, borderRadius: 50, overflow:'hidden' }} >
                  <FastImageRes uri={userUri} ></FastImageRes>
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
