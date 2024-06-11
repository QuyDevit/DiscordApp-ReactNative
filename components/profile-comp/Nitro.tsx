import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { WebView } from 'react-native-webview';
import useAppColor from '../../themed/useAppColor';
import { TText } from '../../themed/themeComponents';
import { RadioButton } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
// @ts-ignore
import Icon2 from "../../assets/icon2.svg";
// @ts-ignore
import Icon1 from "../../assets/icon1.svg";
// @ts-ignore
import ZaloPayIcon from "../../assets/zalopay.svg";
// @ts-ignore
import MomoIcon from "../../assets/momo.svg";
// @ts-ignore
import PaypalIcon from "../../assets/paypal.svg";


const Nitro = React.memo((props:any) => {
    const colorMode = useAppColor();
    const [checked, setChecked] = useState('basic');
    const [checkedpayment, setCheckedPayment] = useState('zalo');
    const handlePress = async () => {
        let item;
        let payment;
        if(checkedpayment === 'zalo')
        {
            payment = 'https://server-api-payment.vercel.app/payment'
        }else if (checkedpayment === 'momo'){
            payment= 'https://server-api-payment.vercel.app/payment-momo'
        }else{
            payment= 'https://server-api-payment.vercel.app/pay'
        }
        if(checked === 'basic'){
            item = {
                content:'Nâng Cấp Gói Nitro Basic',
                price: checkedpayment==='paypal' ? 1.65  :42000 
            }
        }else{
            item ={
                content:'Nâng Cấp Gói Nitro Pro',
                price: checkedpayment==='paypal' ? 4.45  :113000
            }
        }
        try {
            const response = await fetch(payment, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item), 
            });

            // Check if the response content type is JSON
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                if (data) {
                    props.navigation.navigate('ViewPayment', { orderUrl: checkedpayment==='zalo'? data.order_url : checkedpayment==='momo' ? data.payUrl: data.approval_url ,paymentmethod:checkedpayment==='zalo'? 0 :checkedpayment==="momo"?1:2 });
                } else {
                    // Handle case when order_url is not found
                    console.error('No order URL found in response');
                }
            } else {
                // Handle case when response is not JSON
                const text = await response.text();
                console.error('Unexpected response content:', text);
            }
        } catch (error) {
            console.error('Error fetching payment URL:', error);
        }
    };
    return (
        <View style={{flex:1,backgroundColor:colorMode.inverseWhiteGray}}>
             <View style={{paddingHorizontal:15,marginBottom:20}}>
           <TText style={{color:colorMode.inverseBlack,fontWeight:'600',fontSize:28,fontStyle:'italic',marginBottom:5,marginTop:20,textAlign:'center'}}>NÂNG CẤP NITRO</TText>  
        </View>

            <TouchableOpacity onPress={() => setChecked('basic')} style={[styles.optionContainer, ]}>
                 <LinearGradient
                    colors={['#3e70dd', '#949cf7']}
                    start={{ x: 0, y: 0 }} 
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                    />
                    <View style={{position:'absolute',top:20,bottom:0,right:80}}>
                        <Icon2 width={100} height={100}/>
                    </View>
                <View style={styles.textContainer}>
                    <TText style={[styles.optionTitle, {color: 'white',fontSize:22,fontStyle:'italic'}]}>NITRO BASIC</TText>
                    <TText style={[styles.optionTitle, {color: 'white'}]}>42.000 đ / tháng</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Tải lên 50MB</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Emoji tùy chọn tại bất cứ đâu</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Huy hiệu Nitro đặc biệt trên trang cá nhân của bạn</TText>
                </View>
                <RadioButton
                    value="basic"
                    status={checked === 'basic' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('basic')}
                    color={'white'}
                />
            </TouchableOpacity>
            <TouchableOpacity  onPress={() => setChecked('pro')} style={[styles.optionContainer, {backgroundColor: colorMode.appLightGray}]}>
                <LinearGradient
                    colors={['#593695', '#eb459f']}
                    start={{ x: 0, y: 0 }} 
                    end={{ x: 1, y: 0 }}
                    style={styles.gradient}
                    />
                    <View style={{position:'absolute',top:20,bottom:0,right:60}}>
                        <Icon1 width={120} height={120}/>
                    </View>
                <View style={styles.textContainer}>
                    <TText style={[styles.optionTitle, {color: 'white',fontSize:22,fontStyle:'italic'}]}>NITRO PRO</TText>
                    <TText style={[styles.optionTitle, {color: 'white'}]}>113.000 đ / tháng</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Tải lên 500MB</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Emoji tùy chọn tại bất cứ đâu</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Nâng cấp Máy chủ</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Hồ sơ tùy chỉnh và hơn thế nữa!</TText>
                    <TText style={[styles.optionDescription, {color: 'white'}]}>Huy hiệu Nitro đặc biệt trên trang cá nhân của bạn</TText>
                </View>
                <RadioButton
                    value="pro"
                    status={checked === 'pro' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('pro')}
                    color={'white'}
                />
            </TouchableOpacity>
            <TText style={{fontSize:18,color:colorMode.inverseBlack,fontWeight:'600',textAlign:'center'}}>Thanh toán qua</TText>
            <View style={{paddingHorizontal:10,flexDirection:'row',marginTop:20,justifyContent:'space-around'}}>
                <TouchableOpacity onPress={() => setCheckedPayment('zalo')} style={{flexDirection:'row'}}>
                    <RadioButton
                    value="zalo"
                    status={checkedpayment === 'zalo' ? 'checked' : 'unchecked'}
                    onPress={() => setCheckedPayment('zalo')}
                    color={'black'}
                />
                <ZaloPayIcon width={100} height={40}/>
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => setCheckedPayment('momo')} style={{flexDirection:'row'}}>
                    <RadioButton
                    value="momo"
                    status={checkedpayment === 'momo' ? 'checked' : 'unchecked'}
                    onPress={() => setCheckedPayment('momo')}
                    color={'black'}
                />
                <MomoIcon width={50} height={35}/>
                </TouchableOpacity>
                 <TouchableOpacity onPress={() => setCheckedPayment('paypal')} style={{flexDirection:'row',}}>
                    <RadioButton
                    value="paypal"
                    status={checkedpayment === 'paypal' ? 'checked' : 'unchecked'}
                    onPress={() => setCheckedPayment('paypal')}
                    color={'black'}
                />
                <PaypalIcon width={100} height={40}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handlePress} style={{position:'absolute',bottom:0,left:0,right:0, paddingVertical:15,backgroundColor:"#5E71EC",marginHorizontal:10,borderRadius:15,alignItems:'center',justifyContent:'center',marginBottom:20}}>
                <TText style={{color:'white',fontWeight:'bold'}}>Thanh toán</TText>
            </TouchableOpacity>
        </View>
    )
}
)
export default Nitro

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 15,
        paddingVertical:20,
        paddingHorizontal:10,
        marginHorizontal:8,
        overflow:'hidden'
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
    },
    optionTitle: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom:10
    },
    optionDescription: {
        fontSize: 13,
        marginBottom:10
    },
     gradient: {
    ...StyleSheet.absoluteFillObject, // Ensure gradient covers the whole container
  },
})