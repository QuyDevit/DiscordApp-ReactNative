import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { TText } from '../../themed/themeComponents';
import useAppColor from '../../themed/useAppColor';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { showMessage, hideMessage } from "react-native-flash-message";
import { generateUniqueHashtagName } from '../../shared/Reusables';
import { TUser } from '../../shared/types';

const RegisterScreen = React.memo((props:any) => {

  const colorMode = useAppColor();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [phone, setPhone] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const USER = firestore().collection("USERS");
    const isNumeric = (value: string) => {
        return /^\d+$/.test(value);
    };
    const hasError = () => {
        return pass.length ===0 || !email.includes("@") || name.length === 0 || phone.length === 0;
    };

  const handleRegister = async () =>{
    if( pass.length < 6){
         showMessage({
                    message: "Mật khẩu phải 6 ký tự trở lên",
                    type: "warning",
                    duration: 2000,
                    autoHide: true,
                });
        return
    }
    if( !email.includes("@")){
         showMessage({
                    message: "Vui lòng nhập đúng định dạng email",
                    type: "warning",
                    duration: 2000,
                    autoHide: true,
                });
        return
    }
    if(  phone.length !== 10 || !isNumeric(phone)){
         showMessage({
                    message: "Số điện thoại phải bao gồm 10 chữ số",
                    type: "warning",
                    duration: 2000,
                    autoHide: true,
                });
        return
    }
    USER.where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {
                auth().createUserWithEmailAndPassword(email, pass)
                    .then((userCredential) => {
                        const userId = userCredential.user.uid;
                         const newUser: TUser = {
                            id: userId,
                            name: name,
                            email: email,
                            hashtagname:generateUniqueHashtagName(name),
                            pass: pass, 
                            phone: phone,
                            birthday: date.toLocaleDateString(), 
                            avatart:'https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png',
                            status:1,
                            listfriend:[],
                            nitro:false
                        };
                        USER.doc(userId).set(
                            newUser
                        ).then(() => {
                            props.navigation.navigate('LoginScreen');
                            showMessage({
                                message: "Tạo tài khoản thành công",
                                type: "success",
                                duration: 3000,
                                autoHide: true,
                            });
                        }).catch((error) => {
                            console.error("LỖI:", error);
                        });
                    })
                    .catch((error) => {
                        console.error("LỖI:", error);
                    });
            } else {
                showMessage({
                    message: "Tài khoản đã tồn tại",
                    type: "warning",
                    duration: 3000,
                    autoHide: true,
                });
            }
        })
        .catch((error) => {
            console.error("LỖI:", error);
        });
    };

  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
        <TText style={{color:colorMode.inverseBlack,fontWeight:'600',textAlign:'center',marginTop:20,fontSize:28}}>Đăng ký</TText>
        <View style={{paddingHorizontal:15,marginTop:15}}>
            <View style={{marginBottom:15}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Họ và tên</TText>
                <TextInput 
                        style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                        placeholderTextColor={colorMode.textGray}
                        placeholder='Họ và tên ...'
                        value={name}
                        onChangeText={setName}
                />
            </View>
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
             <View style={{marginBottom:15}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Số điện thoại</TText>
                <TextInput 
                        style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                        placeholderTextColor={colorMode.textGray}
                        placeholder='Số điện thoại ...'
                        value={phone}
                        onChangeText={setPhone}
                />
            </View>
             <View style={{marginBottom:15}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Ngày sinh</TText>
                 <TouchableOpacity
                    style={[styles.inputStyle, { backgroundColor: colorMode.appLightGray, justifyContent: 'center' }]}
                    onPress={() => setOpen(true)}
                >
                    <TText style={{ color: date ? colorMode.inverseBlack : colorMode.textGray }}>
                    {date ? date.toLocaleDateString() : 'Ngày sinh ...'}
                    </TText>
                </TouchableOpacity>
                <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode='date'
                        onConfirm={(date) => {
                        setOpen(false)
                        setDate(date)
                        }}
                        onCancel={() => {
                        setOpen(false)
                        }}
                    />
            </View>
            <TouchableOpacity onPress={handleRegister} disabled={hasError()} style={[styles.button,{opacity:hasError() ? 0.5 : 1 }]}>
                <TText style={styles.text}>Đăng ký</TText>
            </TouchableOpacity>
        </View>
    </View>
  )
})
const styles = StyleSheet.create({
    inputStyle:{
        height:55,
        borderBottomWidth:0,
        borderRadius:12,
        paddingHorizontal:15,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    } 
    ,button: {
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
     icon:{
        position:'absolute',
        right:12,
        bottom:15,
    }
})

export default RegisterScreen