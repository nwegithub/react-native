import React,{useEffect,useState}  from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Dimensions,Image,Modal} from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import ButtomTabComponent from "../Component/ButtomTabComponent";
import color from "../Constants/Color";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from 'react-redux'
import loginAction from '../store/actions/login'


const height = Dimensions.get('screen').height


const ProfileScreen = ({navigation,route}) =>{

const [profileData,setProfileDta]=useState({})

const [modalVisible, setModalVisible] = useState(false)

const dispatch = useDispatch()

useEffect(() =>{
    const getProfileData = async () =>{
        const response = await fetch('https://myshop-6c5af.firebaseio.com/profile.json')
        const resData = await response.json()
        console.log('profile Data ', resData)
        let profileData = {}
        for (const key in resData){
            profileData = resData[key]
        }
        setProfileDta(profileData)
        // console.log('Modified profile Data...', profileData)
    }
    getProfileData()
})



const logout = () => {
    AsyncStorage.removeItem('loginuser')
    dispatch(loginAction.login(null))
    setModalVisible(false)
    navigation.navigate('Login')
  }
    return(
        <SafeAreaView style={styles.container}>
             <HeaderComponent navigation={navigation} title='Profile' iconName='menupic'/>
            <View style={styles.container}>
            <View style={styles.pfContainer}>
                    <View style={styles.img} >
                        <Image style={styles.img1} source={require('../../assets/baby.jpg')}/>
                    </View>
                    <Text style={styles.pfName}>{profileData.name} {profileData.school}</Text>
                    <Text style={styles.pfPhone}>{profileData.phone}</Text>
            </View>  
            <View style={styles.contactContainer}> 
                <View style={styles.contactContent}>
                    <Text style={styles.contactText}>phone</Text>
                    <Text style={styles.contactText}>09xxxxxxxx</Text>

                </View>
                <View style={styles.line}/>
                <View style={styles.contactContent1}>
                    <Text style={styles.contactText}>Email</Text>
                    <Text style={styles.contactText}>{profileData.email}</Text>

                </View>
            </View>
            <View style={styles.addressContainer}>
                <View >
                    <Text style={styles.addressText} >Address</Text>
                    <Text style={styles.addressText1} >{profileData.address}</Text>
                </View>
            </View>
            <View style={styles.iconContainer}>
                <View style={styles.iconContent}>
                    <Image source={require('../../assets/order.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>My Order</Text>
                </View>
                <TouchableOpacity onPress={() =>{navigation.navigate('WishList')}} style={styles.iconContent}>
                    
                    <Image source={require('../../assets/heart.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>My Wishlist</Text>
                    </TouchableOpacity>
                
                <TouchableOpacity
                onPress={() => {
                    setModalVisible(true)
                  }} 
                style={styles.iconContent}>
                    <Image source={require('../../assets/logout_circle.png')} style={styles.icon}/>
                    <Text style={styles.iconText}>Logout</Text>
                    </TouchableOpacity>

               

                
            </View>
            
                    
            <Modal 
            animationType="none"
            visible={modalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalText}>
                    Please come back soon!</Text>
                    <Text style={styles.exitText}>
                    Are you sure want to exit</Text>    

                <View style={styles.yesContainer}>
                    <TouchableOpacity onPress={() => logout()}
                    style={styles.yesContent}>
                        <Text style={styles.yesText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ () => setModalVisible(false)} style={styles.yesContent}>
                        <Text style={styles.yesText}>No</Text>

                    </TouchableOpacity>
                </View>
                </View>

            </View>

        </Modal>
        
                    
                
            </View>
            <ButtomTabComponent navigation={navigation} routeName={route.name}/>
        </SafeAreaView>
    )
}
export default ProfileScreen

const styles = StyleSheet.create({
    container:{flex:1},

    pfContainer:{backgroundColor:color.primaryColor,height:height/4,justifyContent:'center',alignItems:'center'},

    img:{width:75,height:75,borderRadius:50 },

    img1:{width:'100%',height:'100%',borderRadius:50},

    pfName:{fontSize:16,fontWeight:'bold',color:color.white,marginTop:5},

    pfPhone:{fontSize:16,fontWeight:'bold',color:color.white},

    contactContainer:{marginHorizontal: 10,marginTop: 15, backgroundColor: '#fff',borderRadius: 10, padding: 15, justifyContent: 'center',marginBottom:10},  

    contactContent:{ width: '100%',flexDirection: 'row',justifyContent: 'space-between'},

    contactText:{fontWeight:'bold',fontSize:18,color:color.darkGray},

    line:{width:'100%',height:1,backgroundColor:color.darkGray,},

    contactContent1:{flexDirection:'row',justifyContent:'space-between',marginTop:10},

    addressContainer:{padding:10,backgroundColor:color.white,borderRadius:10,marginHorizontal:10},

    addressText:{fontSize:18,color:color.darkGray,marginBottom:5,fontWeight:'bold'},

    addressText1:{fontSize:16,color:color.darkGray,marginBottom:5},

    iconContainer:{padding:10,borderRadius:10,backgroundColor:color.white,margin:10},

    iconContent:{flexDirection:'row',padding:7},

    icon:{tintColor:color.primaryColor,width:30,height:30},

    iconText:{fontSize:18,color:color.darkGray,marginLeft:12},

    modalContainer:{flex:1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent:'center',alignItems: 'center'},
        modalContent:{backgroundColor:color.white,padding:20, width: '90%',borderRadius:10},
        modalText:{fontSize:20, color:color.primaryColor,fontWeight:'bold',textAlign:'center'},
        exitText:{marginTop: 6, fontSize:16, color:color.darkGray,textAlign: 'center'},
        yesContainer:{marginTop:15, width:'100%', flexDirection:'row', justifyContent:'space-between'},
        yesContent:{borderRadius:10, width:'45%', backgroundColor:color.primaryColor,justifyContent:
        'center',alignItems:'center',paddingVertical:8},
        yesText:{color:color.white,fontWeight: 'bold',fontSize: 16},

    

   
    
    
    
    
    
})