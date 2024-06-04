import { View, Text,Button, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents';
import { CustomBottomSheet, FastImageRes } from '../../shared/Reusables';
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
import useAppColor from '../../themed/useAppColor';
import firestore from '@react-native-firebase/firestore'
import { useAppSelector } from '../../shared/rdx-hooks';
import { TNotification, TServerData } from '../../shared/types';
import { showMessage } from "react-native-flash-message";

const SearchScreen = React.memo(React.forwardRef((props:any, ref:any) => {
  const colorMode = useAppColor();
  const user = useAppSelector(state =>state.user.currentUser);
  const [servers,setServers] = useState<TServerData[]>([]);
  const [enableArray, setEnableArray] = useState<boolean[]>([]); 
  const [text,setText] = useState('');
     useEffect(() => {
        if (user?.id){
          const serverDocRef = firestore()
            .collection('SERVERS')
            .orderBy('cratedate', 'asc');
  
          const unsubscribe = serverDocRef.onSnapshot(
            (snapshot) => {
              const fetchedServer = snapshot.docs.map((doc) => doc.data() as TServerData);
              const getServerNotJoin = fetchedServer.filter(server => server.createby != user.id && !server.listmember.some(member =>member.id === user.id)); 
              setEnableArray(new Array(getServerNotJoin.length || 0).fill(false)); 
              setServers(getServerNotJoin);
            },
            (error) => {
              console.error('Error fetching servers: ', error);
            }
          );
  
          return () => unsubscribe();
        }

      }, [user?.id]);
    
    const SendInviteToJoinServer = async (serverto: TServerData, index: number) => {
        try {
          const notificationRef = firestore().collection('NOTIFICATIONS');
          const notificationData: TNotification = {
            id: '',
            from: user!,
            checkread: false,
            to: serverto.id,
            notificationAt: Date.now(),
            type: 3,
            server: serverto!,
            chanel: null,
            message: ''
          };
          const docRef = await notificationRef.add(notificationData);
          await docRef.update({ id: docRef.id });
          showMessage({
            message: "Gửi lời mời thành công!",
            type: "success",
            duration: 2000,
            autoHide: true,
            style: { justifyContent: 'center', alignItems: 'center' }
          });

          // Disable the button for this specific friend
          setEnableArray(prevState => {
            const newState = [...prevState];
            newState[index] = true;
            return newState;
          });

        } catch (error) {
          console.error('Lỗi khi gửi yêu cầu: ', error);
        }
      }
    
    const filteredServer = servers.filter(server => {
            return server.title.toLowerCase().includes(text.toLowerCase())
    });
  return (
    <CustomBottomSheet height={'95%'} ref={ref}>
        <View style={{position:'relative',justifyContent:'center',marginTop:20,paddingHorizontal:10}} >
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.inverseWhiteGray}]}
                placeholderTextColor={colorMode.textGray}
                placeholder='Tìm kiếm máy chủ...'
                value={text}
                onChangeText={setText}
            />
            <View style={{position:'absolute',left:20,top:10}}>
                <SearchIcon width={25} height={25}/>
            </View>
        </View>
        <ScrollView style={{marginTop:20,paddingHorizontal:15,marginBottom:40}}>
             {filteredServer.map((item,index) =>(
              <View key={item.id} style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                      <View style={{width:50,height:50,borderRadius: 50,overflow:'hidden'}}>
                            <FastImageRes uri={item.image}/>
                      </View>  
                      <TText style={{marginLeft:15,color:colorMode.inverseBlack,fontWeight:'600'}}>{item.title}</TText>  
                    </View>
                      <TouchableOpacity disabled={enableArray[index]} onPress={() => SendInviteToJoinServer(item, index)} style={{paddingHorizontal:10,paddingVertical:8,backgroundColor:enableArray[index]?'#ccc': 'green',borderRadius:10}}>
                          <TText style={{color:colorMode.inverseWhite,fontWeight:'600'}}>Gửi yêu cầu</TText>
                      </TouchableOpacity>  
                  </View>
              ))}
        </ScrollView>

    </CustomBottomSheet>
    
  );
}))

const styles = StyleSheet.create({
  
        inputStyle:{
        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingRight:15,
        paddingLeft:45,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    }
})

export default SearchScreen