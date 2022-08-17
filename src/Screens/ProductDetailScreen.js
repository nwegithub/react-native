import React,{useState,useEffect}  from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Dimensions,Image, ColorPropType,ScrollView} from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import { useDispatch, useSelector} from 'react-redux'
import Color from "../Constants/Color";
import cartAction from "../store/actions/cart"
import qtyAction from "../store/actions/qty"
import wishlistAction  from "../store/actions/wishlist"
import ButtomTabComponent from "../Component/ButtomTabComponent";
import AsyncStorage from "@react-native-async-storage/async-storage"

const height =Dimensions.get('screen').height



const ProductDetail = ({navigation,route}) =>{
    const [qty,setQty] = useState(1)
    const dispatch = useDispatch()

    const [isInWishList, setIsInWishList]=useState(false)
    
  //  console.log("Route Data..", route)
   let {product,parentScreen} = route.params


   useEffect (() =>{
     AsyncStorage.getItem('wishlist').then((res) =>{
       const wishListData = JSON.parse(res)
       if(wishListData == null){
         setIsInWishList(false)
       }else{
         let isWishListId = null
         for(let i=0;i<wishListData.length; i++){
           if(wishListData[i]._id == product._id){
             isWishListId = product._id
           }
         }
         if(isWishListId != null){
           setIsInWishList(true)
         }else{
           setIsInWishList(false)
         }
       }
     })
   },[route])

  
   const saveToCart = (item) => {
    item.qty = qty
    AsyncStorage.getItem('cart').then((res) => {
      let cartData = JSON.parse(res)
      let products = [];
      if(cartData == null){
        products.push(item)
        AsyncStorage.setItem('cart', JSON.stringify(products))
        dispatch(cartAction.addToCart(products))

        AsyncStorage.setItem('cartQty', JSON.stringify(item.qty))
        dispatch(qtyAction.setTotalQty(item.qty))
      }else{
        let cartId = null
        let totQty = item.qty

        for(let i=0; i<cartData.length; i++){
          totQty += cartData[i].qty
          if(item._id == cartData[i]._id){
            cartId = item._id
            cartData[i].qty += item.qty
          }
        }
        if(cartId == null){
          cartData.push(item)
        }
        AsyncStorage.setItem('cart', JSON.stringify(cartData))
        dispatch(cartAction.addToCart(cartData))
        AsyncStorage.setItem('cartQty', JSON.stringify(totQty))
        dispatch(qtyAction.setTotalQty(totQty))
        setQty(1)
      }
    })

  }




   const addToWishList = (product) =>{

    if(isInWishList){
      AsyncStorage.getItem('wishlist').then((res)=>{
        const wishListData = JSON.parse(res)
        let products =[]
        if(wishListData != null){
          products = wishListData.filter(prod => prod._id != product._id)
        }
        AsyncStorage.setItem('wishlist', JSON.stringify(products))
        dispatch(wishlistAction.addToWishList(products))
      })
      setIsInWishList(false)
    }
    else{
      AsyncStorage.getItem('wishlist').then((res) =>{
        
        const wishListData = JSON.parse(res)
        let products =[]
        if(wishListData == null){
          products.push(product)

          dispatch(wishlistAction.addToWishList(products))
          AsyncStorage.setItem('wishlist', JSON.stringify(products))

        }else{
          let isWishListId = null
          for(let i=0; i<wishListData.length; i++){
            if(wishListData[i]._id == products._id){
              isWishListId = product._id
            }
          }
          console.log("Is ID null? ", isWishListId)
          
         if(isWishListId == null){
           wishListData.push(product)
         }
         AsyncStorage.setItem('wishlist', JSON.stringify(wishListData))
         dispatch(wishlistAction.addToWishList(wishListData))
        }
        setIsInWishList(true)
      })
    }
  }

  
  

    
    return(
        <SafeAreaView style={{flex:1}}>
             <HeaderComponent navigation={navigation} title='Pumpkin Soup' iconName='back' parentScreenName={parentScreen}/>
            <ScrollView showsVerticalScrollIndicator={false}style={{flex:1}}>
                <View style={{width:'100%', height:height/3}}>
                <Image source={{uri:product.imgUrl}} style={{width:'100%',height:height/3}}/>
                </View>
                <View style={{padding:10,marginTop:5,}}>
                    <View style={{padding:10,borderRadius:10,backgroundColor:Color.white}}>
                        <View style={{flexDirection:'row',justifyContent:'space-between',marginLeft:5}}>
                            <Text style={{color:Color.primaryColor,fontSize:18,fontWeight:'bold'}}>{product.productName}</Text>


                            <TouchableOpacity 
                              onPress={() => addToWishList(product)}>
                              { isInWishList ? <Image style={{width:30,height:30,tintColor:Color.primaryColor}}  source={require('../../assets/cart.png')}/>:
                            <Image source={require('../../assets/heart.png')} style={{width:30,height:30,tintColor:Color.primaryColor}}/>}
                            </TouchableOpacity>


                        </View>
                        <View style={{flexDirection:'row',marginLeft:5}}>
                            {!product.discount == 0 && <Text style={{color:Color.darkGray,fontSize:16,textDecorationLine:'line-through'}}>{product.price} MMK</Text>}
                            <Text style={{color:Color.darkGray,fontSize:16,marginLeft:8}}>{product.price - product.discount}</Text>

                        </View>

                    
                </View>

                <View style={{padding:10,borderRadius:10,backgroundColor:Color.white,marginTop:10,flexDirection:'row',justifyContent:'space-between',}}>
                        
                            <View style={{flexDirection:'row',margin:5}}>
                                <TouchableOpacity onPress={() =>{
                                    if(qty > 1){
                                        setQty(qty -1)
                                    }
                                }}>
                                <Image source={require('../../assets/minus.png')} style={{width:30,height:30}}/>
                                </TouchableOpacity>


                                <Text style={{marginHorizontal:5,fontSize:18}}>{qty}</Text>

                                <TouchableOpacity onPress={() =>{
                                    setQty( qty + 1)
                                }}>
                                <Image source={require('../../assets/plus.png')} style={{width:30,height:30}}/>
                                </TouchableOpacity>
                            </View>
                            <View style={{backgroundColor:Color.primaryColor,borderRadius:10,marginVertical:7}}>
                                <TouchableOpacity 
                                onPress={() => saveToCart(product)} >
                                <Text style={{color:Color.white,fontSize:16,fontWeight:'bold',marginHorizontal:20,marginVertical:5}}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                         </View> 

                <View style={{paddingLeft:15,borderRadius:10,backgroundColor:Color.white,marginTop:10}}>
                        <Text style={{fontSize:18,fontWeight:'bold',color:Color.darkGray}}>Description</Text>
                        <Text style={{color:Color.darkGray,marginTop:5,fontSize:14,paddingBottom:10}}>{product.description}
                        </Text>

                    </View>

                      

                    

                </View>

            </ScrollView>
            <ButtomTabComponent navigation={navigation} routeName ={route.name}/>
        </SafeAreaView>
    )
}
export default ProductDetail