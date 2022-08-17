import React,{useState,useEffect} from "react";
import {View,StyleSheet,Text,TouchableOpacity,Image, Dimensions,Modal} from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import Color from "../Constants/Color";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from 'react-redux'
import loginAction from '../store/actions/login'



         
const CustomDrawerComponent = (props) => { 
    
    const [showDialog, setShowDialog] = useState(false)

    const dispatch = useDispatch()

  const logoutHandle = (props) => {
    AsyncStorage.removeItem('loginuser')
    dispatch(loginAction.login(null))
    props.navigation.navigate('Login')
    setShowDialog(false)
  }

    console.log("Drawer Content Props..", props)
    return (
        <DrawerContentScrollView{...props}>

        <View style={styles.container}>
        
        <View style={styles.profileContainer}>
            <View style={styles.profImgContainer}>
            <Image source = {require('../../assets/baby.jpg')} style={styles.profImg}/>
            </View>

            <Text style={styles.profLabel}>Name</Text>
            <Text style={styles.profLabel}>09255978275</Text>

        </View>

        
        <TouchableOpacity   onPress={() => props.navigation.navigate('Home')} style={styles.itemContainer}>
            <Image source={require('../../assets/home.png')} style={styles.itemImg} />
        <Text style={styles.itemLabels}>Home </Text>   
        </TouchableOpacity>


        <TouchableOpacity   onPress={() => props.navigation.navigate('Order')} style={styles.itemContainer}>
            <Image source={require('../../assets/order.png')} style={styles.itemImg} />
        <Text style={styles.itemLabels}>Order Detail </Text>   
        </TouchableOpacity>

        <TouchableOpacity   onPress={() => props.navigation.navigate('Latest Item')} style={styles.itemContainer}>
            <Image source={require('../../assets/latest_item.png')} style={styles.itemImg} />
        <Text style={styles.itemLabels}>Latest Items </Text>   
        </TouchableOpacity>

        <TouchableOpacity   onPress={() => props.navigation.navigate('Hotest Item')} style={styles.itemContainer}>
            <Image source={require('../../assets/hottest_item.png')} style={styles.itemImg} />
        <Text style={styles.itemLabels}>Hotest Items</Text>   
        </TouchableOpacity>

        <View style={styles.divider}/>

        <TouchableOpacity   onPress={() => props.navigation.navigate('About Us')} style={styles.itemContainer}>
            <Image source={require('../../assets/about_us.png')} style={styles.itemImg} />
        <Text style={styles.itemLabels}>About Us </Text>   
        </TouchableOpacity>

        <TouchableOpacity   onPress={() => props.navigation.navigate('Contact Us')} style={styles.itemContainer}>
            <Image source={require('../../assets/contact_us.png')} style={styles.itemImg} />
        <Text style={styles.itemLabels}>Contact Us </Text>   
        </TouchableOpacity>


        <View style={styles.divider}/>

        
        <TouchableOpacity   onPress={() =>{ props.navigation.closeDrawer()
             setShowDialog(true)}} style={styles.itemContainer}>
            <Image source={require('../../assets/home.png')} style={styles.itemImg} />
        <Text style={styles.itemLabels}>Logout </Text>   
        </TouchableOpacity>

        <Modal animationType="none" transparent={true} visible={showDialog}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                    Please come back soon!</Text>
                    <Text style={styles.exitText}>
                    Are you sure want to exit</Text>    

                <View style={styles.yesContainer}>
                    <TouchableOpacity onPress={() => logoutHandle(props)}
                    style={styles.yesContent}>
                        <Text style={styles.yesText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setShowDialog(false)} style={styles.yesContent}>
                        <Text style={styles.yesText}>Cancel</Text>

                    </TouchableOpacity>
                </View>
                </View>

            </View>

        </Modal>

        </View>
            
        </DrawerContentScrollView>
    )
}

const styles = StyleSheet.create(
    {
        container:{ flex:1},

        profileContainer:{backgroundColor:'#C95227',alignItems:'center',justifyContent:'center',padding:18 },
        profImgContainer:{width:80,height:80,borderRadius:100},
        profImg: {width:90,height:90,borderRadius:45},
        profLabel:{marginTop:8,fontSize:14,textAlign:'center',color:'white'},
        itemContainer:{flexDirection:'row',alignItems:'center',padding: 16,marginLeft:10},
        itemImg:{width:25,height:25,tintColor:'#C95227',marginRight:10},
        itemLabels:{marginLeft:8, fontSize: 16,color:'gray',fontWeight:'bold'},
        divider:{width:Dimensions.get('screen').width/2,
                marginVertical:15,
            height:2,
            marginLeft:30,
        backgroundColor:'#C95227'},
        modalContainer:{flex:1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent:'center',alignItems: 'center'},
        modalContent:{backgroundColor:Color.white,padding:20, width: '90%',borderRadius:10},
        modalText:{fontSize:20, color:Color.primaryColor,fontWeight:'bold',textAlign:'center'},
        exitText:{marginTop: 6, fontSize:16, color:Color.darkGray,textAlign: 'center'},
        yesContainer:{marginTop:15, width:'100%', flexDirection:'row', justifyContent:'space-between'},
        yesContent:{borderRadius:10, width:'45%', backgroundColor:Color.primaryColor,justifyContent:
        'center',alignItems:'center',paddingVertical:8},
        yesText:{color:Color.white,fontWeight: 'bold',fontSize: 16},


    }
)


export default CustomDrawerComponent