import React,{useState,useEffect}  from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet, Dimensions,Image,TextInput} from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import color from '../Constants/Color'
import {useDispatch, useSelector} from 'react-redux'
import dataAction  from '../store/actions/data'


const height = Dimensions.get('screen').width

const ContactUsScreen = ({navigation,route}) =>{

const [data, setData]= useState("")
const dispatch = useDispatch()
const collectData = useSelector(state => state.Data)
const [contactUs, setContactUs] = useState({})
console.log("Collect Data", collectData)



useEffect(() => {

  const getContactUs = async () => {
    const response = await fetch('https://myshop-6c5af.firebaseio.com/contactus.json')
    const resData = await response.json();
    let contactusData = {};
    for (const key in resData) {
      contactusData = resData[key]
    }
    setContactUs(contactusData)
    console.log("Contact  Us...", contactusData)
  }
  
  getContactUs()

}, [])



const saveToState = (data) =>{
    dispatch(dataAction.SaveData(data))
}

const changeState = () =>{
    dispatch(dataAction.RemoveData())
}


    return(
        <SafeAreaView style={{flex:1}}>
            <HeaderComponent navigation={navigation} title='Contact us' iconName='back'/>
            <View style={{flex:1,}}>






          {/* <View style={{padding:20}}>
            <TextInput
            style={{ height: 45, borderColor: '#000', borderWidth: 1 }}
            onChangeText={text => setData(text)}
          />
          <TouchableOpacity onPress={() => {
            saveToState(data)
          }}
            style={{
              marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18, justifyContent: 'center',
              alignItems: 'center', backgroundColor: '#33aacc'
            }}>
            <Text>Save to State</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => {
            changeState()
          }} style={{
            marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,
            justifyContent: 'center', alignItems: 'center', backgroundColor: '#33aacc'
          }}>
            <Text>Remove Data from State</Text>
          </TouchableOpacity>
          <Text style={{ marginVertical: 15 }}>{collectData}</Text>

          </View> */}
           
            

              <View style={{backgroundColor:color.primaryColor,justifyContent:'center',alignItems:'center',padding:20}}>
              
              <Image style={{width: 80, height: 80}}
                source={require('../../assets/contact.png')} />
              <Text style={{color: color.white,fontSize: 20,fontWeight: 'bold'}}>Contact Us</Text>
        
              </View>


                <View style={{justifyContent:'center',alignItems:'center',padding:10,marginTop:10}}>
                    <View style={{width:30,height:30,}}>
                        <Image style={{height:'100%',width:'100%',}} source={require('../../assets/marker.png')}/>
                    </View>
                    <Text style={{color:color.darkGray,fontSize:18,marginTop:5}}>{contactUs?.address}</Text>

                </View>

                <View style={{justifyContent:'center',alignItems:'center',padding:10,}}>
                    <View style={{width:30,height:30,}}>
                        <Image style={{height:'100%',width:'100%',}} source={require('../../assets/phone.png')}/>
                    </View>
                    <Text style={{color:color.darkGray,fontSize:18,marginTop:5}}>{contactUs?.mobile}</Text>

                </View>

                <View style={{justifyContent:'center',alignItems:'center',padding:10,}}>
                    <View style={{width:30,height:30,}}>
                        <Image style={{height:'100%',width:'100%',}} source={require('../../assets/email.png')}/>
                    </View>
                    <Text style={{color:color.darkGray,fontSize:18,marginTop:5}}>{contactUs?.email}</Text>

                </View>

                <View style={{justifyContent:'center',alignItems:'center',padding:10,}}>
                    <View style={{width:40,height:40,}}>
                        <Image style={{height:'100%',width:'100%',}} source={require('../../assets/time.png')}/>
                    </View>
                    <Text style={{color:color.darkGray,fontSize:18,marginTop:5}}>Open Time - {contactUs?.openTime}</Text>
                    <Text style={{color:color.darkGray,fontSize:18,marginTop:5}}>Open Time -{contactUs?.closeTime}</Text>

                </View> 
                


                
               

            </View>
        </SafeAreaView>
    )
}
export default ContactUsScreen