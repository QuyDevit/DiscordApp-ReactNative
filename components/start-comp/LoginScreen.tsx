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
import { handleGoogleSignIn } from '../../shared/Reusables'
import { useAppDispatch } from '../../shared/rdx-hooks'
import { setUser } from '../../shared/userSlice'
import { TServerData, TUser } from '../../shared/types'
import firestore from '@react-native-firebase/firestore'
import { fetchUserServers, setChannelData, setServerData } from '../../shared/serverSlice'
import { showMessage, hideMessage } from "react-native-flash-message";
import LottieView from 'lottie-react-native';

const LoginScreen = React.memo(({navigation} :{navigation:any}) => {
    const [loading, setLoading] = useState(false); 
    const [success, setSuccess] = useState(false); 
    const dispatch = useAppDispatch();
    const colorMode = useAppColor();
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const checkLogin = () => {
        if (!email || !pass) {
            showMessage({
                message: "Vui lòng nhập email và mật khẩu",
                type: "warning",
                duration: 2000,
                autoHide: true,
            });
            return;
        }
        setLoading(true);
        auth().signInWithEmailAndPassword(email.trim(), pass.trim())
            .then(async (userCredential) => {
                try {
                    const userDocRef = firestore().collection('USERS').doc(userCredential.user.uid);
                    await userDocRef.set({ status: 1 }, { merge: true });
                    const userData = await userDocRef.get();
                    dispatch(setUser(userData.data() as TUser));

                    const resultAction = await dispatch(fetchUserServers(userCredential.user.uid));
                    if (fetchUserServers.fulfilled.match(resultAction)) {
                        const servers = resultAction.payload;
                        if (servers && servers.length > 0) {
                            dispatch(setServerData(servers[0]));
                            dispatch(setChannelData(servers[0].channels[0].items[0]));
                        }
                    } else {
                        throw new Error("Failed to fetch user servers");
                    }
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'App' }],
                    });
                    setSuccess(true);
                } catch (error) {
                    throw error;  // Ensure this error is caught by the outer catch
                }
            })
            .catch((error) => {
                showMessage({
                    message: "Đăng nhập thất bại. Vui lòng kiểm tra lại email và mật khẩu",
                    type: "warning",
                    duration: 2000,
                    autoHide: true,
                });
                console.error("Login error:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    };

   const handleLogin = async () => {
        try {
            const user: TUser = await handleGoogleSignIn();
            setLoading(true);
            const userDocRef = firestore().collection('USERS').doc(user.id);
            await userDocRef.set({ status: 1 }, { merge: true });
            dispatch(setUser(user));
            const resultAction = await dispatch(fetchUserServers(user.id));
                 if (fetchUserServers.fulfilled.match(resultAction)) {
                  const servers: TServerData[] = resultAction.payload;
                  if(servers.length>0){
                    dispatch(setServerData(servers?.[0]));
                    dispatch(setChannelData(servers?.[0].channels?.[0].items?.[0]));
                  }
                } else {
                  console.error("Failed to fetch user servers:", resultAction.payload);
                  // Handle the error here if needed
                }
             setSuccess(true);
            navigation.reset({
                    index: 0,
                    routes: [{ name: 'App' }],
                });
        } catch (error) {
           
        }finally{
            setLoading(false);
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
                        value={email}
                        onChangeText={setEmail}
                />
            </View>
       <View style={{marginBottom:15,position:'relative'}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Mật khẩu</TText>
                <TextInput 
                        style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                        placeholderTextColor={colorMode.textGray}
                        placeholder='Mật khẩu ...'
                        secureTextEntry={!passwordVisible} 
                        value={pass}
                        onChangeText={setPass}
                />
            <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)} >
              <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={25} color={colorMode.inverseBlack} />
            </TouchableOpacity>
        </View>
         <TouchableOpacity onPress={checkLogin} style={styles.button}>
                <TText style={styles.text}>Đăng Nhập</TText>
        </TouchableOpacity>
           <TText style={{color:colorMode.inverseBlack,fontWeight:'600',textAlign:'center',marginTop:20,fontSize:16}}>Hoặc đăng nhập với</TText>
           <TouchableOpacity onPress={handleLogin} style={{marginTop:20,flexDirection:'row',alignSelf:'center',backgroundColor:colorMode.appLightGray,padding:10,alignItems:'center',borderRadius:10}}>
                <GoogleIcon width={30} height={30}/>
                <TText style={{color:colorMode.inverseBlack,marginLeft:5,fontSize:16,}}>Đăng nhập bằng Google</TText>
           </TouchableOpacity>
  {loading && !success && (
                    <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 1, justifyContent:'center', alignItems:'center'}}>
                        <LottieView source={require('../../assets/lottie/loading.json')} autoPlay loop={true} style={{width:250,height:250}}/>
                    </View>
          )}
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