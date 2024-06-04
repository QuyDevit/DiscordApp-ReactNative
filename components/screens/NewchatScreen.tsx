import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks';
import firestore from '@react-native-firebase/firestore'
import { TRoomChat, TUser } from '../../shared/types';
import { setHideBottomTab, setIdRoomChat } from '../../shared/rdx-slice';

const NewchatScreen = React.memo((props:any) => {
    const colorMode = useAppColor();
    const dispatch = useAppDispatch();
    const [friends, setFriends] = useState<Array<TUser>>([]);
    const [text,setText] = useState('');
    const user =  useAppSelector(state =>state.user.currentUser);
     useEffect(() => {
        if(user?.id){
          const userDocRef = firestore().collection('USERS').doc(user?.id);
          const unsubscribe = userDocRef.onSnapshot((doc) => {
              if (doc.exists) {
                  const userData = doc.data() as TUser;
                  const friendIds = userData?.listfriend?.map(member => member.id) || [];
                  if(friendIds.length > 0){
                    const listfriendRef = firestore().collection('USERS')   
                    .where('id', 'in', friendIds);
                    
                    const unsubscribe = listfriendRef.onSnapshot(snapshot => {
                    const fetchedfriends = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data(),
                        })) as TUser[];
                    
                        setFriends(fetchedfriends);
                      }, error => {
                          console.error('Lỗi khi lấy danh sách bạn: ', error);
                      });
                    return () => unsubscribe();
                  }           
              }else {
                setFriends([]);
              }
          }, (error) => {
              console.error('Error fetching friends: ', error);
          });

          return () => unsubscribe();
        }      
    }, [user?.id]);

    const chatOneToOne = async(user2 :TUser) =>{
      const roomChatDocRef = firestore().collection('ROOMCHATS');
      const roomChatOneToOneDocRef = roomChatDocRef
      .where('type','==',1)
      .where('members', 'array-contains', user2.id);
      
       try {
          const querySnapshot = await roomChatOneToOneDocRef.get();
          let oneToOneChatRoom  = null;

          querySnapshot.forEach((doc) => {
            const members = doc.data().members as string[];
            if (members.includes(user?.id!) && members.length === 2) {
              oneToOneChatRoom = { idroom: doc.id, nameuser: user2.name,tagname:user2.hashtagname };
            }
          });

          if (!oneToOneChatRoom) {
            const newChatRoom: TRoomChat = {
              roomname: "",
              type: 1,
              members: [user2.id, user?.id! || ''],
              lastmessAt: Date.now(),
              lastmesscontent: "",
              lastuser: null,
            };

            const newChatRoomRef = await roomChatDocRef.add(newChatRoom);
            oneToOneChatRoom = { idroom: newChatRoomRef.id, nameuser: user2.name,tagname:user2.hashtagname };
          }
          dispatch(setIdRoomChat(oneToOneChatRoom));
          dispatch(setHideBottomTab(true));
          props.navigation.navigate("RoomChat");
        } catch (error) {
          console.error("Error in chatOneToOne:", error);
          
        }
    }

    // Lọc danh sách bạn bè dựa trên input text
    const filteredFriends = friends.filter(friend => 
        friend.name.toLowerCase().includes(text.toLowerCase()) || 
        friend.hashtagname.toLowerCase().includes(text.toLowerCase())
    );

    // Hàm để nhóm bạn bè theo chữ cái đầu của tên
    const groupedFriends = filteredFriends.reduce((acc, friend) => {
        const firstLetter = friend.name[0].toUpperCase();
        if (!acc[firstLetter]) {
        acc[firstLetter] = [];
        }
        acc[firstLetter].push(friend);
        return acc;
    }, {} as { [key: string]: TUser[] });
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
       <View style={{position:'relative',justifyContent:'center',marginTop:20,paddingHorizontal:15}} >
            <TextInput
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                placeholder='Tìm kiếm...'
                value={text}
                onChangeText={setText}
            />
            <View style={{position:'absolute',left:25,top:11}}>
                <TText style={{fontSize:15}}>Đến:</TText>
            </View>
      </View>
      <ScrollView style={{paddingHorizontal:15,marginTop:20}}>
        <TouchableOpacity onPress={() => props.navigation.navigate('AddGroup')} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderTopLeftRadius:15,borderTopRightRadius:15,borderBottomWidth:1,borderColor:'#DBDADA'}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#5E71EC',justifyContent:'center',alignItems:'center'}}>
                    <AddgroupIcon width={25} height={25}/>
                </View>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16,color:colorMode.inverseBlack}}>Nhóm mới</TText>
            </View>
            <View>
                <ShowmenuIcon width={30} height={30}/>
            </View>
        </TouchableOpacity>
          <TouchableOpacity onPress={ () => props.navigation.navigate('AddFriend')} style={[styles.item_container,{backgroundColor:colorMode.appGray,borderBottomLeftRadius:15,borderBottomRightRadius:15}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                 <View style={{height:35,width:35,borderRadius:50,backgroundColor:'#FF6BFA',justifyContent:'center',alignItems:'center'}}>
                    <FriendIcon width={20} height={20}/>
                </View>
                <TText style={{fontWeight:'700',marginLeft:15,fontSize:16,color:colorMode.inverseBlack}}>Thêm bạn bè</TText>
            </View>
            <View>
                <ShowmenuIcon width={30} height={30}/>
            </View>
        </TouchableOpacity>
        <View style={{marginTop:30}}>
              {Object.keys(groupedFriends).sort().map(letter => (
                <View key={letter}>
                <Text style={{ fontWeight: 'bold', fontSize: 15,color:colorMode.inverseBlack }}>{letter}</Text>
                {groupedFriends[letter].map((friend,index) => (
                    <TouchableOpacity
                    onPress={() => chatOneToOne(friend)}
                    key={friend.id}
                    style={[styles.item_container, { 
                        backgroundColor: colorMode.appGray,
                        borderBottomWidth: index != groupedFriends[letter].length - 1 ? 1 : 0,
                        borderColor: '#DBDADA',
                        borderTopLeftRadius: index === 0 ? 15 : 0,
                        borderTopRightRadius: index === 0 ? 15 : 0,
                        borderBottomLeftRadius: index === groupedFriends[letter].length - 1 ? 15 : 0,
                        borderBottomRightRadius: index === groupedFriends[letter].length - 1 ? 15 : 0,
                     }]}
                    >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{height:35,width:35,borderRadius:50,justifyContent:'center',alignItems:'center',overflow:'hidden'}}>
                            <FastImageRes uri={ friend.avatart}/>
                        </View>
                        <View>
                        <Text style={{fontWeight:'700',marginLeft:15,fontSize:16,color:colorMode.inverseBlack}}>{friend.name}</Text>
                        <Text style={{fontWeight:'600',marginLeft:15,fontSize:13,color:colorMode.inverseBlack}}>{friend.hashtagname}</Text>
                        </View>
                    </View>
                    </TouchableOpacity>    
                ))}
                </View>
            ))}
                
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