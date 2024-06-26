import React, { useCallback, useEffect, useState } from "react";
import { Button, View } from "react-native";
import { AddServerIcon, ServerIcon, getdataServer } from "../../shared/Reusables";
import useAppColor from "../../themed/useAppColor";
import { useAppDispatch, useAppSelector } from "../../shared/rdx-hooks";
import { setHideBottomTab } from "../../shared/rdx-slice";
import { fetchUserServers, setChannelData, setServerData } from "../../shared/serverSlice";
import { useFocusEffect } from "@react-navigation/native";

const ServerList = React.memo((props:any,state:any)=>{
    const dispatch = useAppDispatch();
    const colorMode = useAppColor();
    const user = useAppSelector((state) => state.user); 
    const servers = useAppSelector((state) => state.server); 
    const serverdata = useAppSelector((state) => state.server.serverData); 
    const onPress = () =>{
        props.navigation.navigate('AddServer');
        dispatch(setHideBottomTab(true));
    }
   const loadUserServers = useCallback(() => {
    if (user.currentUser?.id) {
      dispatch(fetchUserServers(user.currentUser?.id));
        }
    }, [dispatch, user]);

    useFocusEffect(
        useCallback(() => {
        loadUserServers();
        }, [loadUserServers])
    );

    useEffect(() => {
        loadUserServers();
    }, [loadUserServers]);
    return (
        <View style={{height:'100%',width:'22%',justifyContent:'flex-start'}}>
            { servers.servers?.map(server =>(
                <View key={server.id}>
                    <ServerIcon uri={server.image} isSelected={serverdata.id === server.id} 
                    onPress={async () => {
                        getdataServer(server.id,dispatch);
                        const firstChanel = server.channels?.[0]?.items?.[0];
                        dispatch(setChannelData(firstChanel))
                        }} />
                </View>
            )) }
            <AddServerIcon onPress={onPress }/>
        </View>
    )
})
export default ServerList