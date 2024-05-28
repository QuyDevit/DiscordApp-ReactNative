import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ShareApp } from '../../shared/Reusables'
import useAppColor from '../../themed/useAppColor'
import { TText } from '../../themed/themeComponents'
import firestore from '@react-native-firebase/firestore'
import { useAppSelector } from '../../shared/rdx-hooks'
import { TNotification } from '../../shared/types'
import { showMessage } from "react-native-flash-message";

const AddFriendScreen = React.memo((props:any) => {
   const user = useAppSelector(state => state.user.currentUser);
    const [name,setName] = useState('');
    const hasErrorName = () => name.length < 1;
    const colorMode = useAppColor();
    const addFriends = async () =>{
      try {
        const notificationRef = firestore().collection('NOTIFICATIONS');
        const userRef = firestore().collection('USERS');
        const recipientHashtagName = name; 

        const userSnapshot = await userRef.where('hashtagname', '==', recipientHashtagName).get();
       if (userSnapshot.empty) {

      showMessage({
        message: "Không tìm thấy người dùng này!",
        type: "danger",
        duration: 2000,
        autoHide: true,
        style: { justifyContent: 'center', alignItems: 'center' }
      });
    } else {
      const notificationData: TNotification = {
        id: '',
        from: user!, 
        checkread: false, 
        to: recipientHashtagName, 
        notificationAt: Date.now(), 
      };

      const docRef = await notificationRef.add(notificationData);
      const notificationId = docRef.id;
      await docRef.update({ id: notificationId });
      setName('');
      showMessage({
        message: "Gửi kết bạn thành công!",
        type: "success",
        duration: 3000,
        autoHide: true,
        style: { justifyContent: 'center', alignItems: 'center' }
      });
    }
      } catch (error) {
        console.error('Lỗi khi gửi yêu cầu kết bạn: ', error);
      }
    }
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray,justifyContent:'space-between'}}>
        <View>
             <ShareApp/>
             <TText style={{textAlign:'center',fontWeight:'bold',fontSize:24,marginTop:10,color:colorMode.inverseBlack}}>Thêm bằng tên người dùng</TText>
             <View style={{paddingHorizontal:15,marginTop:20,justifyContent:'space-around',flexDirection:'column'}}>
                   
                    <TText style={{fontWeight:'bold'}}>Bạn muốn thêm ai làm bạn bè?</TText>

                    <View style={{position:'relative',justifyContent:'center',marginTop:10}} >
                            <TextInput 
                                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                                placeholderTextColor={colorMode.textGray}
                                value={name}
                                onChangeText={(text)=>setName(text)}
                                placeholder='Nhập tên người dùng...'
                            />
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TText style={{fontWeight:'bold',fontSize:12}}>À nhân tiện tên người dùng của bạn là </TText>
                        <TText style={{fontWeight:'bold',fontSize:12,color:colorMode.inverseBlack}}>nquy. </TText>
                    </View>            
             </View>
        </View>
        <TouchableOpacity disabled={hasErrorName()} onPress={addFriends} style={{paddingVertical:15,backgroundColor:"#5E71EC",borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20,marginHorizontal:15,opacity: !hasErrorName() ? 1: .6 }}>
            <TText style={{color:'white',fontWeight:'bold'}}>Gửi yêu cầu kết bạn</TText>
        </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
    inputStyle:{
        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingHorizontal:10,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
  })

export default AddFriendScreen