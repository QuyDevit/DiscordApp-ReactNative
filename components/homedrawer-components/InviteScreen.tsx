import { View, Text,Button, ScrollView, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TText } from '../../themed/themeComponents';
import { CustomBottomSheet, FastImageRes, ShareApp } from '../../shared/Reusables';
import useAppColor from '../../themed/useAppColor';
// @ts-ignore
import SearchIcon from '../../assets/search.svg'


const InviteScreen = React.memo(React.forwardRef((props:any, ref:any) => {
  const colorMode = useAppColor();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <CustomBottomSheet height={'96%'} ref={ref} >
      <View style={{paddingTop:10,flex:1}}>
        <View>

        <TText style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:colorMode.inverseBlack}}>Mời bạn bè</TText>  
        {!isFocused &&
          
            <ShareApp/>
        }
         <View style={{position:'relative',justifyContent:'center',marginTop:20,paddingHorizontal:10}} >
            <TextInput 
                style={[styles.inputStyle,{backgroundColor:colorMode.appLightGray}]}
                placeholderTextColor={colorMode.textGray}
                onFocus={() => setIsFocused(true)}
                onBlur={() =>setIsFocused(false)}
                placeholder='Mời bạn bè tham gia...'
            />
            <View style={{position:'absolute',left:20,top:10}}>
                <SearchIcon width={25} height={25}/>
            </View>
            <View style={{flexDirection:'row',marginTop:8}}>
              <TText style={{fontSize:12,fontWeight:'bold'}}>Link mời của bạn sẽ hết hạn sau 7 ngày. </TText>
              <TText style={{fontSize:12,fontWeight:'bold',color:'blue'}}>Chỉnh sửa link mời.</TText>
            </View>

        </View>
         </View>
         <ScrollView style={{paddingHorizontal:10,marginTop:5}}>
  
         <TouchableOpacity style={{paddingVertical:10,backgroundColor:colorMode.appGray,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#DBDADA',borderTopLeftRadius:15,borderTopRightRadius:15}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{width:32,height:32,borderRadius: 50,overflow:'hidden',marginLeft:10}}>
                <FastImageRes uri='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai-1.jpg' />
              </View>
              <TText style={{marginLeft:10,fontWeight:'bold'}}>Hoàng</TText>
            </View>
              <View style={{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:20,justifyContent:'center',alignItems:'center',marginRight:10}}>
                <TText style={{fontWeight:'bold',color:'white'}}>Mời</TText>
            </View>
          
          </TouchableOpacity>
         
           <TouchableOpacity style={{paddingVertical:10,backgroundColor:colorMode.appGray,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#DBDADA'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{width:32,height:32,borderRadius: 50,overflow:'hidden',marginLeft:10}}>
                <FastImageRes uri='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai-1.jpg' />
              </View>
              <TText style={{marginLeft:10,fontWeight:'bold'}}>Hoàng</TText>
            </View>
            <View style={{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:20,justifyContent:'center',alignItems:'center',marginRight:10}}>
                <TText style={{fontWeight:'bold',color:'white'}}>Mời</TText>
            </View>
          </TouchableOpacity>
           <TouchableOpacity style={{paddingVertical:10,backgroundColor:colorMode.appGray,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#DBDADA'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{width:32,height:32,borderRadius: 50,overflow:'hidden',marginLeft:10}}>
                <FastImageRes uri='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai-1.jpg' />
              </View>
              <TText style={{marginLeft:10,fontWeight:'bold'}}>Hoàng</TText>
            </View>
            <View style={{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:20,justifyContent:'center',alignItems:'center',marginRight:10}}>
                <TText style={{fontWeight:'bold',color:'white'}}>Mời</TText>
            </View>
          </TouchableOpacity>
              <TouchableOpacity style={{paddingVertical:10,backgroundColor:colorMode.appGray,flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderBottomWidth:1,borderColor:'#DBDADA'}}>
          <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{width:32,height:32,borderRadius: 50,overflow:'hidden',marginLeft:10}}>
                <FastImageRes uri='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai-1.jpg' />
              </View>
              <TText style={{marginLeft:10,fontWeight:'bold'}}>Hoàng</TText>
            </View>
            <View style={{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:20,justifyContent:'center',alignItems:'center',marginRight:10}}>
                <TText style={{fontWeight:'bold',color:'white'}}>Mời</TText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{paddingVertical:10,backgroundColor:colorMode.appGray,borderBottomLeftRadius:15,borderBottomRightRadius:15,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              <View style={{width:32,height:32,borderRadius: 50,overflow:'hidden',marginLeft:10}}>
                <FastImageRes uri='https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anh-meme-hai-1.jpg' />
              </View>
              <TText style={{marginLeft:10,fontWeight:'bold'}}>Hoàng</TText>
            </View>
               <View style={{backgroundColor:'gray',paddingHorizontal:20,paddingVertical:5,borderRadius:20,justifyContent:'center',alignItems:'center',marginRight:10}}>
                <TText style={{fontWeight:'bold',color:'white'}}>Mời</TText>
            </View>
             
          </TouchableOpacity>
     
          
  
        </ScrollView>

   
      </View>

    </CustomBottomSheet>

  );
}))

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
export default InviteScreen