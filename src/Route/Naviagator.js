import React,{useState} from "react"
import {View,StyleSheet,Text,TouchableOpacity,Image, Dimensions} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {createDrawerNavigator,DrawerContentScrollView} from '@react-navigation/drawer'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Ionicons} from '@expo/vector-icons'
import HomeScreen from '../Screens/HomeScreen'
import AboutUsScreen from '../Screens/AboutUsScreen'
import CartScreen from '../Screens/CartScreen'
import ContactUsScreen from '../Screens/ContactUsScreen'
import HotestItemScreen from '../Screens/HotestItemScreen'
import LatestItemScreen from '../Screens/LatestItemScreen'
import OrderScreen from '../Screens/OrderScreen'
import ProductDetailScreen from '../Screens/ProductDetailScreen'
import ProfileScreen from '../Screens/ProfileScreen'
import OrderDetailScreen from "../Screens/OrderDetailScreen"
import WishListScreen from "../Screens/WishListScreen"
import CustomDrawerComponent from "./CustomDrawerComponent"
import LoginScreen from "../Screens/LoginScreen"
import HomeClassScreen from "../Screens/HomeClassScreen"
import NextClassScreen from "../Screens/NextClassScreen"
import AsyncStorage from '@react-native-async-storage/async-storage'



const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()



         



const MainNavigator = () =>{

    const [isUser, setIsUser] = useState(false)
AsyncStorage.getItem('loginuser').then(res => {
  let user = JSON.parse(res);
  if(user != null){
    setIsUser(true)
  }
})
    return(

        <NavigationContainer>
            <Drawer.Navigator
            drawerContent={(props) => <CustomDrawerComponent {...props} />}
            >
            {!isUser &&<Drawer.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />}
            {/* <Drawer.Screen name='HomeClass' component={HomeClassScreen} options={{headerShown:false}}/> */}
            <Drawer.Screen name='Home' component={HomeScreen} options={{headerShown:false}}/>
            {/* <Drawer.Screen name='NextClass' component={NextClassScreen} options={{headerShown:false}}/> */}
            <Drawer.Screen name='Cart' component={CartScreen} options={{headerShown:false}}/>
            <Drawer.Screen name='OrderDetail' component={OrderDetailScreen} options={{headerShown:false}}/>
            
            <Drawer.Screen name='Latest Item' component={LatestItemScreen} options={{headerShown:false}}/>
            <Drawer.Screen name='Hotest Item' component={HotestItemScreen} options={{headerShown:false}}/>
            <Drawer.Screen name='About Us' component={AboutUsScreen} options={{headerShown:false}}/>
            <Drawer.Screen name='Contact Us' component={ContactUsScreen} options={{headerShown:false}}/>
            <Drawer.Screen name='Order' component={OrderScreen} options={{headerShown:false}}/>
            <Drawer.Screen name='Profile' component={ProfileScreen} options={{headerShown:false}}/>
            <Drawer.Screen name='ProductDetail' component={ProductDetailScreen} options={{headerShown:false}} />
            <Drawer.Screen name='WishList' component={WishListScreen} options={{headerShown:false}}/>
           
            
            </Drawer.Navigator>
        </NavigationContainer>
    )
}


export default MainNavigator