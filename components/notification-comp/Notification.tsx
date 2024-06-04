import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import { FastImageRes, formatTimeAgo } from '../../shared/Reusables'
import useAppColor from '../../themed/useAppColor'
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks'
import firestore from '@react-native-firebase/firestore'
import { TNotification, TServerData, TUser } from '../../shared/types'
import { showMessage } from "react-native-flash-message";
import { fetchUserServers } from '../../shared/serverSlice'

const Notification = React.memo((props:any) => {
  const user = useAppSelector(state =>state.user.currentUser);
  const serverlist = useAppSelector(state =>state.server);
  const dispatch = useAppDispatch();
  const colorMode = useAppColor();
  const [notifications, setNotifications] = useState<TNotification[]>([]);

   useEffect(() => {
    if (user) {
      const notificationRef = firestore().collection('NOTIFICATIONS')
        .where('type', '!=', 0)
        .orderBy('type')
        .orderBy('notificationAt', 'desc');

      const unsubscribe = notificationRef.onSnapshot(snapshot => {
        const fetchedNotifications = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as TNotification[];  

        const filteredNotifications = fetchedNotifications.filter(notification => {
          if (notification.type === 1) {
            return notification.to === user?.hashtagname;
          } else if (notification.type === 2) {
            return serverlist?.servers?.some(server => server?.id === notification.server?.id && notification.from.id !== user?.id);
          }else if(notification.type === 3){
            return serverlist?.servers?.some(server => server?.id === notification.to && notification.from.id !== user?.id);
          }
          return false;
        }).sort((a, b) => {
          const order: { [key: number]: number } = {1: 1, 3: 2, 2: 3}; 
          return order[a.type] - order[b.type];
        });;

        setNotifications(filteredNotifications);
      }, error => {
        console.error('Lỗi khi lấy thông báo: ', error);
      });

      return () => unsubscribe();
    }
  }, [user, serverlist?.servers]);
 
  const handleAcceptRequest = async (notification: TNotification) => {
    if (user && notification.from.id) {
      try {
        const serverDocRef = firestore().collection('SERVERS').doc(notification.server?.id);
        const userDocRef = firestore().collection('USERS').doc(user.id);

        // user hiện tại
        const userDoc = await userDocRef.get();
        const userData = userDoc.data() as TUser;


        // cập nhật danh sách thành viên của server người gửi
        await serverDocRef.update({
          listmember: firestore.FieldValue.arrayUnion(notification.type === 2 ?{
            id: userData.id,
            name: userData.name,
            hashtagname: userData.hashtagname,
            email: userData.email,
            pass: userData.pass,
            phone: userData.phone,
            birthday: userData.birthday,
            avatart: userData.avatart,
            status: userData.status,
            listfriend: userData.listfriend,
          }: notification.from),
        });

        await firestore().collection('NOTIFICATIONS').doc(notification.id).set({ checkread: true }, { merge: true });
        dispatch(fetchUserServers(user?.id))
        showMessage({
          message: "Chấp nhận thành công!",
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
      dispatch(fetchUserServers(user?.id!))
       showMessage({
          message: "Hủy thành công!",
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
      <ScrollView showsVerticalScrollIndicator style={{marginTop:20}}>
      {notifications.map(item =>(
        <TouchableOpacity key={item.id} style={{paddingHorizontal:20,flexDirection:'row',alignItems:'center',marginBottom:15}}>
            <View style={styles.imageview}>
                <FastImageRes uri={item.from.avatart}/>
            </View>
            <View style={{flex:1,paddingLeft:10,paddingVertical:10}}>
              <View style={{flexDirection:'column',}}>
                {item.type === 1? 
                (<TText >       
                  <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>{item.from.name}</TText> đã gửi lời mời tham gia máy chủ 
                  <TText style={{fontWeight:'bold',color:colorMode.inverseBlack}}> {item.server?.title}</TText> tới bạn.
                </TText>) :  item.type == 3 ? (
                <TText >       
                  <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>{item.from.name}</TText> muốn tham gia máy chủ 
                  <TText style={{fontWeight:'bold',color:colorMode.inverseBlack}}> {item.server?.title}</TText> của bạn.
                </TText>
                ) :(
                <TText >       
                    <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>{item.from.name}</TText> đã đề cập trong  
                    <TText style={{fontWeight:'bold',color:colorMode.inverseBlack}}> {item.server?.title} - {item.chanel?.title}:</TText>
                    <TText style={{fontWeight:'bold',color:colorMode.inverseBlack}}> {item.message}</TText>
                </TText>
                )
                }               
                <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>{formatTimeAgo(item.notificationAt)}</TText>
              </View>
          </View>
           {item.checkread === false && item.type ===1 &&
                  <View style={{flexDirection:'column'}}>    
                    <TouchableOpacity onPress={() => handleAcceptRequest(item)} style={{backgroundColor:'#77B371',padding:5,borderRadius:5,marginBottom:5,alignItems:'center'}}>
                        <TText style={{color:'white'}}>Chấp nhận</TText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>handleRejectRequest(item)} style={{backgroundColor:'#F7334B',padding:5,borderRadius:5,alignItems:'center'}}>
                        <TText style={{color:'white'}}>Hủy</TText>
                    </TouchableOpacity>
                  </View>
            } 
            {item.checkread === false && item.type ===3 &&
                  <View style={{flexDirection:'column'}}>    
                    <TouchableOpacity onPress={() => handleAcceptRequest(item)} style={{backgroundColor:'#77B371',padding:5,borderRadius:5,marginBottom:5,alignItems:'center'}}>
                        <TText style={{color:'white'}}>Chấp nhận</TText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>handleRejectRequest(item)} style={{backgroundColor:'#F7334B',padding:5,borderRadius:5,alignItems:'center'}}>
                        <TText style={{color:'white'}}>Hủy</TText>
                    </TouchableOpacity>
                  </View>
            }       

      </TouchableOpacity>
      ))}

      </ScrollView>

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

export default Notification