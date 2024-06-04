import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import useAppColor from '../../themed/useAppColor'
import { TText } from '../../themed/themeComponents';
import { useAppSelector } from '../../shared/rdx-hooks';
import firestore from '@react-native-firebase/firestore'
import { CheckedFriends, TRoomChat, TUser } from '../../shared/types';
import { FastImageRes } from '../../shared/Reusables';
import { Checkbox } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import CancelIcon from '../../assets/guildSearchCancel.svg'
// @ts-ignore
import ArrowRightIcon from '../../assets/arrowright.svg'

const AddGroupChatScreen = React.memo((props:any) => {
    const colorMode = useAppColor();
    const [text,setText] = useState('');
    const [namegroupchat,setNameGroupChat] = useState('');
    const [checkedFriends, setCheckedFriends] = useState<CheckedFriends>({});
    const [friends, setFriends] = useState<Array<TUser>>([]);
    const user =  useAppSelector(state =>state.user.currentUser);
    const [modalVisible, setModalVisible] = useState(false);
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

    const addGroupChat = async () => {
        const selectedFriendsIds = Object.keys(checkedFriends);
        const selectedFriendsNames = selectedFriendsIds.map(id => friends.find(f => f.id === id)?.name).filter(Boolean);
        const roomName = namegroupchat.trim() || `Nhóm của ${selectedFriendsNames.join(', ')}`;
        const newChatRoom: TRoomChat = {
            roomname: roomName,
            type: 2,
            members: [...selectedFriendsIds, user?.id!],
            lastmessAt: Date.now(),
            lastmesscontent: "",
            lastuser: null,
        };

        try {
            await firestore().collection('ROOMCHATS').add(newChatRoom);
            props.navigation.navigate("Friends");
        } catch (error) {
            console.error('Error creating chat room: ', error);
        }
    };
    const handleToggleAndRemove = (friendId: string) => {
        const newCheckedFriends = { ...checkedFriends };
        if (newCheckedFriends[friendId]) {
            delete newCheckedFriends[friendId];
        } else {
            newCheckedFriends[friendId] = true;
        }
        setCheckedFriends(newCheckedFriends);
        setModalVisible(Object.keys(newCheckedFriends).length > 0);
    };

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
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray,position:'relative'}}>
       
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
      <View style={{justifyContent:'center',marginTop:20,paddingHorizontal:15}} >
            <TText style={{color:colorMode.inverseBlack,fontWeight:'600'}}>Tên Nhóm</TText>
            <TextInput
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray,paddingLeft:20}]}
                placeholderTextColor={colorMode.textGray}
                placeholder='Nhập tên nhóm...'
                value={namegroupchat}
                onChangeText={setNameGroupChat}
            />
      </View>
       <ScrollView style={{paddingHorizontal:15,marginTop:20}}>
          <View style={{marginTop:30}}>
              {Object.keys(groupedFriends).sort().map(letter => (
                <View key={letter}>
                <Text style={{ fontWeight: 'bold', fontSize: 15,color:colorMode.inverseBlack }}>{letter}</Text>
                {groupedFriends[letter].map((friend,index) => (
                    <TouchableOpacity
                    onPress={() => handleToggleAndRemove(friend.id)}
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
                        <View style={{height:35,width:35,borderRadius:50,overflow:'hidden',justifyContent:'center',alignItems:'center'}}>
                            <FastImageRes uri={ friend.avatart}/>
                        </View>
                        <View>
                        <Text style={{fontWeight:'700',marginLeft:15,fontSize:16,color:colorMode.inverseBlack}}>{friend.name}</Text>
                        <Text style={{fontWeight:'600',marginLeft:15,fontSize:13,color:colorMode.inverseBlack}}>{friend.hashtagname}</Text>
                        </View>
                    </View>
                    <Checkbox
                        status={checkedFriends[friend.id] ? 'checked' : 'unchecked'}
                        onPress={() => handleToggleAndRemove(friend.id)}
                    />
                    </TouchableOpacity>    
                ))}
                </View>
            ))}
                
        </View>
        </ScrollView>    
             {modalVisible &&
            <View style={styles.modalContainer}>
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)']}
                    style={styles.gradient}
                    />
                    <View style={styles.modalView}> 
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                {Object.keys(checkedFriends).map(friendId => {
                                const friend = friends.find(f => f.id === friendId);
                                if (!friend) return null;
                                return (
                                    <TouchableOpacity key={friendId} style={styles.iconItem} onPress={() => handleToggleAndRemove(friendId)}>
                                        <View style={{ height: 50, width: 50, borderRadius: 50, overflow: 'hidden', justifyContent: 'center', alignItems: 'center' }}>
                                            <FastImageRes uri={friend.avatart} />
                                        </View>
                                        <View style={{ position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderRadius: 50, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'white' }}>
                                            <CancelIcon width={10} height={10} />
                                        </View>
                                    </TouchableOpacity>
                                );
                            })}
                        </ScrollView>
                        <TouchableOpacity onPress={addGroupChat} style={{height:50,width:50,borderRadius:50,overflow:'hidden',justifyContent:'center',alignItems:'center',marginHorizontal:10,backgroundColor:'#57AEEF'}}>
                           <ArrowRightIcon width={25} height={25}/>
                         </TouchableOpacity>
                    </View>
            </View>
             }           
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
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        height:80,
        width: '100%',
    },
    modalView: {
        marginTop:25,
        flexDirection:'row'
    }, 
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 10, 
        zIndex: 1, 
    },
    iconItem:{
        height:50,
        width:50,
        marginLeft:15
    }
  })

export default AddGroupChatScreen