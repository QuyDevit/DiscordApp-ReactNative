import { View, Text } from 'react-native'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../shared/rdx-hooks';
import useAppColor from '../../themed/useAppColor';
import { TAppColorMode } from '../../shared/types';
import { TText } from '../../themed/themeComponents';
import { setAppColorMode } from '../../shared/rdx-slice';

const Display = React.memo((props:any) => {
   const colorMode = useAppColor();
    const appColorModeState = useAppSelector(state => state.main.appColorMode);
    const dispatch = useAppDispatch()

    const handleSetColorMode = React.useCallback((mode: TAppColorMode) => {     
        dispatch(setAppColorMode(mode))
    
    }, [])

    return (
        <View style={{flex: 1, backgroundColor: colorMode.inverseWhiteLightGray}}>
            <View style={{height: 50, justifyContent: 'flex-end', paddingVertical: 10, paddingHorizontal: 15, borderBottomColor: 'gray', borderBottomWidth: .5}}>
                <TText>Chế độ</TText>
            </View>
            <View style={{flexDirection: 'row', paddingVertical: 20, width: '100%', justifyContent: 'flex-end'}}>
                <View onTouchEnd={() => handleSetColorMode('dark')} style={[{width: 70, height: 70, marginRight: 15, borderRadius: 50, backgroundColor: 'gray', borderColor: 'gray', borderWidth: .5},
                appColorModeState == 'dark' && {borderWidth: 5, borderColor: colorMode.light_blurple,}
                ]}></View>
                <View onTouchEnd={() => handleSetColorMode('light')} style={[{width: 70, height: 70,  marginRight: 15, borderRadius: 50, backgroundColor: 'white', borderColor: 'gray', borderWidth: .5},
                    appColorModeState == 'light' && {borderWidth: 5, borderColor: colorMode.light_blurple,}]}></View>
            </View>
        </View>
    )
})

export default Display