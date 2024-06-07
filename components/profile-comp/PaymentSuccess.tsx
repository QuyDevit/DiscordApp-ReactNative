import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useAppColor from '../../themed/useAppColor'
import { TText } from '../../themed/themeComponents';
//@ts-ignore
import SuccessIcon from '../../assets/guildCheckmark.svg'
//@ts-ignore
import ErrorIcon from '../../assets/guildCross.svg'

const PaymentSuccess = React.memo((props:any) => {
      const { status } = props.route.params;
    const colorMode = useAppColor();
  return (
    <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray,justifyContent:'center',alignItems:'center'}}>
      {status ? (
        <>
        <SuccessIcon width={60} height={60}/> 
        <TText style={{fontSize:20,color:colorMode.inverseBlack,fontWeight:'600'}}>Thanh Toán Thành Công!</TText>
        <TText style={{fontSize:16,color:colorMode.inverseBlack}}>Cảm ơn bạn đã đăng ký và sử dụng dịch vụ </TText>
        <TText style={{fontSize:16,color:colorMode.inverseBlack}}>của chúng tôi</TText>
        </>
      )
      : <>
        <ErrorIcon width={60} height={60}/>
        <TText style={{fontSize:20,color:colorMode.inverseBlack,fontWeight:'600'}}>Giao Dịch Thất bại!</TText>
        <TText style={{fontSize:16,color:colorMode.inverseBlack}}>Vui lòng tạo lại giao dịch mới</TText>
      </> 
    }
      
      <TouchableOpacity onPress={() =>  props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'Overview' }],
                    })} style={{position:'absolute',bottom:30,left:0,right:0, paddingVertical:15,backgroundColor:"#5E71EC",marginHorizontal:10,borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <TText style={{color:'white',fontWeight:'bold'}}>Quay về</TText>
            </TouchableOpacity>
    </View>
  )
})

export default PaymentSuccess