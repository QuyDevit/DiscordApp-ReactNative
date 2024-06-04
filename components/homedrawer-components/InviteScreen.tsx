import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, TextInput, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TText } from '../../themed/themeComponents';
import { CustomBottomSheet, FastImageRes, ShareApp } from '../../shared/Reusables';
import useAppColor from '../../themed/useAppColor';
// @ts-ignore
import SearchIcon from '../../assets/search.svg';
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks';
import firestore from '@react-native-firebase/firestore';
import { TNotification, TServerData, TUser } from '../../shared/types';
import { showMessage } from 'react-native-flash-message';
import { fetchUserServers } from '../../shared/serverSlice';

const InviteScreen = React.memo(React.forwardRef((props: any, ref: any) => {
  const colorMode = useAppColor();
  const dispatch = useAppDispatch();
  const serverdata = useAppSelector(state => state.server.serverData);
  const user = useAppSelector(state => state.user.currentUser);
  const [friends, setFriends] = useState<Array<TUser>>([]);
  const [serverMembers, setServerMembers] = useState<Array<TUser>>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [enableArray, setEnableArray] = useState<boolean[]>([]); // State for managing disabled status of buttons

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    const hideSub = Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsFocused(true);
  };

  const _keyboardDidHide = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    if (user?.id) {
      const userDocRef = firestore().collection('USERS').doc(user?.id);
      const unsubscribe = userDocRef.onSnapshot((doc) => {
        if (doc.exists) {
          const userData = doc.data() as TUser;
          setFriends(userData.listfriend || []);
          setEnableArray(new Array(userData.listfriend?.length || 0).fill(false)); // Initialize enableArray
        }
      }, (error) => {
        console.error('Error fetching friends: ', error);
      });

      return () => unsubscribe();
    }
  }, [user?.id]);

  useEffect(() => {
    if (serverdata?.id) {
      const serverDocRef = firestore().collection('SERVERS').doc(serverdata.id);
      const unsubscribe = serverDocRef.onSnapshot((doc) => {
        if (doc.exists) {
          const serverDatanew = doc.data() as TServerData;
          setServerMembers(serverDatanew.listmember || []);
        }
      }, (error) => {
        console.error('Error fetching server members: ', error);
      });

      return () => unsubscribe();
    }
  }, [serverdata?.id]);

  const filteredFriends = friends
    .filter(friend => !serverMembers.some(member => member.id === friend.id))
    .filter(friend => friend.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const inviteMyServer = async (userto: TUser, index: number) => {
    try {
      const notificationRef = firestore().collection('NOTIFICATIONS');
      const notificationData: TNotification = {
        id: '',
        from: user!,
        checkread: false,
        to: userto.hashtagname,
        notificationAt: Date.now(),
        type: 1,
        server: serverdata!,
        chanel: null,
        message: ''
      };
      const docRef = await notificationRef.add(notificationData);
      await docRef.update({ id: docRef.id });
      dispatch(fetchUserServers(user?.id!));
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

  return (
    <CustomBottomSheet height={'96%'} ref={ref} snapPoints={['50%', '96%']} >
      <View style={{ paddingTop: 10, flex: 1 }}>
        <View>
          <TText style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: colorMode.inverseBlack }}>Mời bạn bè</TText>
          {!isFocused &&
            <ShareApp />
          }
          <View style={{ position: 'relative', justifyContent: 'center', marginTop: 20, paddingHorizontal: 10 }}>
            <TextInput
              style={[styles.inputStyle, { backgroundColor: colorMode.appLightGray }]}
              placeholderTextColor={colorMode.textGray}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder='Mời bạn bè tham gia...'
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <View style={{ position: 'absolute', left: 20, top: 10 }}>
              <SearchIcon width={25} height={25} />
            </View>
            <View style={{ flexDirection: 'row', marginTop: 8 }}>
              <TText style={{ fontSize: 12, fontWeight: 'bold' }}>Link mời của bạn sẽ hết hạn sau 7 ngày. </TText>
              <TText style={{ fontSize: 12, fontWeight: 'bold', color: 'blue' }}>Chỉnh sửa link mời.</TText>
            </View>
          </View>
        </View>
        <ScrollView style={{ paddingHorizontal: 10, marginTop: 5 }}>
          {filteredFriends.map((item, index) => (
            <View key={item.id} style={[styles.listItem,
            {
              borderBottomWidth: index != filteredFriends.length - 1 ? 1 : 0,
              borderColor: '#DBDADA',
              borderTopLeftRadius: index === 0 ? 15 : 0,
              borderTopRightRadius: index === 0 ? 15 : 0,
              backgroundColor: colorMode.appGray,
              borderBottomLeftRadius: index === filteredFriends.length - 1 ? 15 : 0,
              borderBottomRightRadius: index === filteredFriends.length - 1 ? 15 : 0,
            }
            ]}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 32, height: 32, borderRadius: 50, overflow: 'hidden', marginLeft: 10 }}>
                  <FastImageRes uri={item.avatart} />
                </View>
                <TText style={{ marginLeft: 10, fontWeight: 'bold' }}>{item.name}</TText>
              </View>
              <TouchableOpacity disabled={enableArray[index]} onPress={() => inviteMyServer(item, index)} style={{ backgroundColor: enableArray[index] ? '#ccc' : 'gray', paddingHorizontal: 20, paddingVertical: 5, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                <TText style={{ fontWeight: 'bold', color: 'white' }}>Mời</TText>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    </CustomBottomSheet>
  );
}));

const styles = StyleSheet.create({
  inputStyle: {
    height: 45,
    borderBottomWidth: 0,
    borderRadius: 12,
    paddingRight: 15,
    paddingLeft: 45,
    fontSize: 15,
    fontFamily: 'ggsans-Regular'
  },
  listItem: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
export default InviteScreen;
