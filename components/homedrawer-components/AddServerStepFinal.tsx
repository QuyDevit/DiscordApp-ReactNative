import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button, Image } from 'react-native'
import React, { useState } from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import UploadIcon from '../../assets/uploadImage.svg'
// @ts-ignore
import PlusIcon from '../../assets/guildAddWhite.svg'
// @ts-ignore
import CancelIcon from '../../assets/guildSearchCancelWhite.svg'
import firestore from '@react-native-firebase/firestore'
import ImagePicker from 'react-native-image-crop-picker';
import { useAppSelector } from '../../shared/rdx-hooks'
import { modeltype1, modeltype2, modeltype3, modeltype4, modeltype5, modeltype6, modeltype7 } from '../../shared/Reusables'
import { TServerData } from '../../shared/types'
import storage from '@react-native-firebase/storage'
import LottieView from 'lottie-react-native';
import { showMessage, hideMessage } from "react-native-flash-message";

const AddServerStepFinal = React.memo((props:any) => {
    const [loading, setLoading] = useState(false); 
    const [success, setSuccess] = useState(false); 
    const user = useAppSelector(state =>state.user.currentUser);
    const {choose} = props.route.params;
    const [serverName,setServerName] = useState('');
    const [pathImage,setPathImage] = useState('');
    const hasErrorServerName = () => serverName.length< 1;
    const hasErrorpathImage = () => pathImage==='';
    const colorMode = useAppColor();
    const getModelByChoice = (choose:number) => {
        switch (choose) {
        case 1:
        return modeltype1();
        case 2:
        return modeltype2();
        case 3:
        return modeltype3();
        case 4:
        return modeltype4();
        case 5:
        return modeltype5();
        case 6:
        return modeltype6();
        case 7:
        return modeltype7();
        default:
            return []; 
        }
    };
    const storageRef = storage().ref('servers/');
    const serverRef = firestore().collection('SERVERS').doc();
  const createServer = async () => {
    if (!user) return;
    setLoading(true);
    try {
     
        const fileName = `${Date.now()}.jpg`;
    const imageRef = storageRef.child(fileName);

    const uploadTask = imageRef.putFile(pathImage);

    uploadTask.on('state_changed',
      () => {
      },
      (error) => {
        console.error(error);
      },
      async () => {
        try {
          const downloadUrl = await imageRef.getDownloadURL();
           const serverId = serverRef.id;

            const newServer:TServerData = {
                id: serverId,
                image: downloadUrl,
                title: serverName,
                createby: user.id ,
                channels: getModelByChoice(choose),
                listmember:[user],
                cratedate: Date.now()
            };

            await serverRef.set(newServer);
            setSuccess(true);
            showMessage({
                message: "Tạo máy chủ thành công",
                type: "success",
                duration: 3000, 
                autoHide: true,
                style: { justifyContent: 'center', alignItems: 'center' }
            });
            props.navigation.navigate('HomeScreen');

        } catch (error) {
          console.error(error);
        }finally {
            // Set loading to false when server creation process ends
            setLoading(false);
        }
      }
    );
    } catch (error) {
      console.error('Error creating server: ', error);
    }
  };

  const upLoadImage = () =>{
    ImagePicker.openPicker({
      cropping:true,
      mediaType:'photo'
    })
    .then(image => setPathImage(image.path))
    .catch(e => console.log(e.message))
  }
  return (
    <View style={{paddingHorizontal:10,flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
      <TText fontFamily='bold' style={{textAlign:'center',fontSize:24,fontWeight:'bold',color:colorMode.inverseBlack,marginTop:15}}>Tạo Máy chủ Của Bạn</TText>
      <TText style={{textAlign:'center',fontWeight:'bold',marginTop:10}}>Máy chủ của bạn là nơi bạn giao lưu với bạn bè của mình.</TText>
      <TText style={{textAlign:'center',fontWeight:'bold'}}>Hãy tạo máy chủ của riêng bạn và bắt đầu trò chuyện.</TText>

      <TouchableOpacity onPress={upLoadImage} style={{alignItems:'center',marginTop:30,paddingVertical:20}}>
         {pathImage !== '' ? (
        <Image 
          source={{uri: pathImage}} 
          style={{ width: '100%', height: 150, resizeMode:'contain',marginBottom:20 }}>
        </Image>
        ) :(
         <View style={{width:80,borderRadius:50,borderWidth:3,borderColor:'gray',borderStyle:'dashed',height:80,alignItems:'center',justifyContent:'center',position:'relative'}}>
            <View style={{position:'absolute',top:-10,right:-10,height:35,width:35,backgroundColor:'#5E71EC',justifyContent:'center',alignItems:'center',borderRadius:50}}>
                <PlusIcon width={25} height={25} />
            </View>
            <View style={{alignItems:'center'}}>
                <UploadIcon width={30} height={30}/>
                <TText style={{fontWeight:'bold'}}>Tải lên</TText>
            </View>
        </View>
        )}
        
      </TouchableOpacity>
    
      <TText style={{fontWeight:'bold',fontSize:16}}>Tên máy chủ</TText>
       <View style={{position:'relative',justifyContent:'center',marginTop:10}}>
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                value={serverName}
                onChangeText={setServerName}
                placeholder='Tên máy chủ của bạn...'
            />
            {serverName &&
                <TouchableOpacity onPress={()=> setServerName('')} style={styles.iconDeleteValue}>
                <CancelIcon width={15} height={15} />
            </TouchableOpacity>
            }
        </View>
        <View style={{marginTop:10}}>
            <View style={{flexDirection:'row'}}>
                <TText style={{fontSize:12,fontWeight:'bold'}}>Khi tạo máy chủ, nghĩa là bạn đã đồng ý với </TText>
                <TText style={{fontSize:12,fontWeight:'bold',color:'#3E57F9'}}>Nguyên Tắc Cộng Đồng</TText>
            </View>
            <View>
                <TText style={{fontSize:12,fontWeight:'bold'}}>của Discord. </TText>
            </View>
        </View>
        <TouchableOpacity onPress={createServer} style={{alignItems:'center',justifyContent:'center',marginTop:15,backgroundColor:'#5E71EC',paddingVertical:13,borderRadius:20 ,opacity:serverName && pathImage ? 1: 0.7}} disabled={hasErrorServerName() || hasErrorpathImage()}>
                <TText style={{color:colorMode.inverseWhite,fontWeight:'bold'}}>Tạo máy chủ</TText>
        </TouchableOpacity>

         {loading && !success && (
                    <View style={{...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: 1, justifyContent:'center', alignItems:'center'}}>
                        <LottieView source={require('../../assets/lottie/loading.json')} autoPlay loop={true} style={{width:250,height:250}}/>
                    </View>
          )}
    </View>
  )
})

const styles = StyleSheet.create({
    inputStyle:{
        height:55,
        borderBottomWidth:0,
        borderRadius:12,
        paddingLeft:15,
        paddingRight:35,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    },
    iconDeleteValue:{
        position:'absolute',
        right:12,
        width:24,
        height:24,
         borderRadius:50,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'gray'
    }
})

export default AddServerStepFinal