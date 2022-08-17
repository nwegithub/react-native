import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity ,Image,FlatList,Dimensions, BackHandler} from 'react-native';
import ButtomTabComponent from '../Component/ButtomTabComponent';
import HeaderComponent from '../Component/HeaderComponent';
import Color from '../Constants/Color';
import { useDispatch,useSelector } from 'react-redux'; 
import cartAction from "../store/actions/cart"
import qtyAction from "../store/actions/qty"
import AsyncStorage from "@react-native-async-storage/async-storage"

const width=Dimensions.get('screen').width
const height = Dimensions.get('screen').height






const HomeScreen= ({navigation, route,})  => {

  const [products,setProducts] = useState([])
  const dispatch = useDispatch()

  useEffect(() =>{


    // fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
        //     .then((response) => response.json())
        //     .then((prods) => {
        //         console.log("Products Data...", prods)
        //         setProducts(prods)
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });

       


    const getProductList = async () =>{
      const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
      const resJsonData = await response.json()
      setProducts(resJsonData)
    }
    getProductList()


    const backAction = ()=>{
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
      
    );
    return () => backHandler.remove();


  },[route])

  
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
        }
         else {
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


    




    return(
      
      <View style={styles.container}>
        <HeaderComponent navigation={navigation} title='Home' routeName={route.name} iconName='menupic'/>
        
        <View style={styles.content}>
          <Text style={styles.titText}>Popular Items</Text>
          <FlatList
              data={products}
              renderItem={({ item, index}) =>{
                return(
                  <TouchableOpacity onPress={ () => navigation.navigate('ProductDetail',
                  {product:item,
                    parentScreen: "Home" 
                  })} key={index} 
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


                  </TouchableOpacity>
                )
              }}
              keyExtractor= {(item,index) => index.toString()} 
              showsVerticalScrollIndicator={false}
          />
       
      
      


      </View>
      <ButtomTabComponent navigation={navigation} routeName ={route.name}/>
      </View>
      
    )
  }
export default HomeScreen;  

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