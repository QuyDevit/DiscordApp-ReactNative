import { View, Text, StyleSheet, Dimensions,TextInput } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
// @ts-ignore
import ChatGiftIcon from '../../assets/chatGiftNitro.svg'
// @ts-ignore
import PlusIcon from '../../assets/guildAddRole.svg'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import SmileIcon from '../../assets/voiceReaction.svg'
// @ts-ignore
import MicrophoneIcon from '../../assets/microphone.svg'
// @ts-ignore
import AngleRightIcon from '../../assets/angle-right.svg'
// @ts-ignore
import SendButtonIcon from '../../assets/sendButton.svg';
import { useAppSelector } from '../../shared/rdx-hooks'
import { TChatChannel, TNotification } from '../../shared/types'
import firestore from '@react-native-firebase/firestore'


const inputWidth = Dimensions.get('window').width * 0.6
const inputWidthWhenHasInput = Dimensions.get('window').width * 0.7;


const ChatBox = React.memo((props : any) => {
    const [text, setText] = React.useState<string>('');
    const colorMode = useAppColor()
    const user = useAppSelector(state=>state.user.currentUser);
    const channelData = useAppSelector(state=>state.server.channelData);
    const serverData = useAppSelector(state=>state.server.serverData);

    const sendMess = async () =>{
      try {
        const notificationRef = firestore().collection('NOTIFICATIONS');
        const chatChannelRef = firestore().collection('CHATCHANNEL');
      const notificationData: TNotification = {
        id: '',
        from: user!, 
        checkread: false, 
        to: channelData?.id!, 
        notificationAt: Date.now(), 
        type:2,
        server:serverData!,
        chanel:channelData,
        message:text
      };
       const sendMessdata: TChatChannel = {
        id: '',
        sendby: user!, 
        to: channelData?.id!, 
        notificationAt: Date.now(), 
        server:serverData!,
        mess:text
      };
       const docRef = await notificationRef.add(notificationData);
       await docRef.update({ id: docRef.id });
        const docchatRef = await chatChannelRef.add(sendMessdata);
       await docchatRef.update({ id: docchatRef.id });
      
      setText('');
      } catch (error) {
        console.error('Lỗi khi gửi yêu cầu kết bạn: ', error);
      }
    }
    
  return (
    <View>
      {
        channelData && Object.keys(channelData).length >0  &&
            <View style={{height:80,flexDirection:'row',paddingLeft:10,alignItems:'center'}}>
          {
                      text.length > 0 ?
                      <View style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                          <AngleRightIcon width={18} height={18} />
                      </View>:
                      <>
                          <View style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                              <PlusIcon width={25} height={25} />
                          </View>
                          <View style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                              <ChatGiftIcon width={25} height={25} />
                          </View>
                      </>
                  }
          <View style={{position:'relative',justifyContent:'center',marginRight:6}}>
              <TextInput 
                  style={[styles.inputStyle,text.length > 0 && {width: inputWidthWhenHasInput},{backgroundColor:colorMode.appLightGray}]}
                  multiline={true}
                  placeholderTextColor={colorMode.textGray}
                  placeholder='Nhắn #chào-mừng-bạn'
                  onChangeText={setText}
                  defaultValue={text}
              />
              <SmileIcon width={25} height={25} style={{position:'absolute',right:8}}/>
          </View>
          <View style={[styles.icon_container,{backgroundColor:colorMode.appLightGray}]}>
              {
                      text.length > 0 ?
                      <View onTouchEnd={sendMess} style={[styles.icon_container, {backgroundColor: colorMode.blurple, alignItems: 'center', justifyContent: 'center' ,marginLeft:5}]}>
                          <SendButtonIcon width={18} height={18} />
                      </View>:
                      <MicrophoneIcon width={25} height={25} />
                  }
          </View>
      </View>
      }
  
    </View>
  )
})

const styles = StyleSheet.create({
    icon_container:{
        width:40,
        height:40,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        marginRight:6
    },
    inputStyle:{
        minHeight:40,
        maxHeight:120,
        width:inputWidth,
        borderBottomWidth:0,
        borderRadius:20,
        paddingLeft:15,
        paddingRight:35,
        paddingVertical:0,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    }
})
export default ChatBox