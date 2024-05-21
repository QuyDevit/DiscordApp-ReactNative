import { View, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native'
import React from 'react'
import { Portal } from 'react-native-portalize'
import { TText } from '../../themed/themeComponents'
// @ts-ignore
import CancelIcon from '../../assets/guildSearchCancel.svg'
// @ts-ignore
import ServerModelPrivateIcon from '../../assets/ServerModelPrivate.svg'
// @ts-ignore
import GamingIcon from '../../assets/Gaming.svg'
// @ts-ignore
import ShoolIcon from '../../assets/Shool.svg'
// @ts-ignore
import ShowmenuIcon from '../../assets/guildShowMenu.svg'
// @ts-ignore
import GroupIcon from '../../assets/Group.svg'
// @ts-ignore
import FriendIcon from '../../assets/FriendServer.svg'
// @ts-ignore
import CreatorIcon from '../../assets/Creator.svg'
// @ts-ignore
import CommunityIcon from '../../assets/Community.svg'
import useAppColor from '../../themed/useAppColor'



const AddServer = React.memo((props:any) => {
    const colorMode = useAppColor();
     const { navigation } = props;

    const handleCancelPress = () => {
        navigation.goBack();
    };
    const handleStepFinal =() =>{
         navigation.navigate('AddServerStepFinal');
    }
  return (
    <View style={{backgroundColor:colorMode.inverseWhite,flex:1}}>
        <TouchableOpacity onPress={handleCancelPress} style={{marginLeft:20,marginTop:10}}>
            <CancelIcon width={25} height={25}/>
        </TouchableOpacity>
        <ScrollView >
            <TText fontFamily='bold' style={{textAlign:'center',fontSize:22,fontWeight:'bold',color:'black',marginTop:20}}>Tạo máy chủ của bạn</TText>
        <TText fontFamily='bold' style={{textAlign:'center',marginTop:5,fontWeight:'700'}}>Máy chủ của bạn là nơi bạn giao lưu với bạn bè của mình.</TText>
        <TText fontFamily='bold' style={{textAlign:'center',fontWeight:'700',marginBottom:20}}>Hãy tạo máy chủ của riêng bạn và bắt đầu trò chuyện.</TText>

        <TouchableOpacity onPress={handleStepFinal} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderRadius:15,}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <ServerModelPrivateIcon width={45} height={45}/>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Tạo mẫu riêng</TText>
            </View>
            <View>
                <ShowmenuIcon width={35} height={35}/>
            </View>
        </TouchableOpacity>

        <TText fontFamily='bold' style={{fontWeight:'700',marginLeft:10,marginTop:20}}>Bắt đầu từ mẫu</TText>
        <TouchableOpacity onPress={handleStepFinal} style={[styles.item_container,{backgroundColor:colorMode.appGray,marginTop:10,borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomWidth:1,borderColor:'#DBDADA'}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <GamingIcon width={45} height={45}/>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Gaming</TText>
            </View>
            <View>
                <ShowmenuIcon width={35} height={35}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStepFinal} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderColor:'#DBDADA',borderBottomWidth:1}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <ShoolIcon width={45} height={45}/>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Câu lạc bộ trường học</TText>
            </View>
            <View>
                <ShowmenuIcon width={35} height={35}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStepFinal} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderColor:'#DBDADA',borderBottomWidth:1}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <GroupIcon width={45} height={45}/>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Nhóm học tập</TText>
            </View>
            <View>
                <ShowmenuIcon width={35} height={35}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStepFinal} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderColor:'#DBDADA',borderBottomWidth:1}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <FriendIcon width={45} height={45}/>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Bạn bè</TText>
            </View>
            <View>
                <ShowmenuIcon width={35} height={35}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStepFinal} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderColor:'#DBDADA',borderBottomWidth:1}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <CreatorIcon width={45} height={45}/>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Nghệ sĩ và người sáng tạo</TText>
            </View>
            <View>
                <ShowmenuIcon width={35} height={35}/>
            </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStepFinal} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderBottomLeftRadius:15,borderBottomRightRadius:15}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <CommunityIcon width={45} height={45}/>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Cộng đồng địa phương</TText>
            </View>
            <View>
                <ShowmenuIcon width={35} height={35}/>
            </View>
        </TouchableOpacity>
        </ScrollView>
        <View style={{borderTopWidth:1,borderColor:'#DBDADA',paddingTop:15,}}>
            <TText style={{textAlign:'center',marginBottom:10,fontSize:22,fontWeight:'bold'}}>Bạn nhận được lời mời rồi?</TText>
            <TouchableOpacity onPress={()=> navigation.navigate("JoinServer")} style={{paddingVertical:15,backgroundColor:"#5E71EC",marginHorizontal:10,borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <TText style={{color:'white',fontWeight:'bold'}}>Tham gia máy chủ</TText>
            </TouchableOpacity>
        </View>
        
    </View>
  )
})

const styles = StyleSheet.create({
    item_container:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        marginHorizontal:10,
        paddingHorizontal:10,
        paddingVertical:10,
    },
})

export default AddServer