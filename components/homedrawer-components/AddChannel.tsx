import { View,  StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAppColor from '../../themed/useAppColor'
import { TText } from '../../themed/themeComponents';
import { TextInput } from 'react-native';
// @ts-ignore
import HashTagIcon from '../../assets/channelText.svg'
// @ts-ignore
import SpeakerIcon from '../../assets/speaker.svg';
import { RadioButton } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks';
import firestore from '@react-native-firebase/firestore'
import { showMessage } from "react-native-flash-message";
import { TChannel } from '../../shared/types';
import { fetchUserServers, setServerData } from '../../shared/serverSlice';

const AddChannel = React.memo(({navigation}:{navigation:any}) => {
    const colorMode = useAppColor();
    const [checked, setChecked] = useState('text');
    const [channelName, setChannelName] = useState('');
    const channelSectionData = useAppSelector(state =>state.main.channelSection);
    const user = useAppSelector(state =>state.user.currentUser);
    const serverData = useAppSelector(state =>state.server.serverData);
    const serverlist = useAppSelector(state =>state.server.servers);
    const dispatch = useAppDispatch();
    const addchannel = async() =>{
         if (channelName.trim() === '') {
           showMessage({
                message: "Vui lòng nhập tên kênh",
                type: "danger",
                duration: 2000,
                autoHide: true,
                style: { justifyContent: 'center', alignItems: 'center' }
            });
            return;
        }
         const newChannel : TChannel = {
            id: firestore().collection('SERVERS').doc().id, 
            title: channelName.trim(), 
            type: checked === 'text' ? 'text' : 'voice', 
        };
            const updatedChannels = serverData.channels.map(channelSection => {
                if (channelSection.id === channelSectionData) {
                    return {
                        ...channelSection,
                        items: [...channelSection.items, newChannel],
                    };
                } else {
                    return channelSection;
                }
            });

            const updatedServerData = { ...serverData, channels: updatedChannels };

            const serverDocRef = firestore().collection('SERVERS').doc(serverData.id);
            await serverDocRef.update({
                channels: updatedChannels,
            });


        dispatch(setServerData(updatedServerData ));
        setChannelName('');
        setChecked('text');
        dispatch(fetchUserServers(user?.id!));


        showMessage({
                message: "Tạo kênh thành công",
                type: "success",
                duration: 2000,
                autoHide: true,
                style: { justifyContent: 'center', alignItems: 'center' }
            });
        navigation.navigate('HomeScreen')
    }
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
       <View style={{justifyContent:'center',marginTop:20,paddingHorizontal:15}} >
        <TText style={{color:colorMode.inverseBlack,fontWeight:'600',fontSize:16,marginBottom:5}}>TÊN KÊNH</TText>
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                placeholder='kênh-mới...'
                value={channelName}
                onChangeText={setChannelName}
            />
      </View>
        <View style={{backgroundColor:"#ccc",height:1,opacity:.5,marginTop:30}}/>
        <View style={{paddingHorizontal:15,marginBottom:20}}>
           <TText style={{color:colorMode.inverseBlack,fontWeight:'600',fontSize:16,marginBottom:5,marginTop:20}}>LOẠI KÊNH</TText>  
        </View>
            <TouchableOpacity onPress={() => setChecked('text')} style={[styles.optionContainer, {backgroundColor: colorMode.appLightGray}]}>
                <HashTagIcon width={35} height={35}/>
                <View style={styles.textContainer}>
                    <TText style={[styles.optionTitle, {color: colorMode.inverseBlack}]}>Văn bản</TText>
                    <TText style={[styles.optionDescription, {color: colorMode.inverseBlack}]}>Đăng hình ảnh, ảnh động, sticker, ý kiến, và chơi chữ</TText>
                </View>
                <RadioButton
                    value="text"
                    status={checked === 'text' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('text')}
                    color={colorMode.inverseBlack}
                />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setChecked('voice')} style={[styles.optionContainer, {backgroundColor: colorMode.appLightGray}]}>
                <SpeakerIcon width={35} height={35} style={{opacity:.9}}/>
                <View style={styles.textContainer}>
                    <TText style={[styles.optionTitle, {color: colorMode.inverseBlack}]}>Giọng nói</TText>
                    <TText style={[styles.optionDescription, {color: colorMode.inverseBlack}]}>Cùng gặp mặt bằng gọi thoại, video, và chia sẻ màn hình</TText>
                </View>
                <RadioButton
                    value="voice"
                    status={checked === 'voice' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('voice')}
                    color={colorMode.inverseBlack}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={addchannel} style={{position:'absolute',bottom:0,left:0,right:0, paddingVertical:15,backgroundColor:"#5E71EC",marginHorizontal:10,borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <TText style={{color:'white',fontWeight:'bold'}}>Tạo kênh</TText>
            </TouchableOpacity>
    </View>
  )
})
const styles = StyleSheet.create({
    inputStyle:{
        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingRight:15,
        paddingLeft:20,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    }, 
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginBottom: 15,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    optionTitle: {
        fontWeight: '600',
        fontSize: 16,
    },
    optionDescription: {
        fontSize: 13,
    },
  })


export default AddChannel