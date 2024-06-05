import { View, Text, ScrollView, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
import { FastImageRes, formatTimestamp } from '../../shared/Reusables'
// @ts-ignore
import SmileIcon from '../../assets/voiceReaction.svg'
// @ts-ignore
import MicrophoneIcon from '../../assets/microphone.svg'
// @ts-ignore
import AngleRightIcon from '../../assets/angle-right.svg'
// @ts-ignore
import SendButtonIcon from '../../assets/sendButton.svg';
// @ts-ignore
import UploadIcon from '../../assets/uploadImageblack.svg'
// @ts-ignore
import PauseIcon from '../../assets/iconPause.svg'
// @ts-ignore
import PlayIcon from '../../assets/iconResume.svg'
// @ts-ignore
import StopIcon from '../../assets/rectangle.svg'

import { useAppSelector } from '../../shared/rdx-hooks'
import ImagePicker from 'react-native-image-crop-picker'
import firestore from '@react-native-firebase/firestore'
import { TMess } from '../../shared/types'
import storage from '@react-native-firebase/storage'
import LottieView from 'lottie-react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';


const RoomChatScreen = React.memo((props:any) => {
  const colorMode = useAppColor();
  const idRoomchat = useAppSelector(state =>state.main.idRoomchat);
  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: idRoomchat?.nameuser,
      headerTintColor: colorMode.inverseBlack,
    });
  }, [props.navigation]);
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
      <ScrollView showsHorizontalScrollIndicator={false} style={{flex: 1,flexDirection:'column'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
            <RoomChatHeader/>
            <MessItem/>
      </ScrollView>
      <ChatBox/>  
    </View>
  )
})
const RoomChatHeader = React.memo((props:any) =>{
  const idRoomchat = useAppSelector(state =>state.main.idRoomchat);
  const colorMode = useAppColor();
  return (
     <View style={{marginBottom:20,paddingHorizontal:15}}>
        <View style={styles.imageview} >
            <FastImageRes uri={idRoomchat?.image!}></FastImageRes>
        </View>
        <TText style={{fontWeight:'600',color:colorMode.inverseBlack,fontSize:30}}>{idRoomchat?.nameuser}</TText>
        {idRoomchat?.tagname ? (<TText style={{fontWeight:'600',color:colorMode.inverseBlack,fontSize:20}}>{idRoomchat?.tagname}</TText>):null}
        
        <TText style={{color:colorMode.inverseBlack}}>Đây là khời đầu cho cuộc trò chuyện huyền thoại giữa bạn và {idRoomchat?.nameuser}.</TText>
      </View>
  )
})

const MessItem = React.memo((props:any) =>{
    const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;
    const colorMode = useAppColor();
    const idRoomchat = useAppSelector(state =>state.main.idRoomchat);
    const [mess, setMess] = useState<TMess[]>([]);
    const [playTime, setPlayTime] = useState('00:00:00');
    const [duration, setDuration] = useState('00:00:00');
    const [playingId, setPlayingId] = useState<number | null>(null);
    useEffect(() => {
        if (!idRoomchat?.idroom) return;

        const roomChatDocRef = firestore()
          .collection('ROOMCHATS')
          .doc(idRoomchat.idroom)
          .collection('MESSAGES')
          .orderBy('messAt', 'asc');

        const unsubscribe = roomChatDocRef.onSnapshot(
          (snapshot) => {
            const fetchedMess = snapshot.docs.map((doc) => doc.data() as TMess);
            setMess(fetchedMess);
          },
          (error) => {
            console.error('Error fetching messages: ', error);
          }
        );

        return () => unsubscribe();
      }, [idRoomchat?.idroom]);

      const onStartPlay = async (item:TMess) => {
        if (!item.image) {
          console.log('No file URL available');
          return;
        }

        try {
          if (playingId !== null) {
            await onStopPlay();
          }
          setPlayingId(item.messAt);
          await audioRecorderPlayer.startPlayer(item.image);
          audioRecorderPlayer.addPlayBackListener((e) => {
            setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
            setDuration(audioRecorderPlayer.mmssss(Math.floor(e.duration)));
            if (e.currentPosition === e.duration) {
          setPlayingId(null);
          audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
        }
          });
        } catch (error) {
          console.error(error);
        }
      };

      const onStopPlay = async () => {
        try {
          await audioRecorderPlayer.stopPlayer();
          audioRecorderPlayer.removePlayBackListener();
          setPlayingId(null);
        } catch (error) {
          console.error(error);
        }
      };
  return (
    <View style={{flexDirection:'column'}}>
      {mess.map((item,index) =>(
      <View key={item.messAt} style={{flexDirection:'row',paddingHorizontal:15,marginBottom:10}}>
        <View style={styles.imageviewmess} >
            <FastImageRes uri={item.avatar}></FastImageRes>
        </View>
        <View style={{flexDirection:'column',marginLeft:15}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
            <TText style={{color:colorMode.inverseBlack,fontWeight:'600',fontSize:16}}>{item.name} </TText>
            <TText style={{color:colorMode.inverseBlack}}>{formatTimestamp(item.messAt)}</TText>
          </View>
          {item.messcontent ? (
              <>
                <TText style={{ color: colorMode.inverseBlack }}>{item.type === 'voice' ?"Đoạn ghi âm "+item.messcontent+ " giây" :item.messcontent}</TText>
                {item.type === 'image' && (
                  <View style={styles.imageViewChat}>
                    <FastImageRes uri={item.image} />
                  </View>
                )}
                {item.type === 'voice' && (
                    <TouchableOpacity onPress={()=> (playingId === item.messAt ? onStopPlay() : onStartPlay(item))}  style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                        {playingId === item.messAt ? (
                          <StopIcon width={13} height={13} />
                        ) : (
                          <PlayIcon width={25} height={25} />
                        )}
                    </TouchableOpacity>
                    
                )}
              </>
            ) : (
              item.type === 'image' && (
                <View style={styles.imageViewChat}>
                  <FastImageRes uri={item.image} />
                </View>
              )
            )}        
        </View>
      </View>
      ))}
     
    </View>
  )
})
const inputWidth = Dimensions.get('window').width * 0.6
const inputWidthWhenHasInput = Dimensions.get('window').width * 0.7;

const ChatBox = React.memo((props:any) =>{
  const [isVoice, setIsVoice] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [success, setSuccess] = useState(false); 
  const idRoomchat = useAppSelector(state =>state.main.idRoomchat);
  const user = useAppSelector(state =>state.user.currentUser);
  const colorMode = useAppColor();
  const [text, setText] = useState('');
  const [pathImage,setPathImage] = useState('');
  const sendMess = async() =>{
    try {
    const roomChatDocRef = firestore().collection('ROOMCHATS').doc(idRoomchat.idroom);
     const messRoomChatDocRef = roomChatDocRef.collection('MESSAGES');
     let newMess;
     if (pathImage) {
        setLoading(true);
        const fileName = `${Date.now()}.jpg`;
        const imageRef = storage().ref('chatrooms/').child(fileName);
        await imageRef.putFile(pathImage);
        const downloadUrl = await imageRef.getDownloadURL();
        newMess = {
          name: user?.name,
          avatar: user?.avatart,
          id: user?.id,
          messAt: Date.now(),
          messcontent: text,
          type: 'image',
          image: downloadUrl,
        };
        setLoading(false);
        setSuccess(true);
      }else {
        newMess = {
          name: user?.name,
          avatar: user?.avatart,
          id: user?.id,
          messAt: Date.now(),
          messcontent: text,
          type: 'text',
          image:''
        };
      }

      await messRoomChatDocRef.add(newMess);
      await roomChatDocRef.set(
        { lastmessAt: Date.now(), lastmesscontent: text, lastuser: user },
        { merge: true }
      );
      setText('');
    
    } catch (error) {
      console.error('Error creating server: ', error);
      if (pathImage) setLoading(false);
    }
      
  }

   const upLoadImage = () =>{
    ImagePicker.openPicker({
      cropping:true,
      mediaType:'photo'
    })
    .then(image => setPathImage(image.path))
    .catch(e => console.log(e.message))
  }

  const [recordSecs, setRecordSecs] = useState(0);
  const [recordTime, setRecordTime] = useState('00:00:00');
  const [filePath, setFilePath] = useState('');

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer()).current;

 const onStartRecord = async () => {
    try {
      const result = await audioRecorderPlayer.startRecorder();
      setFilePath(result);
      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordSecs(e.currentPosition);
        setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      });
      setIsVoice(true)
    } catch (error) {
      console.error(error);
    }
  };
  const onStopRecord = async () => {
    try {
      setIsVoice(false)
      const result = await audioRecorderPlayer.stopRecorder();
      audioRecorderPlayer.removeRecordBackListener();
      setRecordSecs(0);
      setRecordTime('00:00:00');
      uploadToFirebase(result);
    } catch (error) {
      console.error(error);
    }
  };

  const uploadToFirebase = async (uri:string) => {
    const roomChatDocRef = firestore().collection('ROOMCHATS').doc(idRoomchat.idroom);
    const messRoomChatDocRef = roomChatDocRef.collection('MESSAGES');
    const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    const storageRef = storage().ref(`audio/${filename}`);
    const task = storageRef.putFile(uri);

    task.on('state_changed', (snapshot) => {
      console.log('Progress', snapshot.bytesTransferred / snapshot.totalBytes);
    });

    task.then(async () => {
      const url = await storageRef.getDownloadURL();
      const  newMess = {
          name: user?.name,
          avatar: user?.avatart,
          id: user?.id,
          messAt: Date.now(),
          messcontent: recordTime,
          type: 'voice',
          image:url
        };
      await messRoomChatDocRef.add(newMess);
      await roomChatDocRef.set(
        { lastmessAt: Date.now(), lastmesscontent: 'Đã gửi đoạn ghi âm!', lastuser: user },
        { merge: true }
      );
    }).catch((error) => {
      console.error('Error uploading file:', error);
    });
  };

  return(
     <View style={{height:80,flexDirection:'row',paddingLeft:10,alignItems:'center'}}>
        {
           text.length > 0 ?
                    <View style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                        <AngleRightIcon width={18} height={18} />
                    </View>:
                    <>
                      {!isVoice ? 
                        <View onTouchEnd={onStartRecord} style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                            <MicrophoneIcon width={25} height={25} />
                        </View> :
                        <View  onTouchEnd={onStopRecord} style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                             <StopIcon width={13} height={13} />
                        </View>
                      }
                     
                        <View onTouchEnd={upLoadImage} style={[styles.icon_container, {backgroundColor: colorMode.appLightGray }]}>
                            <UploadIcon width={25} height={25} />
                        </View>
                    </>         
        }
        <View style={{position:'relative',justifyContent:'center',marginRight:6}}>
            <TextInput 
                style={[styles.inputStyle,text.length > 0 && {width: inputWidthWhenHasInput},{backgroundColor:colorMode.appLightGray}]}
                multiline={true}
                placeholderTextColor={colorMode.textGray}
                placeholder='Nhắn #chào-mừng-bạn'
                onChangeText={setText}
                defaultValue={text}
            />
            <SmileIcon width={25} height={25} style={{position:'absolute',right:8}}/>
        </View>
        <View onTouchEnd={sendMess} style={[styles.icon_container,{backgroundColor:colorMode.appLightGray}]}>
                    <View style={[styles.icon_container, {backgroundColor: colorMode.blurple, alignItems: 'center', justifyContent: 'center' ,marginLeft:5}]}>
                        <SendButtonIcon width={18} height={18} />
                    </View>

        </View>
         {loading && !success && (
                    <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 1, justifyContent:'center', alignItems:'center'}}>
                        <LottieView source={require('../../assets/lottie/loading.json')} autoPlay loop={true} style={{width:250,height:250}}/>
                    </View>
          )}
    </View>
  )
})

const styles = StyleSheet.create({
    imageview:{
        width: 80,
        height: 80,
        borderRadius: 50,
        overflow:'hidden',
        marginBottom:10
    } ,
    imageviewmess:{
        width: 40,
        height: 40,
        borderRadius: 50,
        overflow:'hidden',
    },
    icon_container:{
        width:40,
        height:40,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        marginRight:6
    },
    inputStyle:{
        minHeight:40,
        maxHeight:120,
        width:inputWidth,
        borderBottomWidth:0,
        borderRadius:20,
        paddingLeft:15,
        paddingRight:35,
        paddingVertical:0,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
    imageViewChat:{
      width: 300,
      height: 180,
      overflow:'hidden',
      borderRadius: 10,
      marginTop:8,
      borderWidth:1,
      borderColor:'#ccc'
    }
  })


export default RoomChatScreen