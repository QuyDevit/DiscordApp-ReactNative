import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import FriendIcon from '../../assets/addfriend.svg'
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
// @ts-ignore
import NewMessIcon from '../../assets/newMessage.svg'
import { FastImageRes, formatTimeAgo, generateUniqueHashtagName } from '../../shared/Reusables'
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks'
import { setHideBottomTab, setIdRoomChat } from '../../shared/rdx-slice'
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore'
import { TRoom, TRoomChat, TRoomChatWithAvatar, TUser } from '../../shared/types'

const FriendsScreen = React.memo( (props: any) => {
    const [roomChats, setRoomChats] = useState<TRoomChatWithAvatar[]>([]);
    const dispatch = useAppDispatch();
    const user =  useAppSelector(state =>state.user.currentUser);
    const [friends, setFriends] = useState<Array<TUser>>([]);
    const [text, setText] = useState('');
  const { navigation } = props;
  const colorMode = useAppColor();
    const onPress = (choose:number) => () =>{
      if(choose === 0){
        navigation.navigate('AddFriend')
      }else{
        navigation.navigate('Newchat')
      }
        dispatch(setHideBottomTab(true))
    }

  useFocusEffect(
    useCallback(() => {
    dispatch(setHideBottomTab(false))
    }, [])
  );
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
    useEffect(() =>{
      if(user?.id){
        const roomChatDocRef = firestore().collection('ROOMCHATS');
        const roomChatOneToOneDocRef = roomChatDocRef
        .where('members', 'array-contains', user?.id);
  
          const unsubscribe = roomChatOneToOneDocRef.onSnapshot( async snapshot => {
          const fetchedRoomChat = snapshot.docs.map(doc => ({
            idroom:doc.id,
            ...doc.data(),
          })) as TRoomChatWithAvatar[];
          const roomChatsWithAvatars = await Promise.all(fetchedRoomChat.map(async (roomChat) => {
            const opponentId = roomChat.members.find(memberId => memberId !== user?.id);
            if (opponentId) {
              const userDoc = await firestore().collection('USERS').doc(opponentId).get();
              const userData = userDoc.data();
              return {
                ...roomChat,
                opponentAvatar: userData?.avatart ? userData?.avatart : "",
                name:userData?.name ?userData?.name: "",
                tagname:userData?.hashtagname ? userData?.hashtagname : ""
              };
            }
            return roomChat;
          }));
          setRoomChats(roomChatsWithAvatars);
          }, error => {
          console.error('Lỗi khi lấy room chat: ', error);
        });
  
        return () => unsubscribe();
      }
    },[user?.id])

    const filteredChats = roomChats.filter(chat => {
            const chatName = chat.type === 1 ? chat.name! : chat.roomname!;
            return chatName.toLowerCase().includes(text.toLowerCase()) || 
                   chat.lastmesscontent.toLowerCase().includes(text.toLowerCase());
    });

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
          navigation.navigate("RoomChat");
        } catch (error) {
          console.error("Error in chatOneToOne:", error);
        }
    }
    const openRoomchat = (roomchat :TRoomChatWithAvatar) =>{
      let ChatRoom ={} as TRoom;
      if(roomchat.type === 1){
        ChatRoom = {idroom: roomchat?.idroom!, nameuser: roomchat?.name!,tagname:roomchat?.tagname!,image:roomchat.opponentAvatar!}
      }else{
        ChatRoom = {idroom: roomchat?.idroom!, nameuser: roomchat?.roomname!,tagname:'',image:'https://cdn-icons-png.flaticon.com/512/921/921347.png'!}
      }

        dispatch(setIdRoomChat(ChatRoom));
          dispatch(setHideBottomTab(true));
          navigation.navigate("RoomChat");
    }

  return (
    <View style={{backgroundColor:colorMode.inverseWhiteGray,position:'relative',flex:1}}>
      <TouchableOpacity onPress={onPress(1)} style={styles.newmessage}>
        <NewMessIcon width={30} height={30}/>
      </TouchableOpacity>
      <View>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:15,paddingHorizontal:15}}>
        <TText style={{fontWeight:'bold',fontSize:20,color:colorMode.inverseBlack}}>Các tin nhắn</TText>
        <TouchableOpacity onPress={onPress(0)} style={{paddingHorizontal:15,paddingVertical:8,backgroundColor:colorMode.appGray,borderRadius:20,flexDirection:"row",alignItems:'center'}}>
            <FriendIcon width={16} height={16}/>
            <TText style={{fontWeight:'bold',marginLeft:5,color:colorMode.inverseBlack}}>Thêm bạn bè</TText>
        </TouchableOpacity>
      </View>
       <View style={{position:'relative',justifyContent:'center',marginTop:20,paddingHorizontal:15}} >
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                placeholder='Tìm kiếm đoạn chat...'
                value={text}
                onChangeText={setText}
            />
            <View style={{position:'absolute',left:20,top:10}}>
                <SearchIcon width={25} height={25}/>
            </View>
      </View>
  
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical:15}}>
        {friends.map(item => (
          <TouchableOpacity onPress={() => chatOneToOne(item)} key={item.id} style={[styles.friendItem,{backgroundColor:colorMode.appGray}]}>
              <View style={styles.imageview} >
                    <FastImageRes uri={item.avatart}></FastImageRes>
                </View>
                <View style={[styles.statusIndicator,{backgroundColor: item.status === 1 ? '#55A74E' : item.status === 2 ?'red':'#6A6A6A'}]} />
          </TouchableOpacity>
        ))}
     
  
      </ScrollView>
      </View>
      <ScrollView style={{paddingHorizontal:10}}>
        {
          filteredChats.map((item,index) =>(
            <View key={item.lastmessAt}>
          <TouchableOpacity onPress={() => openRoomchat(item)} style={{flexDirection:'row',padding:10,borderRadius:10,}}>
            <View style={styles.imageview} >
                  <FastImageRes uri={item.type===1 ? item.opponentAvatar! :'https://cdn-icons-png.flaticon.com/512/921/921347.png'}></FastImageRes>
            </View>
            <View style={{justifyContent:'center',marginLeft:10,flex:1}}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <TText style={{fontWeight:'bold',color:colorMode.inverseBlack}}>{item.type===1 ?item.name : item.roomname}</TText>
                <TText style={{fontWeight:'bold',color:colorMode.inverseBlack}}>{formatTimeAgo(item.lastmessAt)}</TText>
              </View>
              {item.lastuser === null  ? (
                 <TText style={{color:colorMode.inverseBlack}}>Chưa có tin nhắn</TText>

              ): (
                item.lastmesscontent === "" ? 
                      <TText style={{color:colorMode.inverseBlack}}>{item.lastuser?.id === user?.id  ? 'Bạn:':item.lastuser?.name} Đã gửi hình ảnh!</TText>:
                      <TText style={{color:colorMode.inverseBlack}}>{item.lastuser?.id === user?.id  ? 'Bạn:':item.lastuser?.name} {item.lastmesscontent}</TText>
                )
              }
             
            </View>
          </TouchableOpacity>
          </View>
          ))
        }         
      </ScrollView>
    </View>
  )
})

const styles = StyleSheet.create({
    newmessage:{
      position:'absolute',
      width:50,
      height:50,
      backgroundColor:'#5E71EC',
      borderRadius:50,
      bottom:20,
      right:15,
      zIndex:10,
      justifyContent:'center',
      alignItems:'center'
    },
    friendItem:{
        paddingVertical:20,
        position:'relative',
        marginLeft:10,
        height:80,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    inputStyle:{

        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingRight:15,
        paddingLeft:45,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
    imageview:{
        width: 45,
        height: 45,
        borderRadius: 50,
        overflow:'hidden'
    },
    statusIndicator: {
      position: 'absolute',
      height: 12,
      width: 12,
      borderWidth:2,
      borderColor:'white',
      borderRadius: 50,
      bottom: 15,
      right: 22,
    },
  })

export default FriendsScreen