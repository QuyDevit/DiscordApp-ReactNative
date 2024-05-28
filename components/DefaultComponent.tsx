import { View, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { store } from '../shared/store'
import App from '../App'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './start-comp/SplashScreen'
import StartScreen from './start-comp/StartScreen'
import LoginScreen from './start-comp/LoginScreen'
import RegisterScreen from './start-comp/RegisterScreen'
import FlashMessage from "react-native-flash-message";

const Stack = createNativeStackNavigator();

const DefaultComponent = React.memo((props: any) => {
  return (
    <Provider store={store}>
      <NavigationContainer>
         <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name='App' component={App} options={{headerShown:false}}/>
        <Stack.Screen name='SplashScreen' component={SplashScreen} options={{headerShown:false,}}/>
        <Stack.Screen name='StartScreen' component={StartScreen} options={{headerShown:false,}}/>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{title:"",}}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{title:"",}} />
      </Stack.Navigator>
      </NavigationContainer>   
       <FlashMessage position="top" />    
    </Provider>
  )
})

export default DefaultComponent