import { View, Text } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import ServerList from './ServerList'
import ChannelList from './ChannelList'
import useAppColor from '../../themed/useAppColor'

const LeftDrawerContent = React.memo((props: any) =>{
        const colorMode = useAppColor();
    return(
        <View {...props.dProps} style={{flex:1,flexDirection:'row',backgroundColor:colorMode.appLightGray}}>
           <ServerList navigation={props.dProps.navigation}/>
           <ChannelList navigation={props.dProps.navigation}/>
        </View>
    )
})

export default LeftDrawerContent