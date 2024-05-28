import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import CancelIcon from '../../assets/guildSearchCancelWhite.svg'
// @ts-ignore
import GoogleIcon from '../../assets/icongg.svg'
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from "@react-native-firebase/auth"
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { handleGoogleSignIn } from '../../shared/Reusables'
import { useAppDispatch } from '../../shared/rdx-hooks'
import { setUser } from '../../shared/userSlice'
import { TUser } from '../../shared/types'
import firestore from '@react-native-firebase/firestore'

const LoginScreen = React.memo(({navigation} :{navigation:any}) => {
    const dispatch = useAppDispatch();
    const colorMode = useAppColor();
    const [passwordVisible, setPasswordVisible] = useState(false);

   const handleLogin = async () => {
        try {
            const user: TUser = await handleGoogleSignIn();
            dispatch(setUser(user));
            navigation.navigate('App')
        } catch (error) {
            console.log(error)
        }
    };

  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray,paddingHorizontal:15}}>
         <TText style={{color:colorMode.inverseBlack,fontWeight:'600',textAlign:'center',marginTop:20,fontSize:28}}>Đăng Nhập</TText>
          <View style={{marginBottom:15}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Email</TText>
                <TextInput 
                        style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                        placeholderTextColor={colorMode.textGray}
                        placeholder='Email ...'
                />
            </View>
       <View style={{marginBottom:15,position:'relative'}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Mật khẩu</TText>
                <TextInput 
                        style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                        placeholderTextColor={colorMode.textGray}
                        placeholder='Mật khẩu ...'
                        secureTextEntry={!passwordVisible} 
                />
            <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)} >
              <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={25} color={colorMode.inverseBlack} />
            </TouchableOpacity>
        </View>
         <TouchableOpacity style={styles.button}>
                <TText style={styles.text}>Đăng Nhập</TText>
        </TouchableOpacity>
           <TText style={{color:colorMode.inverseBlack,fontWeight:'600',textAlign:'center',marginTop:20,fontSize:16}}>Hoặc đăng nhập với</TText>
           <TouchableOpacity onPress={handleLogin} style={{marginTop:20,flexDirection:'row',alignSelf:'center',backgroundColor:colorMode.appLightGray,padding:10,alignItems:'center',borderRadius:10}}>
                <GoogleIcon width={30} height={30}/>
                <TText style={{color:colorMode.inverseBlack,marginLeft:5,fontSize:16,}}>Đăng nhập bằng Google</TText>
           </TouchableOpacity>

    </View>
  )
})

const styles = StyleSheet.create({
    inputStyle:{
        height:55,
        borderBottomWidth:0,
        borderRadius:12,
        paddingLeft:15,
        paddingRight:35,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
    iconDeleteValue:{
        position:'absolute',
        right:12,
        width:24,
        height:24,
         borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray'
    },
     icon:{
        position:'absolute',
        right:12,
        bottom:15,
    },button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 25,
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
})

export default LoginScreen