import React, { useState } from "react";
import { Button, View } from "react-native";
import { AddServerIcon, ServerIcon } from "../../shared/Reusables";
import useAppColor from "../../themed/useAppColor";
import { useAppDispatch } from "../../shared/rdx-hooks";
import { setHideBottomTab } from "../../shared/rdx-slice";

const ServerList = React.memo((props:any,state:any)=>{
    const dispatch = useAppDispatch();
    const colorMode = useAppColor();
    const [selectedIcon, setSelectedIcon] = useState(0);
    const onPress = () =>{
        props.navigation.navigate('AddServer');
        dispatch(setHideBottomTab(true))
    }
    return (
        <View style={{height:'100%',width:'22%',justifyContent:'flex-start'}}>
            <ServerIcon isSelected={selectedIcon === 1} 
                onPress={() => setSelectedIcon(1)} />

            <ServerIcon isSelected={selectedIcon === 2} 
                onPress={() => setSelectedIcon(2)}/>

            <AddServerIcon onPress={onPress }/>
        </View>
    )
})
export default ServerList