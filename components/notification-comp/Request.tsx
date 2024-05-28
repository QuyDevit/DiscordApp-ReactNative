import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import { FastImageRes, formatTimeAgo } from '../../shared/Reusables'
import useAppColor from '../../themed/useAppColor'
import { useAppSelector } from '../../shared/rdx-hooks'
import { TNotification } from '../../shared/types'
import firestore from '@react-native-firebase/firestore'

const Request = React.memo((props:any) => {
    const user = useAppSelector(state =>state.user.currentUser);
    const colorMode = useAppColor();
    const [notifications, setNotifications] = useState<TNotification[]>([]);
    useEffect(() => {
      const fetchNotifications = async () => {
        if (user?.hashtagname) {
          try {
            const notificationRef = firestore().collection('NOTIFICATIONS');
            const snapshot = await notificationRef
              .where('to', '==', user.hashtagname)
              .get();
            
            const fetchedNotifications = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            })) as TNotification[];

            setNotifications(fetchedNotifications);
          } catch (error) {
            console.error('Lỗi khi lấy thông báo: ', error);
          }
        }
      };

      fetchNotifications();
    }, [user?.hashtagname]);
  return (
    <View style={{backgroundColor:colorMode.inverseWhiteGray,flex:1}}>
      <View style={{marginTop:20}}>
        {notifications.map(item =>(
        <TouchableOpacity key={item.id} style={{paddingHorizontal:10,flexDirection:'row',alignItems:'center',marginBottom:15}}>
          <View style={styles.imageview}>
              <FastImageRes uri={item.from.avatart}/>
          </View>
          <View style={{flex:1,paddingLeft:10,paddingRight:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <TText style={{flex:.7}}><TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>{item.from.name}</TText> đã gửi yêu cầu kết bạn tới bạn</TText>
              <TText style={{fontWeight:'600',color:colorMode.inverseBlack,marginLeft:5,flex:0.3}}>{formatTimeAgo(item.notificationAt)}</TText>
            </View>
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