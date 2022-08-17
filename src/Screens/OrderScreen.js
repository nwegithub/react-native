import React,{useEffect, useState}  from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet, FlatList,Image,Dimensions, ColorPropType} from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import ButtomTabComponent from "../Component/ButtomTabComponent";
import Color from "../Constants/Color";



// const ProdList=[
//     {
//         date:'15 Jan 2021',
//         item_name:'S001',
//         tot:'Total-2500MMK',
//         img:require ('../../assets/backarrow1.png')
//     },

//     {
//         date:'16 Jan 2021',
//         item_name:'S002',
//         tot:'Total-2000MMK',
//         img:require ('../../assets/backarrow1.png')
//     },

//     {
//         date:'18 Jan 2021',
//         item_name:'S003',
//         tot:'Total-2500MMK',
//         img:require ('../../assets/backarrow1.png')
//     },

//     {
//         date:'29 Jan 2021',
//         item_name:'S004',
//         tot:'Total-2900MMK',
//         img:require ('../../assets/backarrow1.png')
//     },

//     {
//         date:'21 Jan 2021',
//         item_name:'S005',
//         tot:'Total-1500MMK',
//         img:require ('../../assets/backarrow1.png')
//     },

//     {
//         date:'22 Jan 2021',
//         item_name:'S006',
//         tot:'Total-2500MMK',
//         img:require ('../../assets/backarrow1.png')
//     },

//     {
//         date:'22 Jan 2021',
//         item_name:'S006',
//         tot:'Total-2500MMK',
//         img:require ('../../assets/backarrow1.png')
//     },
    
// ]



const OrderScreen = ({navigation,route}) =>{

    const [orderList,setOrderList] = useState([])

useEffect(() =>{

    const getOrderList = async () =>{
    const response = await fetch('https://myshop-6c5af.firebaseio.com/orders.json')
    const resData = await response.json();

    const list = [];
      for(const key in resData){
        list.push(resData[key])
        console.log("Order list.....",list)
      }
      setOrderList(list)
    }
    getOrderList()

},[])
    return(
        <View style={{flex:1}}>
            <HeaderComponent navigation={navigation} title='Order' iconName='menupic'/>
            <View style={{flex:1,marginTop:7}}>
            <FlatList 
                data={orderList}
                renderItem={({item,index}) =>{
                    return(
                        <TouchableOpacity onPress={ () => navigation.navigate('OrderDetail',{selectedOrder: item}
                        )} style={{padding:5,backgroundColor:Color.white,marginTop:5}}>
                            <View style={{alignItems:'flex-end'}}>
                                <Text>{item.orderDate}</Text>
                            </View> 
                                <View style={{padding:5,marginLeft:5}}> 
                                <Text style={{fontSize:16,fontWeight:'bold'}}>{item.voucherNo}</Text>
                                
                                </View>
                                <View style={{flexDirection:'row',marginLeft:5,justifyContent:'space-between'}}>
                                    <Text style={{fontSize:16,color:Color.darkGray,}}>Total-{item.totalAmount} MMK</Text>
                                    <View style={{width:30,height:30}}>
                                <Image source={require ('../../assets/backarrow1.png')} style={{width:'100%',height:'100%',tintColor:Color.primaryColor}}/>
                                </View>
                                </View>
                        </TouchableOpacity>
                            
                            
                    )
                }}
                keyExtractor= {(item,index) => index.toString()} 
                showsVerticalScrollIndicator={false}
                />
            
            </View>
            <ButtomTabComponent navigation={navigation} routeName={route.name}/>
        </View>
    )
}
export default OrderScreen