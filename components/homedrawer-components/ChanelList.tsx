import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import Dots from '../../assets/guildMoreOptions1.svg'
// @ts-ignore
import InvitePersonIcon from '../../assets/guildInvitePeople.svg'
import { ChanelListSection } from '../../shared/Reusables'
import InviteScreen from './InviteScreen'
import { Portal } from 'react-native-portalize'
import { useAppSelector } from '../../shared/rdx-hooks'
import { ChanelListContent } from '../../shared/constants'

const ChanelList = React.memo((props:any) =>{
    const colorMode = useAppColor();
    const server = useAppSelector(state =>state.server.serverData);
    return(
        <ChanelListContent.Provider value={{navigation:props.navigation}}>

            <View style={[styles.mainList,{backgroundColor:colorMode.inverseWhiteLightGray}]}>
            {Object.keys(server).length > 0 ? (
                    <>
                        <ServerListHeader />
                        <InviteOthers />
                    </>
                ) : null}
            <ChanelListSection/>
            </View>
        </ChanelListContent.Provider>
    )
})

const ServerListHeader = React.memo((props: any) =>{
    const server = useAppSelector(state =>state.server.serverData);
     const colorMode = useAppColor();
    return(
        <TouchableOpacity style={styles.listHeader}>
            <TText style={{color:colorMode.inverseBlack,fontSize:18,fontWeight:'bold'}}>{server.title}</TText>
            <Dots width={30} height={30}/>
        </TouchableOpacity>
    )
})

const InviteOthers = React.memo((props:any) =>{
      const sheetRef = React.useRef<any>();
    return(
        <View style={{width:'100%',alignItems:'center',marginBottom:15,borderBottomWidth:.5,borderColor:'gray'}}>
            <TouchableOpacity  onPress={() => sheetRef.current?.open()} style={styles.buttonadd}>
                <InvitePersonIcon width={18} height={18}/>
                <TText style={{color:'white',fontWeight:'600',marginLeft:5,fontSize:15}} fontFamily='medium'>Mời</TText>
            </TouchableOpacity>
            <Portal>
                <InviteScreen ref={sheetRef} ></InviteScreen>
            </Portal>
        </View>
    )
})

const styles = StyleSheet.create({
    mainList:{
        width:'78%',
        height:'100%',
        borderTopLeftRadius:15,
        borderTopRightRadius:15
    },
    listHeader:{
        width:'100%',
        height:50, 
        borderTopLeftRadius:15,
        borderTopRightRadius:15,
        paddingHorizontal:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginBottom:5
    },
    buttonadd:{
        backgroundColor:'gray',
        width:'85%',
        height:30,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginBottom:25
    }
})

export default ChanelList