import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
import ListMember from './ListMember'

const RightDrawerContent = React.memo((props:any) => {
  return (
    <View style={{flex:1}}>
      <RightDrawerHeader/>
      <ListMember/>
    </View>
  )
})

const RightDrawerHeader = React.memo((props: any) =>{
     const colorMode = useAppColor();
    return(
        <View style={styles.drawerHeader}>
            <TText style={{color:colorMode.inverseBlack,fontSize:18,fontWeight:'bold'}}>Server Coders</TText>
        </View>
    )
})

const styles = StyleSheet.create({
    drawerHeader:{
        width:'100%',
        height:53, 
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:5,
        borderBottomWidth:1,
        borderColor:'lightgray'
    }
})

export default RightDrawerContent