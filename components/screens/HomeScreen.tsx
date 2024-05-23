import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Drawer } from 'react-native-drawer-layout';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeDefault from '../homedrawer-components/HomeDefault';
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks';
import { setHideBottomTab, setOpenRightDrawer, updateSafeAreaBg } from '../../shared/rdx-slice';
import useAppColor from '../../themed/useAppColor';
import LeftDrawerContent from '../homedrawer-components/LeftDrawerContent';
// @ts-ignore
import HashTagIcon from '../../assets/channelText.svg'
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
// @ts-ignore
import UserIcon from '../../assets/users.svg'
// @ts-ignore
import BarsIcon from '../../assets/bars.svg'

import { TText } from '../../themed/themeComponents';
import { useFocusEffect } from '@react-navigation/native';
import RightDrawerContent from '../homedrawer-components/RightDrawerContent';

const LeftDrawer = createDrawerNavigator();

const LeftDrawerScreen = React.memo(({navigation} :{navigation:any}) => {
    const dispatch = useAppDispatch();
    const colorMode = useAppColor();

  return (
    <LeftDrawer.Navigator 
        screenOptions={{ 
          drawerType:'slide',
            drawerPosition: 'left' ,
            drawerStyle:{
                width:'85%'
            },
        }}
        screenListeners={{
            state: (e) =>{
                if(e.data.state.history.length > 1){
                    dispatch(updateSafeAreaBg(colorMode.appLightGray))
                    dispatch(setHideBottomTab(false))
                }else{
                    dispatch(updateSafeAreaBg('white'))
                    dispatch(setHideBottomTab(true))
                }
            }
        }}
        drawerContent={(props) => <LeftDrawerContent dProps={props}/>}
        >
      <LeftDrawer.Screen 
        name="HomeDefault" 
        component={HomeDefault} 
        options={{
          headerTitleAlign:'left',
          headerStyle:{
              backgroundColor:colorMode.inverseWhiteLightGray
          },
          headerShown:false,
        }}
      />
    </LeftDrawer.Navigator>
  );
});

function RightDrawerScreen({navigation} :{navigation:any}) {
  const openRightDrawer = useAppSelector(state => state.main.openRightdrawer);
  const dispatch = useAppDispatch();

  return (
    <Drawer
      open={openRightDrawer}
      drawerStyle={{
        width:'85%'
      }}
      onOpen={() => {
        dispatch(setOpenRightDrawer(true))
      }}
      onClose={() => {
         dispatch(setOpenRightDrawer(false))
      }}
      drawerType='slide'
      drawerPosition="right"
      renderDrawerContent={() => <RightDrawerContent/>}
    >
      <LeftDrawerScreen  navigation={navigation} />
    </Drawer>
  );
}

const HomeScreen = React.memo( (props: any) => {
  const dispatch = useAppDispatch();

    useFocusEffect(
        React.useCallback(() => {
            // Khi màn hình Home được focus, setHideBottomTab thành false
            dispatch(setHideBottomTab(false));
           
        }, [dispatch])
    );
  return (
    <View style={{flex:1}}>
        <RightDrawerScreen navigation={props.navigation} />
    </View>
  )
})


export default HomeScreen