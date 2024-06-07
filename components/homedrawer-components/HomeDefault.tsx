import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { TText } from '../../themed/themeComponents'
// @ts-ignore
import HashTagIcon from '../../assets/channelText.svg'
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
// @ts-ignore
import UserIcon from '../../assets/users.svg'
// @ts-ignore
import BackIcon from '../../assets/back.svg'
// @ts-ignore
import SpeakerIcon from '../../assets/speaker.svg';
import useAppColor from '../../themed/useAppColor'
import { useIsFocused } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks'
import { setHideBottomTab, setOpenRightDrawer } from '../../shared/rdx-slice'
import ChatBox from './ChatBox'
import WelcomeMessage from './WelcomeMessage'
import MessageBox from './MessageBox'
import { FastImageRes } from '../../shared/Reusables'
import { PermissionsAndroid, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore'
// Import Agora SDK
import {
    ClientRoleType,
    createAgoraRtcEngine,
    IRtcEngine,
    ChannelProfileType,
} from 'react-native-agora';
import { TUser } from '../../shared/types'

const appId = '1e1b34450d00434287013237b1da550b';
const token = '007eJxTYOD60hMWGfG/XGjqXOXa/Vc/xfIesOKc+zflWPobti1zM3YrMBimGiYZm5iYGqQYGJgYmxhZmBsYGhsZmycZpiSamhokqTjGpzUEMjKs6ZvLzMgAgSA+N0NRfn5uckZiXl5qDgMDAChnIao=';
const channelName = 'roomchannel';
const uid = Math.floor(Math.random() * 99999999);

const HomeDefault = React.memo((props: any) =>{
    const chanel = useAppSelector(state=>state.server.channelData);
    const colorMode = useAppColor();
    const isFocused = useIsFocused();
     useEffect(()=> {
        if(isFocused){
            // dispatch(setHideBottomTab(true));
        }
     },[isFocused])
    return(
        <View style={[styles.mainStyle,{backgroundColor:colorMode.inverseWhiteGray,flex:1}]}>
            <HomeDefaultHeader navigation={props.navigation}/>
            {chanel?.type === "voice" && <VoiceRoom/>}
            <ScrollView showsVerticalScrollIndicator={false} style={{flex:1,flexDirection:'column'}} contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end'}}>
                    <WelcomeMessage/>
                    <MessageBox/>
            </ScrollView>
            <ChatBox />
        </View>
    )
})

const HomeDefaultHeader = React.memo(({navigation} : {navigation:any}) =>{
    const isFocused = useIsFocused();  
    const colorMode = useAppColor();
    const channel = useAppSelector(state => state.server.channelData);
    const dispatch = useAppDispatch()
     useEffect(()=> {
        if(isFocused){
            navigation.openDrawer()
        }
     },[isFocused])
    return (
        <View style={[styles.titlechannel,{backgroundColor:colorMode.inverseWhiteLightGray,}]}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={{marginLeft:14,marginRight:8}} onTouchEnd={() => navigation.openDrawer()}>
                    <BackIcon width={25} height={25}></BackIcon>
                </View>

                <View style={{flexDirection:'row',alignItems:'center',marginLeft:12}}>
                    {
                        channel?.type === 'text' ?
                         <HashTagIcon width={25} height={25}/>:
                         <SpeakerIcon width={25} height={25}/>
                    }
                    <TText fontFamily='bold' style={{fontWeight:'bold', marginLeft:5,color:colorMode.inverseBlack,fontSize:16}} numberOfLines={1}>{channel?.title}</TText>
                </View>
            </View>
         
            <View style={{flexDirection:'row'}}>

            <TouchableOpacity style={{justifyContent:'center',marginRight:10,backgroundColor:'#ccc',height:32,width:32,borderRadius:50}}>
                  <SearchIcon width={22} height={22} style={{alignSelf:'center'}}/>
            </TouchableOpacity>
             <TouchableOpacity onPress={()=>dispatch(setOpenRightDrawer(true))} style={{justifyContent:'center',alignItems:'center',marginRight:15,backgroundColor:'#ccc',height:32,width:32,borderRadius:50}}>
                  <UserIcon  width={22} height={22}/>
             </TouchableOpacity>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    mainStyle:{

    },
    titlechannel:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingVertical:10,
        borderBottomWidth:.5,
        borderColor:'lightgray'
    }
})

const getPermission = async () => {
    if (Platform.OS === 'android') {
        await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);
    }
};

const VoiceRoom = React.memo((props:any) =>{
    const user = useAppSelector(state =>state.user.currentUser);
    const [members,setMembers] = useState<TUser[]>([])
    const colorMode = useAppColor();

    const channel = useAppSelector(state => state.server.channelData);
    useEffect(() =>{
        if(channel?.id){
            const channelVoiceDocRef = firestore().collection('CHANNELVOICES').doc(channel.id).collection("listmember");
            const unsubscribe = channelVoiceDocRef.onSnapshot(
            (snapshot) => {
              const fetchedMembers = snapshot.docs.map((doc) => doc.data() as TUser);
              setMembers(fetchedMembers);
            },
            (error) => {
              console.error('Error fetching servers: ', error);
            }
          );
  
          return () => unsubscribe();
        }
    },[channel?.id])

    const agoraEngineRef = useRef<IRtcEngine>(); // IRtcEngine instance
    const [isJoined, setIsJoined] = useState(false); // Whether the local user has joined the channel
    const [remoteUid, setRemoteUid] = useState(0); // Remote user UID
    const [message, setMessage] = useState(''); // User prompt message
    useEffect(() => {
        setupVideoSDKEngine();
    });
    const setupVideoSDKEngine = async () => {
        try {
            // Create RtcEngine after checking and obtaining device permissions
            if (Platform.OS === 'android') {
                await getPermission();
            }
            agoraEngineRef.current = createAgoraRtcEngine();
            const agoraEngine = agoraEngineRef.current;
            // Register event callbacks
            agoraEngine.registerEventHandler({
                onJoinChannelSuccess: () => {
                    showMessage('Successfully joined the channel: ' + channelName);
                    setIsJoined(true);
                },
                onUserJoined: (_connection, Uid) => {
                    showMessage('Remote user ' + Uid + ' has joined');
                    setRemoteUid(Uid);
                },
                onUserOffline: (_connection, Uid) => {
                    showMessage('Remote user ' + Uid + ' has left the channel');
                    setRemoteUid(0);
                },
            });
            // Initialize the engine
            agoraEngine.initialize({
                appId: appId,
            });
        } catch (e) {
            console.log(e);
        }
    };
    // Display message
    function showMessage(msg: string) {
        setMessage(msg);
    }
    const channelVoiceDocRef = firestore().collection('CHANNELVOICES');
    // Define the join method called after clicking the join channel button
    const join = async () => {
        if (isJoined) {
            return;
        }
        try {
            // Set the channel profile type to communication after joining the channel
            agoraEngineRef.current?.setChannelProfile(
                ChannelProfileType.ChannelProfileCommunication,
            );
            // Call the joinChannel method to join the channel
            agoraEngineRef.current?.joinChannel(token, channelName, uid, {
                // Set the user role to broadcaster
                clientRoleType: ClientRoleType.ClientRoleBroadcaster,
            });
             if(channel?.id && user?.id){
                 await channelVoiceDocRef.doc(channel?.id).collection("listmember").doc(user?.id).set(user!);
             }
        } catch (e) {
            console.log(e);
        }
    };
    // Define the leave method called after clicking the leave channel button
    const leave = async() => {
        try {
            // Call the leaveChannel method to leave the channel
            agoraEngineRef.current?.leaveChannel();
            setRemoteUid(0);
            setIsJoined(false);
            showMessage('Left the channel');
            if(channel?.id && user?.id){
                await channelVoiceDocRef.doc(channel?.id).collection("listmember").doc(user?.id).delete();
            }
        } catch (e) {
            console.log(e);
        }
    };
    return(
         <ScrollView style={{flex:1, borderBottomWidth:1,borderColor:'#E5E5E6'}}>
            <View style={{flexDirection:'row',paddingHorizontal:10,justifyContent:'center',marginTop:15}}>
                {!isJoined ? <TouchableOpacity onPress={join} style={{backgroundColor:'#4AE860',paddingHorizontal:10,paddingVertical:5,borderRadius:10}} >
                    <TText style={{color:'white'}}>Tham gia phòng</TText>
                </TouchableOpacity> :
                <TouchableOpacity onPress={leave} style={{backgroundColor:'#F04C4C',paddingHorizontal:10,paddingVertical:5,borderRadius:10}}>
                    <TText style={{color:'white'}}>Rời phòng</TText>
                </TouchableOpacity>
                }                       
            </View>
            {members.map((item) => (
                <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center',margin:10 }}>
                        <View style={{height:35,width:35,borderRadius:50,overflow:'hidden',justifyContent:'center',alignItems:'center'}}>
                            <FastImageRes uri={ item.avatart!}/>
                        </View>
                        <View>
                        <Text style={{fontWeight:'700',marginLeft:10,fontSize:16,color:colorMode.inverseBlack}}>{item.name}</Text>
                        </View>
                </View>
            ))}             
            </ScrollView>
    )
})
export default HomeDefault