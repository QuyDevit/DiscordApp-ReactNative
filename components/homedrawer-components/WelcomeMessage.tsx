import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
// @ts-ignore
import HashTagIcon from '../../assets/channelText-white.svg'
// @ts-ignore
import EditServerIcon from '../../assets/guildEditServerProfile-blue.svg'
import useAppColor from '../../themed/useAppColor'


const WelcomeMessage = React.memo((props :any) => {
    const colorMode = useAppColor();
  return (
    <View style={{paddingHorizontal:10,marginBottom:30}}>
        <View style={styles.welcome_container}>
            <HashTagIcon width={35} height={35}/>
        </View>
        <View style={{marginTop:10}}>
            <TText style={[styles.textTitle,{color:colorMode.inverseBlack}]} fontFamily='bold'>Chào mừng bạn đến với</TText>
            <TText style={[styles.textTitle,{color:colorMode.inverseBlack}]} fontFamily='semiBold'>#chat chung</TText>
            <TText style={{fontSize:16,marginTop:5,fontWeight:'600',color:colorMode.inverseBlack}}>Đây là sự khởi đầu của kênh #chat chung</TText>
        </View>
        <TouchableOpacity style={{flexDirection:'row',marginTop:10}}>
            <EditServerIcon  width={25} height={25}/>
            <TText style={{fontSize:16,fontWeight:'600',color:'#3276c4'}}>Chỉnh sửa kênh</TText>
        </TouchableOpacity>
    </View>
  )
})

const styles = StyleSheet.create({
    welcome_container:{
        width:60,
        height:60,
        borderRadius:50,
        backgroundColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:10,
        marginTop:20
    },
    textTitle:{
        fontSize:25,
        fontWeight:'bold'
    }
})

export default WelcomeMessage