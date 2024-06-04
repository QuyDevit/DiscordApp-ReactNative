import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import useAppColor from '../../themed/useAppColor'
import { TText } from '../../themed/themeComponents';
import DatePicker from 'react-native-date-picker';
import { FastImageRes } from '../../shared/Reusables';
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks';
// @ts-ignore
import UploadIcon from '../../assets/uploadImageblack.svg'
import ImagePicker from 'react-native-image-crop-picker';
import LottieView from 'lottie-react-native';
import { showMessage } from "react-native-flash-message";
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { isValid, parse } from 'date-fns';
import { TUser } from '../../shared/types';
import { setUser } from '../../shared/userSlice';

const Account = React.memo((props:any) => {
    const user = useAppSelector(state => state.user.currentUser);
    const defaultUri:string = 'https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png';
    const userUri:string = user?.avatart || defaultUri;
    const [dateuser, setDateUser] = useState(user?.birthday )
    const [date, setDate] = useState(new Date )
    const [open, setOpen] = useState(false)
    const [ischange, setIsChange] = useState(false)
    const [name, setName] = useState(user?.name)
    const [email, setEmail] = useState(user?.email)
    const [phone, setPhone] = useState(user?.phone!)
    const colorMode = useAppColor();
    const [pathImage,setPathImage] = useState('');
    const [loading, setLoading] = useState(false); 
    const [success, setSuccess] = useState(false); 
    const dispatch = useAppDispatch();

    const upLoadImage = () =>{
        ImagePicker.openPicker({
        cropping:true,
        mediaType:'photo'
        })
        .then(image => setPathImage(image.path))
        .catch(e => console.log(e.message))
    }
    const isNumeric = (value: string) => {
        return /^\d+$/.test(value);
    };
    const updateProfile = async() =>{
        if(  phone.length !== 10 || !isNumeric(phone)){
            showMessage({
                        message: "Số điện thoại phải bao gồm 10 chữ số",
                        type: "warning",
                        duration: 2000,
                        autoHide: true,
                    });
            return
        }
        const userDocRef = firestore().collection('USERS').doc(user?.id!);
        if (pathImage) {
            setLoading(true);
            const fileName = `${Date.now()}.jpg`;
            const imageRef = storage().ref('users/').child(fileName);
            await imageRef.putFile(pathImage);
            const downloadUrl = await imageRef.getDownloadURL();
            const updateuser ={
                birthday:date.toLocaleDateString(),
                avatart:downloadUrl,
                name:name,
                phone:phone
            }            
            await userDocRef.update(updateuser);
            const userData = await userDocRef.get();
            dispatch(setUser(userData.data() as TUser));
            setLoading(false);
            setSuccess(true);
            showMessage({
                message: "Cập nhật thành công",
                type: "success",
                duration: 3000, 
                autoHide: true,
                style: { justifyContent: 'center', alignItems: 'center' }
            });
      }else{
            const updateuser ={
                birthday:date.toLocaleDateString(),
                name:name,
                phone:phone
            }
            await userDocRef.update(updateuser);
            const userData = await userDocRef.get();
            dispatch(setUser(userData.data() as TUser));
             showMessage({
                message: "Cập nhật thành công",
                type: "success",
                duration: 3000, 
                autoHide: true,
                style: { justifyContent: 'center', alignItems: 'center' }
            });
      }
 
    }
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray,paddingHorizontal:15}}>
         {loading && !success && (
                    <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 1, justifyContent:'center', alignItems:'center'}}>
                        <LottieView source={require('../../assets/lottie/loading.json')} autoPlay loop={true} style={{width:250,height:250}}/>
                    </View>
          )}
        <TouchableOpacity onPress={updateProfile}  style={{position:'absolute',bottom:0,left:0,right:0, paddingVertical:15,backgroundColor:"#5E71EC",marginHorizontal:15,borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20}}>
            <TText style={{color:'white',fontWeight:'bold'}}>Cập nhật</TText>
        </TouchableOpacity>
        <TouchableOpacity onPress={upLoadImage} style={{width:85,height:85,alignSelf:'center',marginTop:10}}>
            <View style={{width:80,height:80,borderRadius:50,overflow:'hidden'}}>
                <FastImageRes uri={pathImage==''? userUri:pathImage} />
            </View>
            <View style={{position:'absolute',bottom:0,right:10,height:25,width:25,borderRadius:50,backgroundColor:'white',justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#EAEAEA'}}>
                <UploadIcon width={15} height={15} style={{opacity:.9}}/>
            </View>
       </TouchableOpacity>
      <TText style={{marginTop:20,fontWeight:'600',fontSize:18,color:colorMode.inverseBlack}}>Thông Tin Cá Nhân</TText>
      <View style={{backgroundColor:'#F1F4F6',paddingHorizontal:15,paddingVertical:20,borderRadius:15,marginTop:10}}>
        <TText style={{fontWeight:'600',fontSize:16,color:colorMode.inverseBlack}}>Tên hiển thị</TText>
        <TextInput 
                style={[styles.inputStyle]}
                placeholderTextColor={colorMode.textGray}
                value={name}
                onChangeText={setName}
            />
        <TText style={{fontWeight:'600',fontSize:16,color:colorMode.inverseBlack}}>Email</TText>
        <TextInput 
                style={[styles.inputStyle]}
                placeholderTextColor={colorMode.textGray}
                readOnly
                value={email}
            />
        <TText style={{fontWeight:'600',fontSize:16,color:colorMode.inverseBlack}}>Điện thoại</TText>
        <TextInput 
                style={[styles.inputStyle]}
                placeholderTextColor={colorMode.textGray}
                value={phone}
                onChangeText={setPhone}
            />
             <TText style={{fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack}}>Ngày sinh</TText>
                 <TouchableOpacity
                    style={[styles.inputStyle, { backgroundColor: '#EFF0F1', justifyContent: 'center' }]}
                    onPress={() => setOpen(true)}
                >
                    <TText style={{ color: date ? colorMode.inverseBlack : colorMode.textGray }}>
                    {ischange? date.toLocaleDateString(): dateuser}
                    </TText>
                    <TouchableOpacity onPress={() => setOpen(true)} style={{position:'absolute',right:15,backgroundColor:'#D8D9DA',paddingHorizontal:10,paddingVertical:5,borderRadius:5}}>
                        <TText style={{color:"black"}}>Đổi</TText>
                    </TouchableOpacity>
                </TouchableOpacity>
                <DatePicker
                        modal
                        open={open}
                        date={date}
                        mode='date'
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            setIsChange(true)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                />
      </View>
    </View>
  )
})

export default Account

const styles = StyleSheet.create({
    inputStyle:{
        height:45,
        borderRadius:12,
        paddingRight:15,
        paddingLeft:20,
        fontSize:15,
        fontFamily:'ggsans-Regular',
        borderWidth:1,
        borderColor:'#DEE1E3',
        marginVertical:10,
        marginTop:10
    }
})