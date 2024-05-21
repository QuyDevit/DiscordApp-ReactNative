import { View, Text } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import { FastImageRes } from '../../shared/Reusables'

const MessageBox = React.memo((props:any) => {
  return (
    <View style={{flexDirection:'row',paddingHorizontal:10,marginBottom:15,alignItems:'center'}}>
        <View style={{width:40,height:40,borderRadius:50,overflow:'hidden'}}>
            <FastImageRes uri='https://toquoc.mediacdn.vn/280518851207290880/2023/5/29/images-8-2023-05-29t052246compress19-1024x540-1685328584193-16853285844042115166976-1685346536930-1685346536991131653137.jpg'/>
        </View>
      <View style={{marginLeft:15,justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'flex-end'}}>
                <TText style={{fontSize:17,fontWeight:'bold',marginRight:10}}>Ông trùm</TText>
                <TText>01/01/2024</TText>
            </View>
            <View>
                <TText>Tập trung @All</TText>
            </View>
      </View>
    </View>
  )
})

export default MessageBox