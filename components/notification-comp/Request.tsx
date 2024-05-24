import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import { FastImageRes } from '../../shared/Reusables'
import useAppColor from '../../themed/useAppColor'

const Request = React.memo((props:any) => {
    const colorMode = useAppColor();
  return (
    <View style={{backgroundColor:'white',flex:1}}>
      <View style={{marginTop:20}}>
      <TouchableOpacity style={{paddingHorizontal:20,flexDirection:'row',alignItems:'center',marginBottom:15}}>
        <View style={styles.imageview}>
            <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'/>
        </View>
        <View style={{flex:1,paddingLeft:10,paddingRight:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',gap:20}}>
            <TText><TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>Hoàng</TText> đã gửi yêu cầu kết bạn tới bạn</TText>
            <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>1 phút</TText>
          </View>
        </View>

      </TouchableOpacity>
      <TouchableOpacity style={{paddingHorizontal:20,flexDirection:'row',alignItems:'center'}}>
        <View style={styles.imageview}>
            <FastImageRes uri='https://e7.pngegg.com/pngimages/842/992/png-clipart-discord-computer-servers-teamspeak-discord-icon-video-game-smiley-thumbnail.png'/>
        </View>
        <View style={{flex:1,paddingLeft:10,paddingRight:20}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',gap:20}}>
          <TText><TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>Hoàng</TText> đã gửi yêu cầu kết bạn tới bạn</TText>
            <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>1 phút</TText>
          </View>
        </View>

      </TouchableOpacity>
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