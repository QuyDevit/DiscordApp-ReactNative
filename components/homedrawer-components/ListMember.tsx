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
    const user = useAppSelector(state =>state.user.currentUser);
    const server = useAppSelector(state =>state.server.serverData);
    const [members, setMembers] = useState<Array<TUser>>([]);
    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const membersRef = firestore().collection('USERS');
                const snapshot = await membersRef.where('id', 'in', server.listmember.map(member => member.id)).get();
                const membersData = snapshot.docs.map(doc => doc.data()) as Array<TUser>;
                setMembers(membersData);
            } catch (error) {
                console.error('Error fetching members: ', error);
            }
        };
        fetchMembers();
    }, [server]);
  return (
    <View style={{flex:1,paddingHorizontal:10,paddingTop:5,backgroundColor:colorMode.inverseWhiteGray}}>
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',borderBottomWidth:1,borderColor:'lightgray',paddingBottom:15}}>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <SearchIcon width={22} height={22} />
                    <TText style={{fontWeight:'600'}}>Tìm kiếm</TText>
                </TouchableOpacity>
                 <TouchableOpacity style={{alignItems:'center'}}>
                    <PinIcon width={22} height={22} style={{opacity:.9}}/>
                    <TText style={{fontWeight:'600'}}>Ghim</TText>
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <NotificationIcon width={22} height={22} style={{opacity:.9}} />
                    <TText style={{fontWeight:'600'}}>Thông báo</TText>
                </TouchableOpacity>
                 <TouchableOpacity style={{alignItems:'center'}}>
                    <SettingIcon width={22} height={22} style={{opacity:.9}}/>
                    <TText style={{fontWeight:'600'}}>Cài đặt</TText>
                </TouchableOpacity>
            </View>
            <TText style={{textAlign:'center',fontSize:16,fontWeight:'bold',color:colorMode.inverseBlack,marginTop:15}}>Thành Viên nhóm</TText>
        </View>
        <ScrollView>
            <TText style={{ fontWeight: 'bold', marginVertical: 10 }}>Trực tuyến</TText>
            {members.filter(item => item.status === 1).map(item => (
                <TouchableOpacity key={item.id} style={{ flexDirection: 'row', paddingVertical: 15, paddingHorizontal: 10, borderRadius: 10, backgroundColor: colorMode.appGray }}>
                    <View style={styles.imageview}>
                        <FastImageRes uri={item.avatart}></FastImageRes>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 10, flexDirection: 'row' }}>
                        <TText style={{ fontWeight: 'bold', marginRight: 2 }}>{item.name}</TText>
                        {item.id === server.createby && <HostIcon width={20} height={20} />}
                    </View>
                </TouchableOpacity>
            ))}
            <TText style={{ fontWeight: 'bold', marginTop: 20, marginBottom: 10 }}>Ngoại tuyến</TText>
            {members.filter(item => item.status === 0).map(item => (
                <TouchableOpacity key={item.id} style={{ flexDirection: 'row', padding: 10, backgroundColor: colorMode.appGray, borderTopLeftRadius: 10, borderTopRightRadius: 10 }}>
                    <View style={styles.imageview}>
                        <FastImageRes uri={item.avatart}></FastImageRes>
                    </View>
                    <View style={{ alignItems: 'center', marginLeft: 10, flexDirection: 'row' }}>
                        <TText style={{ fontWeight: 'bold', marginRight: 2 }}>{item.name}</TText>
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