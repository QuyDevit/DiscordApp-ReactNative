import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { ShareApp } from '../../shared/Reusables'
import useAppColor from '../../themed/useAppColor'
import { TText } from '../../themed/themeComponents'

const AddFriendScreen = React.memo((props:any) => {
    const [name,setName] = useState('');
    const hasErrorName = () => name.length < 1;
    const colorMode = useAppColor();
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray,justifyContent:'space-between'}}>
        <View>
             <ShareApp/>
             <TText style={{textAlign:'center',fontWeight:'bold',fontSize:24,marginTop:10,color:colorMode.inverseBlack}}>Thêm bằng tên người dùng</TText>
             <View style={{paddingHorizontal:15,marginTop:20,justifyContent:'space-around',flexDirection:'column'}}>
                   
                    <TText style={{fontWeight:'bold'}}>Bạn muốn thêm ai làm bạn bè?</TText>

                    <View style={{position:'relative',justifyContent:'center',marginTop:10}} >
                            <TextInput 
                                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                                placeholderTextColor={colorMode.textGray}
                                value={name}
                                onChangeText={(text)=>setName(text)}
                                placeholder='Nhập tên người dùng...'
                            />
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TText style={{fontWeight:'bold',fontSize:12}}>À nhân tiện tên người dùng của bạn là </TText>
                        <TText style={{fontWeight:'bold',fontSize:12,color:colorMode.inverseBlack}}>nquy. </TText>
                    </View>            
             </View>
        </View>
        <TouchableOpacity disabled={hasErrorName()} style={{paddingVertical:15,backgroundColor:"#5E71EC",borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20,marginHorizontal:15,opacity: !hasErrorName() ? 1: .6 }}>
            <TText style={{color:'white',fontWeight:'bold'}}>Gửi yêu cầu kết bạn</TText>
        </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
    inputStyle:{
        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingHorizontal:10,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
  })

export default AddFriendScreen