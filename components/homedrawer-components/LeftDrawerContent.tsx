import { View, Text } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import ServerList from './ServerList'
import ChanelList from './ChanelList'
import useAppColor from '../../themed/useAppColor'
import {useNavigation} from '@react-navigation/native'

const LeftDrawerContent = React.memo((props: any) =>{
    const navigation = useNavigation();
        const colorMode = useAppColor();
    return(
        <View {...props.dProps} style={{flex:1,flexDirection:'row',backgroundColor:colorMode.appLightGray}}>
           <ServerList navigation={navigation}/>
           <ChanelList/>
        </View>
    )
})

export default LeftDrawerContent