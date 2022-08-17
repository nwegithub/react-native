import { NavigationContainer } from "@react-navigation/native";
import React,{useEffect,useState}  from "react";
import {View,Text,TouchableOpacity,StyleSheet,Image,Dimensions} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import qtyAction from "../store/actions/qty"
import AsyncStorage from "@react-native-async-storage/async-storage"
import colors from '../Constants/Color';

const width= Dimensions.get('screen').width

const ButtomTabComponent = ({navigation,routeName}) =>{
    const qty = useSelector(state => state.Qty)
    const dispatch = useDispatch()
     
    useEffect(() => {
        async function getQty() {
           let qtyData = await AsyncStorage.getItem('cartQty')
           let qty = JSON.parse(qtyData)
           if(qty == null){
             dispatch(qtyAction.setTotalQty(0))
             AsyncStorage.setItem('cartQty', JSON.stringify(0))
           }else{
             dispatch(qtyAction.setTotalQty(qty))
             AsyncStorage.setItem('cartQty', JSON.stringify(qty))
           }
         }
         getQty()
     
       }, [navigation, qty])
     


    return(

        <View style={{flexDirection:'row',backgroundColor:'white',height:60}}>



        <TouchableOpacity   onPress={() =>navigation.navigate('Home')} 
        style={{width: width/4, justifyContent:'center',alignItems:'center'}}>
                        <Image source={require('../../assets/home.png')}  style={{width:25,height:25, tintColor: routeName =='Home' ? '#C95227' : 'gray'}}/>
                        <Text style={{marginTop:5, color: routeName =='Home' ? '#C95227' : 'gray'}}>
                    Home
                </Text>
            </TouchableOpacity>


            <TouchableOpacity onPress={ () => navigation.navigate('Cart')}
             style={{width: width/4, justifyContent:'center',alignItems:'center',tintColor: routeName =='Cart' ? '#C95227' : 'gray'}}>
                <Image source={require('../../assets/cart.png')}  style={{width:25,height:25,tintColor: routeName =='Cart' ? '#C95227' : 'gray'}}/>

                
                { qty != 0 &&  <View style={{
          position: 'absolute', top: -5, right: 0, marginTop: 5, borderRadius: 11,
          marginRight: width / 8 - 22, width: 22, height: 22, justifyContent: 'center', alignItems: 'center',
          backgroundColor: 'green'
        }}>
           <Text style={{ fontSize: 12, color: colors.white }}>{qty}</Text>
        </View>}

        <Text style={[styles.bottomTabTitle, { color: routeName == "Cart" ? '#C95227' : 'gray' }]}>Cart</Text>
            </TouchableOpacity>


            <TouchableOpacity   onPress={() =>navigation.navigate('Profile')}
             style={{width: width/4, justifyContent:'center',alignItems:'center', tintColor: routeName =='Profile' ? '#C95227' : 'gray'}}>
                <Image source={require('../../assets/profile.png')}  style={{width:25,height:25, tintColor: routeName =='Profile' ? '#C95227' : 'gray'}}/>
                <Text style={{marginTop:5, color:routeName =='Profile' ? '#C95227' : 'gray'}}>
                    Profile
                </Text>
            </TouchableOpacity>


            

            <TouchableOpacity onPress={ () => navigation.navigate('Order')}
             style={{width: width/4, justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../assets/order.png')}  style={{width:25,height:25,tintColor: routeName =='Order' ? '#C95227' : 'gray'}}/>
                <Text style={{marginTop:5, color: routeName =='Order' ? '#C95227' : 'gray' }}>
                    Order
                </Text>
            </TouchableOpacity>

            

        </View>
    )
}
export default ButtomTabComponent

const styles = StyleSheet.create({
    
    bottomTabTitle: { marginTop: 2, fontSize: 12, fontWeight: 'bold' }
  })