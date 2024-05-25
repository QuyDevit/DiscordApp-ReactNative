import { View, Text,Button, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents';
import { CustomBottomSheet, FastImageRes } from '../../shared/Reusables';
// @ts-ignore
import SearchIcon from '../../assets/search.svg'
import useAppColor from '../../themed/useAppColor';

const SearchScreen = React.memo(React.forwardRef((props:any, ref:any) => {
  const colorMode = useAppColor();
  return (
    <CustomBottomSheet height={'95%'} ref={ref}>
        <View style={{position:'relative',justifyContent:'center',marginTop:20,paddingHorizontal:10}} >
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.inverseWhiteGray}]}
                placeholderTextColor={colorMode.textGray}
                placeholder='Tìm kiếm máy chủ...'
            />
            <View style={{position:'absolute',left:20,top:10}}>
                <SearchIcon width={25} height={25}/>
            </View>
        </View>
        <ScrollView style={{marginTop:20,paddingHorizontal:15,marginBottom:40}}>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
            <ListServerItem/>
        </ScrollView>

    </CustomBottomSheet>
    
  );
}))

const ListServerItem = React.memo((props:any) =>{
    const colorMode = useAppColor();
   return(
 
    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:15}}>
      <View style={{flexDirection:'row',alignItems:'center'}}>
        <View style={{width:50,height:50,borderRadius: 50,overflow:'hidden'}}>
              <FastImageRes uri="https://toquoc.mediacdn.vn/280518851207290880/2023/5/29/images-8-2023-05-29t052246compress19-1024x540-1685328584193-16853285844042115166976-1685346536930-1685346536991131653137.jpg"/>
        </View>  
        <TText style={{marginLeft:15,color:colorMode.inverseBlack,fontWeight:'600'}}>CODER SERVER</TText>  
      </View>
        <TouchableOpacity style={{paddingHorizontal:10,paddingVertical:8,backgroundColor:'green',borderRadius:10}}>
            <TText style={{color:colorMode.inverseWhite,fontWeight:'600'}}>Gửi yêu cầu</TText>
        </TouchableOpacity>  
    </View>
   )
})

const styles = StyleSheet.create({
  
        inputStyle:{
        height:45,
        borderBottomWidth:0,
        borderRadius:12,
        paddingRight:15,
        paddingLeft:45,
        fontSize:15,
        fontFamily:'ggsans-Regular'
    }
})

export default SearchScreen