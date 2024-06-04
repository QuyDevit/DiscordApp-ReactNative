import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import { FastImageRes, formatTimeAgo } from '../../shared/Reusables'
import useAppColor from '../../themed/useAppColor'
import { useAppSelector } from '../../shared/rdx-hooks'
import { TNotification, TUser } from '../../shared/types'
import firestore from '@react-native-firebase/firestore'
import { showMessage } from "react-native-flash-message";

const Request = React.memo((props:any) => {
    const user = useAppSelector(state =>state.user.currentUser);
    const colorMode = useAppColor();
    const [notifications, setNotifications] = useState<TNotification[]>([]);
    useEffect(() => {
    if (user?.hashtagname) {
      const notificationRef = firestore().collection('NOTIFICATIONS')
        .where('to', '==', user.hashtagname)
        .where('type', '==', 0);

      const unsubscribe = notificationRef.onSnapshot(snapshot => {
        const fetchedNotifications = snapshot.docs.map(doc => ({
          ...doc.data(),
        })) as TNotification[];

        setNotifications(fetchedNotifications);
      }, error => {
        console.error('Lỗi khi lấy thông báo: ', error);
      });

      return () => unsubscribe();
    }
  }, [user?.hashtagname]);


const handleAcceptRequest = async (notification: TNotification) => {
    if (user && notification.from.id) {
      try {
        const userDocRef = firestore().collection('USERS').doc(user.id);
        const senderDocRef = firestore().collection('USERS').doc(notification.from.id);

        // user hiện tại
        const userDoc = await userDocRef.get();
        const userData = userDoc.data() as TUser;

        // user gửi
        const senderDoc = await senderDocRef.get();
        const senderData = senderDoc.data() as TUser;

        // cập nhật danh sách bạn bè của user hiện tại
        await userDocRef.update({
          listfriend: firestore.FieldValue.arrayUnion({
            id: notification.from.id,
            name: senderData.name,
            hashtagname: senderData.hashtagname,
            email: senderData.email,
            pass: senderData.pass,
            phone: senderData.phone,
            birthday: senderData.birthday,
            avatart: senderData.avatart,
            status: senderData.status,
            listfriend: senderData.listfriend,
          }),
        });
        // cập nhật danh sách bạn bè của user gửi
        await senderDocRef.update({
          listfriend: firestore.FieldValue.arrayUnion({
            id: user.id,
            name: userData.name,
            hashtagname: userData.hashtagname,
            email: userData.email,
            pass: userData.pass,
            phone: userData.phone,
            birthday: userData.birthday,
            avatart: userData.avatart,
            status: userData.status,
            listfriend: userData.listfriend,
          }),
        });

        await firestore().collection('NOTIFICATIONS').doc(notification.id).set({ checkread: true }, { merge: true });
        showMessage({
          message: "Kết bạn thành công!",
          type: "success",
          duration: 2000,
          autoHide: true,
          style: { justifyContent: 'center', alignItems: 'center' }
        });
      } catch (error) {
        console.error('Error accepting friend request: ', error);
      }
    }
  };

  const handleRejectRequest = async (notification: TNotification) => {
    try {
      await firestore().collection('NOTIFICATIONS').doc(notification.id).set({ checkread: true }, { merge: true });
       showMessage({
          message: "Đã hủy kết bạn!",
          type: "success",
          duration: 2000,
          autoHide: true,
          style: { justifyContent: 'center', alignItems: 'center' }
        });
    } catch (error) {
      console.error('Error rejecting friend request: ', error);
    }
  };

  return (
    <View style={{backgroundColor:colorMode.inverseWhiteGray,flex:1}}>
      <View style={{marginTop:20}}>
        {notifications.map(item =>(
          <TouchableOpacity key={item.id} style={{paddingHorizontal:10,flexDirection:'row',marginBottom:15}}>
            <View style={styles.imageview}>
                <FastImageRes uri={item.from.avatart}/>
            </View>
            <View style={{flex:1,paddingLeft:10,paddingRight:20,position:'relative'}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TText style={{flex:.7}}><TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>{item.from.name}</TText> đã gửi yêu cầu kết bạn tới bạn</TText>
                <TText style={{fontWeight:'600',color:colorMode.inverseBlack,marginLeft:5,flex:0.3}}>{formatTimeAgo(item.notificationAt)}</TText>
              </View>
              {item.checkread === false &&
              <View style={{flexDirection:'row',position:'absolute',right:20,top:25}}>    
                <TouchableOpacity onPress={() => handleAcceptRequest(item)} style={{backgroundColor:'#77B371',padding:5,borderRadius:5,marginRight:10}}>
                    <TText style={{color:'white'}}>Chấp nhận</TText>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRejectRequest(item)} style={{backgroundColor:'#F7334B',padding:5,borderRadius:5}}>
                    <TText style={{color:'white'}}>Hủy</TText>
                </TouchableOpacity>
              </View>
              }
            </View>
        </TouchableOpacity>     
        ))}
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
    imageview:{
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow:'hidden'
    }
  })

export default Request