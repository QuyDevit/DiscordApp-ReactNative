import { View, Text, ScrollView, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor';
import DatePicker from 'react-native-date-picker'
import Icon from 'react-native-vector-icons/FontAwesome';

const RegisterScreen = React.memo((props:any) => {

  const colorMode = useAppColor();
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
        <TText style={{color:colorMode.inverseBlack,fontWeight:'600',textAlign:'center',marginTop:20,fontSize:28}}>Đăng ký</TText>
        <View style={{paddingHorizontal:15,marginTop:30}}>
            <View style={{marginBottom:15}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Họ và tên</TText>
                <TextInput 
                        style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                        placeholderTextColor={colorMode.textGray}
                        placeholder='Họ và tên ...'
                />
            </View>
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
             <View style={{marginBottom:15}}>
                <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginBottom:5}}>Số điện thoại</TText>
                <TextInput 
                        style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                        placeholderTextColor={colorMode.textGray}
                        placeholder='Số điện thoại ...'
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
            <TouchableOpacity style={styles.button}>
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