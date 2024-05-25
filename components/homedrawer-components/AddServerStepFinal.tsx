import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import UploadIcon from '../../assets/uploadImage.svg'
// @ts-ignore
import PlusIcon from '../../assets/guildAddWhite.svg'
// @ts-ignore
import CancelIcon from '../../assets/guildSearchCancelWhite.svg'

const AddServerStepFinal = React.memo((props:any) => {
    const [serverName,setServerName] = useState('');
    const hasErrorServerName = () => serverName.length< 1;
  const colorMode = useAppColor()
  return (
    <View style={{paddingHorizontal:10,flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
      <TText fontFamily='bold' style={{textAlign:'center',fontSize:24,fontWeight:'bold',color:colorMode.inverseBlack,marginTop:15}}>Tạo Máy chủ Của Bạn</TText>
      <TText style={{textAlign:'center',fontWeight:'bold',marginTop:10}}>Máy chủ của bạn là nơi bạn giao lưu với bạn bè của mình.</TText>
      <TText style={{textAlign:'center',fontWeight:'bold'}}>Hãy tạo máy chủ của riêng bạn và bắt đầu trò chuyện.</TText>

      <TouchableOpacity style={{alignItems:'center',marginTop:30,paddingVertical:20}}>
        <View style={{width:80,borderRadius:50,borderWidth:3,borderColor:'gray',borderStyle:'dashed',height:80,alignItems:'center',justifyContent:'center',position:'relative'}}>
            <View style={{position:'absolute',top:-10,right:-10,height:35,width:35,backgroundColor:'#5E71EC',justifyContent:'center',alignItems:'center',borderRadius:50}}>
                <PlusIcon width={25} height={25} />
            </View>
            <View style={{alignItems:'center'}}>
                <UploadIcon width={30} height={30}/>
                <TText style={{fontWeight:'bold'}}>Tải lên</TText>
            </View>
        </View>
      </TouchableOpacity>
      <TText style={{fontWeight:'bold',fontSize:16}}>Tên máy chủ</TText>
       <View style={{position:'relative',justifyContent:'center',marginTop:10}}>
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                value={serverName}
                onChangeText={setServerName}
                placeholder='Tên máy chủ của bạn...'
            />
            {serverName &&
                <TouchableOpacity onPress={()=> setServerName('')} style={styles.iconDeleteValue}>
                <CancelIcon width={15} height={15} />
            </TouchableOpacity>
            }
        </View>
        <View style={{marginTop:10}}>
            <View style={{flexDirection:'row'}}>
                <TText style={{fontSize:12,fontWeight:'bold'}}>Khi tạo máy chủ, nghĩa là bạn đã đồng ý với </TText>
                <TText style={{fontSize:12,fontWeight:'bold',color:'#3E57F9'}}>Nguyên Tắc Cộng Đồng</TText>
            </View>
            <View>
                <TText style={{fontSize:12,fontWeight:'bold'}}>của Discord. </TText>
            </View>
        </View>
        <TouchableOpacity style={{alignItems:'center',justifyContent:'center',marginTop:15,backgroundColor:'#5E71EC',paddingVertical:13,borderRadius:20 ,opacity:serverName ? 1: 0.7}} disabled={hasErrorServerName()}>
                <TText style={{color:colorMode.inverseWhite,fontWeight:'bold'}}>Tạo máy chủ</TText>
        </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
    inputStyle:{
        height:55,
        borderBottomWidth:0,
        borderRadius:12,
        paddingLeft:15,
        paddingRight:35,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
    iconDeleteValue:{
        position:'absolute',
        right:12,
        width:24,
        height:24,
         borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray'
    }
})

export default AddServerStepFinal