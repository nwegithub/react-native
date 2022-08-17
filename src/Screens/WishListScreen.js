import React,{useEffect}  from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet, FlatList,Image,Dimensions, ColorPropType} from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import Color from "../Constants/Color";
import {useSelector, useDispatch} from 'react-redux'
import cartAction from "../store/actions/cart"
import qtyAction from "../store/actions/qty"
import wishlistAction  from "../store/actions/wishlist"
import AsyncStorage from "@react-native-async-storage/async-storage"


const width = Dimensions.get('screen').width
const height = Dimensions.get('screen').height



const WishListScreen = ({navigation,route}) =>{

    const dispatch = useDispatch()

    const products = useSelector(state => state.WishList)

    console.log("The information are ..........", products)


useEffect(() =>{
    async function getWishListProducts(){
        let wishListData = await AsyncStorage.getItem('wishlist')
        let prods = JSON.parse(wishListData)

    if(prods == null){
        AsyncStorage.setItem('wishlist',JSON.stringify([]))
        dispatch(wishlistAction.addToWishList([]))
    }else{
        AsyncStorage.setItem('wishlist',JSON.stringify(prods))
        dispatch(wishlistAction.addToWishList(prods))
    }
    }
    getWishListProducts()
},[])


    const saveToCart = (item) => {
        item.qty = 1
        AsyncStorage.getItem('cart').then((res) => {
            console.log("Cart Data form Async...", res)
            let cartProducts = JSON.parse(res)
            let products = []
            if (cartProducts == null) {
                products.push(item)
                AsyncStorage.setItem('cart', JSON.stringify(products))
                dispatch(cartAction.addToCart(products))
                AsyncStorage.setItem('cartQty', JSON.stringify(1))
                dispatch(qtyAction.setTotalQty(1))
            } else {
                let isInCart = null
                let totQty = item.qty;
                for (let i = 0; i < cartProducts.length; i++) {
                    totQty += cartProducts[i].qty
                    if (cartProducts[i]._id == item._id) {
                        cartProducts[i].qty += 1
                        isInCart = item._id
                    }
                }
    
                AsyncStorage.setItem('cartQty', JSON.stringify(totQty))
                dispatch(qtyAction.setTotalQty(totQty))
    
                if (isInCart == null) {
                    cartProducts.push(item)
                    AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
                    dispatch(cartAction.addToCart(cartProducts))
                } else {
                    AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
                    dispatch(cartAction.addToCart(cartProducts))
                }
    
            }
    
        })
    }
    
    
    const removeWishListItem = (item) =>{
        AsyncStorage.getItem('wishlist').then((data) =>{
            let wishListData = JSON.parse(data)
            let leftWishList = [];
            if(wishListData != null){
                leftWishList = wishListData.filter(prod => prod._id != item._id)
            }
            dispatch(wishlistAction.addToWishList(leftWishList))
            AsyncStorage.setItem('wishlist',JSON.stringify(leftWishList))
        })
    }


    


    return(
        <View style={styles.container}>
        <HeaderComponent navigation={navigation} title='Wish List' routeName={route.name} iconName='back' parentScreenName="Profile"/>
        { products?.length > 0 ?
        <View style={styles.content}>
        { 
        products?.length > 0 && <View style={{alignItems:'flex-end'}}>
             <TouchableOpacity onPress={ () =>{
                 AsyncStorage.removeItem('wishlist')
                 dispatch(wishlistAction.addToWishList([]))
                 
             }}>
                 <Text style={{fontSize: 24, fontWeight: 'bold', color : Color.primaryColor}}>Remove all</Text>

             </TouchableOpacity>

         </View>}
          <FlatList
              data={products}
              renderItem={({ item, index}) =>{
                return(
                  <TouchableOpacity onPress={ () => navigation.navigate('ProductDetail',{product:item})} key={index} 
                   style={styles.overView}>

                     <View 
                     style={styles.btn}>

                        <Image source={{uri: item.imgUrl }} resizeMode="cover" style={styles.btn}/>

                     </View>
                      <View style={styles.overText}>
                        <Text style={styles.text1}>{item.productName}</Text>
                        <Text style={styles.text2}>(Made in Myanmar)</Text>
                        <Text style={styles.text3}>{item.price}</Text>

                      </View>
                      <TouchableOpacity  onPress={() => saveToCart(item)} 
                       style={styles.smallBtn}>

                          <Text style={styles.btnText}>Add To Cart</Text>

                      </TouchableOpacity>
                    <TouchableOpacity onPress={()=> removeWishListItem(item)} style={{position: 'absolute', top:-5, right: -2}}>
                        <Image source={require('../../assets/minus.png')} style={{width:30, height:30}}/>
                    </TouchableOpacity>

                  </TouchableOpacity>
                )
              }}
              keyExtractor= {(item,index) => index.toString()} 
              showsVerticalScrollIndicator={false}
          />
       
      
      


      </View>
      
      :

      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <Text>There is no wishlist data!</Text>
          </View>}
      {/* <ButtomTabComponent navigation={navigation} routeName ={route.name}/> */}
      </View>
      
    )
}
export default WishListScreen


const styles = StyleSheet.create({

    container:{flex: 1},
    content:{flex: 1, padding:18},
    titText:{fontSize:24,fontWeight: 'bold',  color:Color.primaryColor,},
    overView:{ flexDirection:'row', backgroundColor:Color.white,borderRadius:10,padding:16,marginTop:15},
    btn:{width:width/4+10, height: width/4+10, borderRadius:10,justifyContent:'center',alignItems:'center'},
    img:{width: "100%",height:"100%",borderRadius:10},
    overText:{flex:1,marginLeft:10},
    text1:{fontSize: 20, color:Color.darkGray,fontWeight:'bold'},
    text2:{fontSize: 14,color: Color.primaryColor},
    text3:{marginTop:  15, fontSize: 16, color: Color.primaryColor, },
    smallBtn:{borderTopLeftRadius:10, borderBottomRightRadius: 10, paddingVertical: 8,
      paddingHorizontal:25, position: 'absolute', bottom:0, right:0, backgroundColor: Color.primaryColor,
      justifyContent:'center',alignItems:'center'},
      btnText:{color: Color.white, fontSize: 14, fontWeight:'bold'},

})