import React, { useEffect, useRef } from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import SearchScreen from './screens/SearchScreen';
import { useAppSelector } from '../shared/rdx-hooks';
import { TText } from '../themed/themeComponents';


const CustomTabBar = React.memo(({ state, descriptors, navigation }:{ state:any, descriptors:any, navigation:any }) => {
    const searchTabBottomSheetRef = React.useRef<any>(null)
    const shouldHideBottomTab = useAppSelector(state =>state.main.hideBottomTab);

  return (
    <View style={{ flexDirection: 'row',height: shouldHideBottomTab ?0 :55 }}>
      {state.routes.map((route:any, index:number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        
        const isFocused = state.index === index;

        const onPress = () => {
          if (route.name === 'SearchScreen') {
            searchTabBottomSheetRef.current?.open();
          } else {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
            <React.Fragment key={route.key}>
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{ flex: 1,height:60,alignItems:'center' ,justifyContent:'center',opacity:isFocused?1: .5}}
            >
                {options.tabBarIcon()}
                <TText style={{fontSize:11,fontWeight:'bold'}}>{options.tabBarLabel}</TText>
            </TouchableOpacity>
            <SearchScreen ref={searchTabBottomSheetRef}/>
            </React.Fragment>
        );
      })}
    </View>
  );
});

export default CustomTabBar;
