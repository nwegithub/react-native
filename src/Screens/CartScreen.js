import React,{useEffect} from "react";
import { SafeAreaView, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native'
import HeaderComponent from '../Component/HeaderComponent';
import colors from '../Constants/Color';
import ButtomTabComponent from '../Component/ButtomTabComponent';
import { useDispatch, useSelector} from 'react-redux'
import AsyncStorage from "@react-native-async-storage/async-storage";
import cartAction from "../store/actions/cart";
import qtyAction from "../store/actions/qty";
const width = Dimensions.get('screen').width


const CartScreen = ({ navigation, route }) => {
    const products = useSelector(state => state.Cart)
    const totQty = useSelector(state => state.Qty)
    const dispatch =  useDispatch()
    console.log("Cart Screen Products...", products)
    console.log("Qty Screen totQty...", totQty)

  useEffect( () =>{
      const getProducts = async () =>{
          let cartData = await AsyncStorage.getItem('cart')
          let prods = JSON.parse(cartData)

          if(prods == null){
              dispatch(cartAction.addToCart([]))
              AsyncStorage.setItem('cart',JSON.stringify([]))
          }else{
              dispatch(cartAction.addToCart(prods))
              AsyncStorage.setItem('cart', JSON.stringify(prods))
          }
      }

      const getQty = async () =>{
          let qtyData = await AsyncStorage.getItem('cartQty')
          let qty = JSON.parse(qtyData)

           if (qty == null){
               dispatch(qtyAction.setTotalQty(0))
               AsyncStorage.setItem('cartQty', JSON.stringify(0))
           }else{
               dispatch(cartAction.addToCart(qty))
               AsyncStorage.setItem('cartQty', JSON.stringify(qty))
           }
      }
      getQty()
      getProducts()
  }, [])

  
  const clickMinus = (minProd) =>{
      let index = products.findIndex(prod => prod == minProd)
      if(products[index].qty >1){
          products[index].qty -= 1

          dispatch(cartAction.addToCart(products))
          AsyncStorage.setItem('cart', JSON.stringify(products))

          dispatch(qtyAction.setTotalQty(totQty -1))
          AsyncStorage.setItem('cartQty', JSON.stringify(totQty - 1))
      }else{
          deleteHandle(minProd)
      }
      console.log("Index...", index)
  }

  const deleteHandle = (item) =>{
      let index = products.findIndex(prod => prod == item)
      let leftData =[]

        AsyncStorage.getItem('cart').then((data) =>{

            let cartData = JSON.parse(data)

            if(cartData == null){
                
                dispatch(cartAction.addToCart([]))
                AsyncStorage.setItem('cart', JSON.stringify([]))
                dispatch(qtyAction.setTotalQty(0))
                AsyncStorage.setItem('cartQty', JSON.stringify(0))
            }else{
                for( let i=0; i<cartData.length; i++){
                    if(cartData[i]._id != item._id){
                        leftData.push(cartData[i])
                    }
                }
                console.log("left Data...", leftData)
                dispatch(cartAction.addToCart(leftData))
                AsyncStorage.setItem('cart', JSON.stringify(leftData))

                dispatch(qtyAction.setTotalQty(totQty - products[index].qty))
                AsyncStorage.setItem('cartQty', JSON.stringify(totQty - products[index].qty ))
            }
        })   
  }

  

  const clickPlus = (plusProd) =>{
    let index = products.findIndex(prod => prod == plusProd)
    products[index].qty += 1

    dispatch(cartAction.addToCart(products))
    AsyncStorage.setItem('cart', JSON.stringify(products))

    dispatch(qtyAction.setTotalQty(totQty +1))
    AsyncStorage.setItem('cartQty',JSON.stringify(totQty +1))
  }

    


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} title='Home' routeName={route.name} iconName='menupic'/>
            <View style={{ flex: 1, paddingHorizontal: 18 }}>
          {products?.length >0 ?<FlatList
                    style={{ flex: 1 }}
                    data={products}
                    renderItem={({ item, index }) => {
                        return (
                            <View key={index} style={{
                                flexDirection: 'row', backgroundColor: colors.white, borderRadius: 10,
                                padding: 16, marginTop: 15
                            }}>
                                <View style={{
                                    width: width / 4 + 10, height: width / 4 + 10, borderRadius: 10,
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Image source={{uri: item.imgUrl}} resizeMode="cover" style={{
                                        width: "100%", height: "100%",
                                        borderRadius: 10
                                    }} />
                                </View>
                                <View style={{ flex: 1, marginLeft: 15 }}>
                                    <Text style={{ fontSize: 20, color: colors.darkGray, fontWeight: 'bold' }}>{item.productName}</Text>
                                    <Text style={{ fontSize: 14, color: colors.primaryColor }}>(Made in Myanmar)</Text>
                                    <Text style={{ marginTop: 15, fontSize: 16, color: colors.primaryColor }}>{item.price}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 15, marginLeft: 10 }}>
                                        <TouchableOpacity onPress={()=>{
                                            clickMinus(item)
                                        }

                                        
                                        }>
                                        <Image source={require('../../assets/minus.png')} style={{ width: 35, height: 35 }} />
                                        </TouchableOpacity>
                                        <Text style={{ marginHorizontal: 8 }}>{item.qty}</Text>
                                        <TouchableOpacity onPress={ () =>{
                                            clickPlus(item)
                                        }}>
                                        <Image source={require('../../assets/plus.png')} style={{ width: 35, height: 35 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={
                        <TouchableOpacity onPress={() => {
                            AsyncStorage.removeItem('cart')
                            dispatch(cartAction.addToCart([]))
                            AsyncStorage.removeItem('cartQty')
                            dispatch(qtyAction.setTotalQty(0))
                        }} style={{ marginVertical: 15, height: 50, backgroundColor: colors.primaryColor, justifyContent: 'center', alignItems: 'center' }}>
                            
                            <Text style={{ color: colors.white, fontSize: 16, fontWeight: 'bold' }}>Shopping</Text>
                        </TouchableOpacity>
                    }
                />   :
                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text>There is no products in your cart</Text>
                </View>
            
            }


            </View>
            <ButtomTabComponent navigation={navigation} routeName ={route.name}/>
        </SafeAreaView>
    )
}


export default CartScreen;