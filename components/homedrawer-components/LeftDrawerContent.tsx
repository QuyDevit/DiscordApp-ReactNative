import { View, Text } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import ServerList from './ServerList'
import ChanelList from './ChanelList'
import useAppColor from '../../themed/useAppColor'

const LeftDrawerContent = React.memo((props: any) =>{
        const colorMode = useAppColor();
    return(
        <View {...props.dProps} style={{flex:1,flexDirection:'row',backgroundColor:colorMode.appLightGray}}>
           <ServerList navigation={props.dProps.navigation}/>
           <ChanelList navigation={props.dProps.navigation}/>
        </View>
    )
})

export default LeftDrawerContent