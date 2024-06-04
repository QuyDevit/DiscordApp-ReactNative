import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
import ListMember from './ListMember'
import { useAppSelector } from '../../shared/rdx-hooks'

const RightDrawerContent = React.memo((props:any) => {
  const server = useAppSelector(state =>state.server.serverData);
  return (
    <View style={{flex:1}}>
      <RightDrawerHeader title={server?.title}/>
      <ListMember/>
    </View>
  )
})

const RightDrawerHeader = React.memo((props: {title:string}) =>{
     const colorMode = useAppColor();
    return(
        <View style={[styles.drawerHeader,{backgroundColor:colorMode.inverseWhiteGray}]}>
            <TText style={{color:colorMode.inverseBlack,fontSize:18,fontWeight:'bold'}}>{props.title}</TText>
        </View>
    )
})

const styles = StyleSheet.create({
    drawerHeader:{
        width:'100%',
        height:53, 
        // borderTopLeftRadius:15,
        // borderTopRightRadius:15,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        borderBottomWidth:1,
        borderColor:'lightgray'
    }
})

export default RightDrawerContent