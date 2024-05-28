import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { TText } from '../../themed/themeComponents'
import useAppColor from '../../themed/useAppColor'
// @ts-ignore
import Icon1 from "../../assets/icon1.svg";
// @ts-ignore
import Icon2 from "../../assets/icon2.svg";
// @ts-ignore
import Icon3 from "../../assets/icon3.svg";
// @ts-ignore
import Logo from "../../assets/logomain.svg";

const StartScreen = React.memo(({navigation} : {navigation:any}) => {
    const colorMode = useAppColor();
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
        <View style={{alignSelf:'center',marginTop:30}}>
            <Logo  width={200} height={80} />
        </View>
        <View style={{height:120}}>
             <Icon1  width={250} height={200} />
        </View>
        <View style={{alignSelf:'flex-end',height:110}}>
             <Icon2  width={200} height={150} />
        </View>
        <View style={{}}>
             <Icon3  width={270} height={150} />
        </View>
        <View style={{marginTop:30}}>
            <TText style={{color:colorMode.inverseBlack,fontSize:28,fontWeight:'bold',textAlign:'center'}}>Chào mừng đến với Discord</TText>
            <TText style={{fontWeight:'bold',textAlign:'center'}}>Tham gia với hơn 100 triệu người đang dùng Discord với cộng đồng và bạn bè.</TText>
        </View>
       <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('RegisterScreen')}>
        <Text style={styles.text}>Đăng ký</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={()=>navigation.navigate('LoginScreen')} >
        <Text style={styles.text}>Đăng Nhập</Text>
      </TouchableOpacity>
    </View>
    
    </View>
  )
})
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 15,
  },
  text: {
    color: 'white',
    fontSize: 16,
  }
});


export default StartScreen