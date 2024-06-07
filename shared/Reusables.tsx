import { TextInput } from "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import FastImage from 'react-native-fast-image'
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { TText } from "../themed/themeComponents";
// @ts-ignore
import PlusIcon from '../assets/guildAddRole.svg'
// @ts-ignore
import PlusIconServer from '../assets/guildAddServer.svg'
// @ts-ignore
import AngleDownIcon from '../assets/guildDropdownMenu.svg'
// @ts-ignore
import HashTagIcon from '../assets/channelText.svg'
import BottomSheet from '@devvie/bottom-sheet';
import useAppColor from "../themed/useAppColor";
// @ts-ignore
import MessageIcon from '../assets/iconMessage.svg'
// @ts-ignore
import CopyLinkIcon from '../assets/copylink.svg'
// @ts-ignore
import ShareIcon from '../assets/shareinvite.svg'
// @ts-ignore
import MailIcon from '../assets/iconMail.svg'
// @ts-ignore
import MessagerIcon from '../assets/messagerfb.svg'
// @ts-ignore
import ZaloIcon from '../assets/zalo.svg'
// @ts-ignore
import TiktokIcon from '../assets/tiktok.svg'
// @ts-ignore
import SpeakerIcon from '../assets/speaker.svg';
import { FlashList } from "@shopify/flash-list";
import { useAppDispatch, useAppSelector } from "./rdx-hooks";
import { clearUser, setUser } from "./userSlice";
import { TChannel, TChannelSection, TChannelType, TServerData, TUser } from "./types";
import { clearChannelData, clearServerData, clearServers, setChannelData, setServerData } from "./serverSlice";
import { Dispatch } from "@reduxjs/toolkit";
import { ChannelListContent } from "./constants";
import { format } from 'date-fns';
import { setChannelSection, setHideBottomTab } from "./rdx-slice";

export const ServerIcon = React.memo((props:any) =>{
    const colorMode = useAppColor()
    return (
        <TouchableOpacity onPress={props.onPress} style={{width:'100%',alignItems:'center',marginBottom:10,position:'relative'}}>
            <View style={{position:'absolute',left:0,width:5,borderRadius:6,height:props.isSelected ? '100%' : '0%',backgroundColor:colorMode.inverseBlack}}></View>
            <View style={{width:50,height:50,borderRadius:props.isSelected ?15 : 50,overflow:'hidden'}}>
                <FastImageRes uri={props.uri}/>
            </View>      
        </TouchableOpacity>
    )
})

export const AddServerIcon = React.memo((props:any) =>{
    return (
        <TouchableOpacity onPress={props.onPress} style={{width:'100%',alignItems:'center',marginBottom:10}}>
            <View style={{width:50,height:50,borderRadius:props.isSelected ?15 : 50,overflow:'hidden',backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>                     
                <PlusIconServer width={30} height={30}/>
            </View>      
        </TouchableOpacity>
    )
})

export const FastImageRes = React.memo(({uri}:{uri:string}) =>{
    return(
        <FastImage
        style={{width:'100%',height:'100%'}}
        source={{
        uri: uri,
        headers:{ Authorization: 'someAuthToken' },
        priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
    />
    )
})

const ChannelListHeader = React.memo((props: {channelSection:TChannelSection,server:TServerData,navigation:any}) => {
  const user = useAppSelector(state=>state.user.currentUser);
  const colorMode = useAppColor();
  const dispatch = useAppDispatch();
  const onPress = () =>{
    props.navigation.navigate("AddChannel")
    dispatch(setChannelSection(props.channelSection?.id))
    dispatch(setHideBottomTab(true))
  }
  return (
        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AngleDownIcon width={25} height={25} />
            <TText style={{ fontWeight: 'bold', fontSize: 17,color:colorMode.inverseBlack }} fontFamily="bold">{props.channelSection?.category}</TText>
          </View>
          {props.server.createby === user?.id &&  <TouchableOpacity onPress={onPress}><PlusIcon width={20} height={20} /></TouchableOpacity> }
         
        </View>
  );
});

export const ChannelListSection = React.memo((props:any) =>{
    const dispatch = useAppDispatch();
    const channelData = useAppSelector(state => state.server.channelData);
    const usechannelListContentIn = React.useContext(ChannelListContent);
    const handleChannelClick = (channel: TChannel) => {
        dispatch(setChannelData(channel));
        usechannelListContentIn.navigation.closeDrawer();
    };
    const serverdata = useAppSelector(state => state.server.serverData);
    return(
      <ScrollView showsVerticalScrollIndicator={false}>
        {serverdata?.channels?.map(item =>(
        <View key={item.id} style={{width:'100%',paddingHorizontal:8,}}>
            <ChannelListHeader channelSection={item} server={serverdata} navigation={usechannelListContentIn.navigation}/>
            {item.items?.map(channel =>(
              <View key={channel.id}>
                <ChannelListItem 
                  title={channel.title} 
                  type={channel.type} 
                  onClick={() => handleChannelClick(channel)}
                  selected={channelData?.id === channel.id}/>
              </View>
            ))}
        </View>
        ))}
      </ScrollView>
    )
})

export const ChannelListItem= React.memo((props:{title:string;type:TChannelType;onClick?:Function;selected:boolean}) =>{
    const [isPressed, setIsPressed] = useState(false);
      const colorMode = useAppColor();
    return(
        <TouchableOpacity
            style={{width:'100%',paddingHorizontal:10,flexDirection:'row',alignItems:'center',paddingVertical:5,marginBottom:10,borderRadius:5, backgroundColor: props.selected ? 'rgba(0,0,0,0.1)' : 'transparent'}}
            activeOpacity={1}
            onPressIn={() => setIsPressed(true)} 
            onPressOut={() => setIsPressed(false)} 
            onPress={() => props.onClick?.()}  
        >
          {
            props.type === 'text' ?
            <HashTagIcon width={22} height={22}/>:
            <SpeakerIcon width={22} height={22}/>
          }

            <TText style={{fontSize:15,marginLeft:6,color:colorMode.inverseBlack}} numberOfLines={1}>{props.title}</TText>
        </TouchableOpacity>
    )
})

export const CustomBottomSheet = React.memo(React.forwardRef((props:any, ref:any) =>{
    const colorMode = useAppColor();
    return(
      <BottomSheet 
        {...props}
        style={{backgroundColor:'transparent'}}
        dragHandleStyle={{backgroundColor:'white',opacity:.9,width:50,top:10}}
        ref={ref}>
        <View style={{width:'100%',height:'100%',backgroundColor:colorMode.inverseWhiteGray,borderTopLeftRadius:10,borderTopRightRadius:10}}>
            {props.children}            
        </View>
      </BottomSheet>
    )
}))

export const ShareApp = React.memo((props:any) =>{
    const colorMode = useAppColor();
    return(
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginTop:30,paddingBottom:20,borderBottomWidth:1,borderColor:'#DBDADA',paddingHorizontal:10}}>
          {[
            {icon: ShareIcon, title: 'Chia Sẻ Lời Mời'},
            {icon: CopyLinkIcon, title: 'Sao Chép Link'},
            {icon: MessageIcon, title: 'Tin Nhắn'},
            {icon: MailIcon, title: 'Email'},
            {icon: MessagerIcon, title: 'Messenger'},
            {icon: ZaloIcon, title: 'Zalo'},
            {icon: TiktokIcon, title: 'Tiktok'},
          ].map((item, index) => (
            <TouchableOpacity key={index} style={styles.iconItem}>
              <View style={[styles.iconContainer, {backgroundColor: colorMode.appGray}]}>
                <item.icon width={28} height={28} />
              </View>
              <TText style={[styles.titleIcon,{color:colorMode.inverseBlack}]}>{item.title}</TText>
            </TouchableOpacity>
          ))}
        </ScrollView>
    )
})
  GoogleSignin.configure({
        webClientId: '37649063976-e25on5npc7m118t9mnv2jruo3g9onnr2.apps.googleusercontent.com',
    });


export const handleGoogleSignIn = async (): Promise<TUser> => {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        const userCredential = await auth().signInWithCredential(googleCredential);

        const user = userCredential.user;
        const userDocRef = firestore().collection('USERS').doc(user.uid);

        const userDoc = await userDocRef.get();
        if (userDoc.exists) {
            // console.log("User đã tồn tại:", userDoc.data());
            return userDoc.data() as TUser;
        } else {
            const newUser: TUser = {
                id: user.uid,
                name: user.displayName || '',
                email: user.email || '',
                hashtagname:generateUniqueHashtagName(user.displayName?user.displayName:''),
                pass: '', 
                phone: user.phoneNumber || '',
                birthday: '', 
                avatart:user.photoURL || '',
                status:1,
                listfriend:[],
                nitro:false
            };

            await userDocRef.set(newUser);
            // console.log("Đã tạo user mới");
            return newUser;
        }
    } catch (error) {
        // console.error(error);
        throw new Error("Đăng nhập thất bại " + error);
    }
};


const removeDiacritics = (str:string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
// Hàm tạo hashtagname duy nhất
export const generateUniqueHashtagName = (name: string): string => {
    const sanitized = removeDiacritics(name.toLowerCase().replace(/\s/g, '_')); // Chuyển đổi tên thành chuỗi không dấu và không có khoảng trắng
    const randomNumber = Math.floor(100000 + Math.random() * 900000); // Sinh số ngẫu nhiên

    return `${sanitized}#${randomNumber}`; // Kết hợp tên và số ngẫu nhiên để tạo hashtagname
};
export const userLogout = () => {
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const providers = currentUser.providerData.map(provider => provider.providerId);

        if (providers.includes('google.com')) {
          await GoogleSignin.revokeAccess();
        }

        const userId = currentUser.uid;
        if (userId) {
          const userDocRef = firestore().collection('USERS').doc(userId);
          await userDocRef.set({ status: 0 }, { merge: true });
        }

        await auth().signOut();

        // Dispatch actions to clear user data
        dispatch(clearUser());
        dispatch(clearServers());
        dispatch(clearServerData());
        dispatch(clearChannelData());
      } else {
        console.warn("Không có người dùng nào đang đăng nhập");
      }
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return logout;
};

export const getdataServer = async(idserver:string,dispatch:Dispatch) =>{
     try {
      const serverDocRef = firestore().collection('SERVERS').doc(idserver);
      const serverDoc = await serverDocRef.get();

      if (serverDoc.exists) {
        dispatch(setServerData(serverDoc.data() as TServerData));

      } else {
        console.log('Document does not exist!');
      }
    } catch (error) {
      console.error('Error fetching server data:', error);
    }
}

export const formatTimestamp = (timestamp: number) => {
  return format(new Date(timestamp), 'dd/MM/yyyy HH:mm');
};

export const formatTimeAgo = (timestamp:number) => {
  const now = Date.now();
  const timeDiff = now - timestamp;

  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (seconds < 60) {
    return `${seconds} giây trước`;
  } else if (minutes < 60) {
    return `${minutes} phút trước`;
  } else if (hours < 24) {
    return `${hours} giờ trước`;
  } else if (days < 30) {
    return `${days} ngày trước`;
  } else if (months < 12) {
    return `${months} tháng trước`;
  } else {
    return `${years} năm trước`;
  }
}

export const modeltype1 = () => {
    return [
      {
        id: firestore().collection('SERVERS').doc().id,
        category: 'Kênh chat',
        items: [{ id: firestore().collection('SERVERS').doc().id, title: 'Chung', type: 'text' as TChannelType}],
      },
      {
        id: firestore().collection('SERVERS').doc().id,
        category: 'Kênh đàm thoại',
        items: [{ id: firestore().collection('SERVERS').doc().id, title: 'Chung', type: 'voice' as TChannelType}],
      },
    ];
};
export const modeltype2 = () => {
    return [
      {
        id: firestore().collection('SERVERS').doc().id,
        category: 'Quy tắc',
        items: [
            { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo tổng', type: 'text' as TChannelType},
            { id: firestore().collection('SERVERS').doc().id, title: 'giới-thiệu-và-nội-quy', type: 'text' as TChannelType}
        ],
      },
      {
        id: firestore().collection('SERVERS').doc().id,
        category: 'Chat',
        items: [
            { id: firestore().collection('SERVERS').doc().id, title: 'thảo-luận-game', type: 'text' as TChannelType},
        ],
      },
      {
        id: firestore().collection('SERVERS').doc().id,
        category: 'Kênh đàm thoại',
        items: [{ id: firestore().collection('SERVERS').doc().id, title: 'Chung', type: 'voice' as TChannelType}],
      },
    ];
};
export const modeltype3 = () => {
  return [
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Quy tắc',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo tổng', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Giới thiệu và Nội quy', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thông báo',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo họp mặt', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo sự kiện', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Học tập',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận môn Toán', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận môn Văn', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận môn Anh', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Hoạt động ngoại khóa',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận CLB Bóng đá', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận CLB Âm nhạc', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận CLB Sách', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thảo luận chung',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Chia sẻ tài liệu', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Kênh đàm thoại',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận chung', type: 'voice' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Họp nhóm học tập', type: 'voice' as TChannelType},
      ],
    },
  ];
};

export const modeltype4 = () => {
  return [
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Quy tắc',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo tổng', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Giới thiệu và Nội quy', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thông báo',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo bài tập mới', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo kiểm tra', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Tài liệu học tập',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Chia sẻ tài liệu môn Toán', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Chia sẻ tài liệu môn Văn', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Chia sẻ tài liệu môn Anh', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Lớp học trực tuyến',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Toán học', type: 'voice' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Văn học', type: 'voice' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Anh ngữ', type: 'voice' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Hỏi đáp',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Hỏi đáp Toán học', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Hỏi đáp Văn học', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Hỏi đáp Anh ngữ', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thảo luận chung',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận nhóm', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Chia sẻ kinh nghiệm học tập', type: 'text' as TChannelType},
      ],
    },
  ];
};

export const modeltype5 = () => {
  return [
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Quy tắc',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo tổng', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Giới thiệu và Nội quy', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thông báo',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo chung', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thảo luận chung',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Trò chuyện', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Chia sẻ kỷ niệm', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Sự kiện',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Sự kiện sắp tới', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Kế hoạch cuối tuần', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Chia sẻ hình ảnh',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Ảnh du lịch', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Ảnh tiệc tùng', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Kênh đàm thoại',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Phòng chat chung', type: 'voice' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Phòng họp nhóm', type: 'voice' as TChannelType},
      ],
    },
  ];
};

export const modeltype6 = () => {
  return [
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Quy tắc',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo tổng', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Giới thiệu và Nội quy', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thông báo',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo sáng tạo', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thảo luận sáng tạo',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Ý tưởng mới', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Phản hồi và Góp ý', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Chia sẻ tác phẩm',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Tác phẩm nghệ thuật', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Video và Âm nhạc', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Tài nguyên',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Tài liệu học tập', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Công cụ và Phần mềm', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Hợp tác',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Tìm kiếm đối tác', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Dự án chung', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Kênh đàm thoại',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Phòng họp sáng tạo', type: 'voice' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Phòng thảo luận dự án', type: 'voice' as TChannelType},
      ],
    },
  ];
};

export const modeltype7 = () => {
  return [
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Quy tắc',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo tổng', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Giới thiệu và Nội quy', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Thông báo',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thông báo cộng đồng', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Sự kiện',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Sự kiện sắp tới', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Hoạt động tình nguyện', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Hoạt động xã hội',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Thảo luận chung', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Nhóm thể thao', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Tin tức địa phương',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Tin tức hàng ngày', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Bản tin cộng đồng', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Tài nguyên và hỗ trợ',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Dịch vụ công cộng', type: 'text' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Hỗ trợ khẩn cấp', type: 'text' as TChannelType},
      ],
    },
    {
      id: firestore().collection('SERVERS').doc().id,
      category: 'Kênh đàm thoại',
      items: [
        { id: firestore().collection('SERVERS').doc().id, title: 'Trò chuyện chung', type: 'voice' as TChannelType},
        { id: firestore().collection('SERVERS').doc().id, title: 'Họp cộng đồng', type: 'voice' as TChannelType},
      ],
    },
  ];
};

const styles = StyleSheet.create({
    iconItem:{
      width:70,
      alignItems:'center'
    },
    titleIcon:{
      fontSize:13,
      fontWeight:'bold',
      color:'black',
      textAlign:'center'
    },
    iconContainer:{
      width:50,
      height:50,
      borderRadius:50,
      justifyContent:'center',
      alignItems:'center',
      marginBottom:6
    }
})