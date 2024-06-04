import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import { FastImageRes, formatTimeAgo } from '../../shared/Reusables'
import { useAppSelector } from '../../shared/rdx-hooks'
import firestore from '@react-native-firebase/firestore'
import { TChatChannel } from '../../shared/types'
import useAppColor from '../../themed/useAppColor'

const MessageBox = React.memo((props:any) => {
  const channelData = useAppSelector(state=>state.server.channelData);
  const [chatChannel, setchatChannel] = useState<TChatChannel[]>([]);
  const colorMode = useAppColor();
   useEffect(() => {
    if (channelData?.id) {
      const messageChannelRef = firestore().collection('CHATCHANNEL')
        .where('to', '==', channelData?.id)

      const unsubscribe = messageChannelRef.onSnapshot(snapshot => {
        const fetchedChatChannel = snapshot.docs.map(doc => ({
          ...doc.data(),
        })) as TChatChannel[];
        const sortedChatChannel = fetchedChatChannel.sort((a, b) => a.notificationAt - b.notificationAt);
        setchatChannel(sortedChatChannel);
      }, error => {
        console.error('Lỗi khi lấy tin nhắn: ', error);
      });

      return () => unsubscribe();
    }
  }, [channelData?.id]);

  return (
    <View style={{flexDirection:'column',paddingHorizontal:10}}>
      {
        chatChannel.map(item =>(
        <View key={item.id} style={{flexDirection:'row',marginBottom:15}}>
          <View style={{width:40,height:40,borderRadius:50,overflow:'hidden'}}>
              <FastImageRes uri={item.sendby.avatart}/>
          </View>
          <View style={{marginLeft:15,justifyContent:'space-between'}}>
                <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                    <TText style={{fontSize:17,fontWeight:'bold',marginRight:10,color:colorMode.inverseBlack}}>{item.sendby.name}</TText>
                    <TText style={{color:colorMode.inverseBlack}}>{formatTimeAgo(item.notificationAt)}</TText>
                </View>
                <View>
                    <TText style={{color:colorMode.inverseBlack}}>{item.mess}</TText>
                </View>
          </View>
          
        </View>
        
        ))
      }
    </View>
  )
})

export default MessageBox