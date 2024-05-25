import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import useAppColor from '../../themed/useAppColor'
import { TText } from '../../themed/themeComponents';
import { FastImageRes } from '../../shared/Reusables';
// @ts-ignore
import GamingIcon from '../../assets/Gaming.svg'
// @ts-ignore
import ShowmenuIcon from '../../assets/guildShowMenu.svg'
// @ts-ignore
import AddgroupIcon from '../../assets/addgroup.svg'
// @ts-ignore
import FriendIcon from '../../assets/addfriendwhite.svg'

const NewchatScreen = React.memo((props:any) => {
    const colorMode = useAppColor();
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
       <View style={{position:'relative',justifyContent:'center',marginTop:20,paddingHorizontal:15}} >
            <TextInput
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                onFocus={() => setIsFocused(true)}
                onBlur={() =>setIsFocused(false)}
                placeholder='Tìm kiếm...'
            />
            <View style={{position:'absolute',left:25,top:11}}>
                <TText style={{fontSize:15}}>Đến:</TText>
            </View>
      </View>
      <ScrollView style={{paddingHorizontal:15,marginTop:20}}>
        <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomWidth:1,borderColor:'#DBDADA'}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#5E71EC',justifyContent:'center',alignItems:'center'}}>
                    <AddgroupIcon width={25} height={25}/>
                </View>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Nhóm mới</TText>
            </View>
            <View>
                <ShowmenuIcon width={30} height={30}/>
            </View>
        </TouchableOpacity>
          <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderBottomLeftRadius:15,borderBottomRightRadius:15}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                 <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                    <FriendIcon width={20} height={20}/>
                </View>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Thêm bạn bè</TText>
            </View>
            <View>
                <ShowmenuIcon width={30} height={30}/>
            </View>
        </TouchableOpacity>
        <View style={{marginTop:30}}>
            <TText style={{fontWeight:'bold',fontSize:15}}>B</TText>
            <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderRadius:15}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                        <FriendIcon width={20} height={20}/>
                    </View>
                    <View>
                        <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Bình báo</TText>
                        <TText style={{fontWeight:'600',marginLeft:15,fontSize:13}}>binhbao</TText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
         <View style={{marginTop:30}}>
            <TText style={{fontWeight:'bold',fontSize:15}}>P</TText>
            <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomWidth:1,borderColor:'#DBDADA'}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                        <FriendIcon width={20} height={20}/>
                    </View>
                    <View>
                        <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Phạm Trần</TText>
                        <TText style={{fontWeight:'600',marginLeft:15,fontSize:13}}>pham.tran021</TText>
                    </View>
                </View>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderBottomLeftRadius:15,borderBottomRightRadius:15}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                        <FriendIcon width={20} height={20}/>
                    </View>
                    <View>
                        <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Phúc Hiếu</TText>
                        <TText style={{fontWeight:'600',marginLeft:15,fontSize:13}}>phuc.hieu_02</TText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
         <View style={{marginTop:30}}>
            <TText style={{fontWeight:'bold',fontSize:15}}>H</TText>
            <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderRadius:15}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                        <FriendIcon width={20} height={20}/>
                    </View>
                    <View>
                        <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Hoàng</TText>
                        <TText style={{fontWeight:'600',marginLeft:15,fontSize:13}}>hoangABC</TText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
        <View style={{marginTop:30}}>
            <TText style={{fontWeight:'bold',fontSize:15}}>P</TText>
            <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomWidth:1,borderColor:'#DBDADA'}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                        <FriendIcon width={20} height={20}/>
                    </View>
                    <View>
                        <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Phạm Trần</TText>
                        <TText style={{fontWeight:'600',marginLeft:15,fontSize:13}}>pham.tran021</TText>
                    </View>
                </View>
            </TouchableOpacity>
             <TouchableOpacity style={[styles.item_container,{backgroundColor:colorMode.appGray,borderBottomLeftRadius:15,borderBottomRightRadius:15}]}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                        <FriendIcon width={20} height={20}/>
                    </View>
                    <View>
                        <TText style={{fontWeight:'700',marginLeft:15,fontSize:16}}>Phúc Hiếu</TText>
                        <TText style={{fontWeight:'600',marginLeft:15,fontSize:13}}>phuc.hieu_02</TText>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
})
const styles = StyleSheet.create({
    inputStyle:{
        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingRight:15,
        paddingLeft:45,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
    item_container:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:15,
    },
  })

export default NewchatScreen