import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
// @ts-ignore
import NotificationIcon from '../../assets/guildNotificationSettings.svg'
// @ts-ignore
import PinIcon from '../../assets/pin.svg'
// @ts-ignore
import SettingIcon from '../../assets/guildServerSettings.svg'
// @ts-ignore
import HostIcon from '../../assets/host.svg'
import { FastImageRes } from '../../shared/Reusables'
import { useAppSelector } from '../../shared/rdx-hooks'
import { TUser } from '../../shared/types'
import firestore from '@react-native-firebase/firestore'


const ListMember = React.memo((props:any) => {
    const colorMode = useAppColor();
    const server = useAppSelector(state =>state.server.serverData);
    const [members, setMembers] = useState<Array<TUser>>([]);
    useEffect(() => {
         if (server?.listmember  && server.listmember.length > 0) {
           const listmemberRef = firestore().collection('USERS')   
            .where('id', 'in', server?.listmember?.map(member => member.id) || [])
                const unsubscribe = listmemberRef.onSnapshot(snapshot => {
                    const fetchedmembers = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        })) as TUser[];
                    
                        setMembers(fetchedmembers);
                }, error => {
                    console.error('Lỗi khi lấy thông báo: ', error);
                });
            return () => unsubscribe();
         }      

    }, [server]);
  return (
    <View style={{flex:1,paddingHorizontal:10,paddingTop:5,backgroundColor:colorMode.inverseWhiteGray}}>
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'lightgray',paddingBottom:15}}>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <SearchIcon width={22} height={22} />
                    <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>Tìm kiếm</TText>
                </TouchableOpacity>
                 <TouchableOpacity style={{alignItems:'center'}}>
                    <PinIcon width={22} height={22} style={{opacity:.9}}/>
                    <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>Ghim</TText>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <NotificationIcon width={22} height={22} style={{opacity:.9}} />
                    <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>Thông báo</TText>
                </TouchableOpacity>
                 <TouchableOpacity style={{alignItems:'center'}}>
                    <SettingIcon width={22} height={22} style={{opacity:.9}}/>
                    <TText style={{fontWeight:'600',color:colorMode.inverseBlack}}>Cài đặt</TText>
                </TouchableOpacity>
            </View>
            <TText style={{textAlign:'center',fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginTop:15}}>Thành Viên nhóm</TText>
        </View>
        <ScrollView>
            <TText style={{ fontWeight: 'bold', marginVertical: 10 ,color:colorMode.inverseBlack}}>Trực tuyến</TText>
            {members.filter(item => item.status === 1).map((item,index) => (
                <TouchableOpacity key={item.id} style={{ flexDirection: 'row',
                                                         paddingVertical: 15,
                                                         paddingHorizontal: 10,
                                                         backgroundColor: colorMode.appGray ,
                                                         borderTopLeftRadius: index ==0 ?10 :0,
                                                         borderTopRightRadius: index ==0 ?10 :0 ,
                                                         borderBottomLeftRadius: index ==members.length -1 ?10 :0,
                                                         borderBottomRightRadius: index ==members.length -1 ?10 :0 
                                                       }}>
                    <View style={styles.imageview}>
                        <FastImageRes uri={item.avatart}></FastImageRes>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 10, flexDirection: 'row' }}>
                        <TText style={{ fontWeight: 'bold', marginRight: 2 ,color:colorMode.inverseBlack}}>{item.name}</TText>
                        {item.id === server.createby && <HostIcon width={20} height={20} />}
                    </View>
                </TouchableOpacity>
            ))}
            <TText style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 10 ,color:colorMode.inverseBlack}}>Ngoại tuyến</TText>
            {members.filter(item => item.status === 0).map((item,index) => (
                <TouchableOpacity key={item.id} style={{ flexDirection: 'row',
                                                         padding: 10,
                                                         backgroundColor: colorMode.appGray,
                                                         borderTopLeftRadius: index ==0 ?10 :0,
                                                         borderTopRightRadius: index ==0 ?10 :0 ,
                                                         borderBottomLeftRadius: index ==members.length -1 ?10 :0,
                                                         borderBottomRightRadius: index ==members.length -1 ?10 :0 
                                                        }}>
                    <View style={styles.imageview}>
                        <FastImageRes uri={item.avatart}></FastImageRes>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 10, flexDirection: 'row' }}>
                        <TText style={{ fontWeight: 'bold', marginRight: 2,color:colorMode.inverseBlack }}>{item.name}</TText>
                         {item.id === server.createby && <HostIcon width={20} height={20} />}
                    </View>
                </TouchableOpacity>
            ))}
        </ScrollView>
 
    </View>
  )
})

const styles = StyleSheet.create({
    imageview:{
        width: 30,
        height: 30,
        borderRadius: 50,
        overflow:'hidden'
    }
  })
export default ListMember