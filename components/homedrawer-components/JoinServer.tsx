import { View, Text ,TextInput, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'

const JoinServer = React.memo((props: any) => {
    const colorMode = useAppColor();
  return (
    <View style={{paddingHorizontal:10,flex:1,justifyContent:'space-between',backgroundColor:colorMode.inverseWhite}}>
        <View>
            <TText style={{textAlign:'center',fontSize:24,fontWeight:'bold',marginTop:15,color:colorMode.inverseBlack}}>Tham gia 1 máy chủ có sẵn</TText>
            <TText style={{textAlign:'center',fontWeight:'bold'}}>Nhập lời mời bên dưới để tham gia 1 máy chủ có sẵn</TText>

            <TText style={{fontWeight:'bold',marginTop:15,fontSize:16}}>Liên kết mời:</TText>

            <TextInput 
                    style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                    placeholderTextColor={colorMode.textGray}
                    placeholder='https://discord.gg/ok123lfs'
                />
                <View style={{flexDirection:'row',marginTop:15,}}>
                    <TText style={{fontWeight:'bold',fontSize:14}}>Lời mời trông giống </TText>
                    <TText style={{fontWeight:'bold',fontSize:14,color:colorMode.inverseBlack}}>https://discord.gg/ok123lfs,</TText>
                    <TText style={{fontWeight:'bold',fontSize:14,color:colorMode.inverseBlack}}> ok123lfs</TText>
                </View>
                <View style={{flexDirection:'row',}}>
                    <TText style={{fontWeight:'bold',fontSize:14}}>Hoặc </TText>
                    <TText style={{fontWeight:'bold',fontSize:14,color:colorMode.inverseBlack}}>https://discord.gg/hello-people</TText>
                </View>

        </View>
        <View style={{borderTopWidth:1,borderColor:'#DBDADA',paddingTop:20,marginBottom:10}}>
            <TouchableOpacity style={{paddingVertical:15,backgroundColor:"#5E71EC",marginHorizontal:10,borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <TText style={{color:'white',fontWeight:'bold'}}>Tham gia bằng Liên Kết Mời</TText>
            </TouchableOpacity>
        </View>
    </View>
  )
})

const styles = StyleSheet.create({
    inputStyle:{
        marginTop:10,
        height:55,
        borderBottomWidth:0,
        borderRadius:14,
        paddingLeft:15,
        paddingRight:35,
        paddingVertical:15,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    }
})
export default JoinServer