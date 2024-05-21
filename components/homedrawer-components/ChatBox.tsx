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


const inputWidth = Dimensions.get('window').width * 0.6

const ChatBox = React.memo((props : any) => {
    const colorMode = useAppColor()
  return (
    <View style={{height:80,flexDirection:'row',paddingLeft:10,alignItems:'center'}}>
        <View style={[styles.icon_container,{backgroundColor:colorMode.appLightGray}]}>
            <PlusIcon width={25} height={25} />
        </View>
        <View style={[styles.icon_container,{backgroundColor:colorMode.appLightGray}]}>         
            <ChatGiftIcon width={25} height={25}/>
        </View>
        <View style={{position:'relative',justifyContent:'center',marginRight:6}}>
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                multiline={true}
                placeholderTextColor={colorMode.textGray}
                placeholder='Nhắn #chào-mừng-bạn'
            />
            <SmileIcon width={25} height={25} style={{position:'absolute',right:8}}/>
        </View>
        <View style={[styles.icon_container,{backgroundColor:colorMode.appLightGray}]}>
            <MicrophoneIcon width={20} height={20}/>
        </View>
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