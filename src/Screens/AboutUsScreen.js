import React,{useState,useEffect}  from "react";
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Image,Dimensions,TextInput} from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import color from "../Constants/Color";
import AsyncStorage from '@react-native-async-storage/async-storage'

const height=Dimensions.get('screen').height



// const arr = [
//     "Mobile Software Development Training Center",
//     "Practice and apply knowledge faster in real-world scenarios with projects and interactive courses.",
//     "Curate and share Pluralsight content to reach your learning goals faster.",
//     "We help you quickly and easily experiment, build UIs, add features, and fix bugs faster."
//   ]

const AboutUsScreen= ({navigation,route}) =>{

  const [data, setData] = useState("")
  const [collectData, setCollectData] = useState("")
  const [aboutUs, setAboutUs] = useState([])



  useEffect(() => {

    
    const getAboutUs = async () => {
      const response = await fetch('https://myshop-6c5af.firebaseio.com/aboutus.json')
      const resData =  await  response.json();
      
      
      const list = [];
      for(const key in resData){
        list.push(resData[key])
      }
      setAboutUs(list)

    }
    getAboutUs()
  }, [])


    
  const saveToAsycStorage = (data) => {
    console.log("DATA is", data)
    AsyncStorage.setItem('data', JSON.stringify(data))
  }

  const getDataFromAsyncStorage = async () => {
      const res = await AsyncStorage.getItem('data')
      const collData = JSON.parse(res)

      console.log("Data..", collData)
      setCollectData(collData)
  }

  const removeDataFromAsyncStorage  =  () => {
    AsyncStorage.removeItem('data')
  }


    return(
        <SafeAreaView style={{flex:1}}>
             <HeaderComponent navigation={navigation} title='About Us' iconName='back'/>
            <View style={{flex:1,}}>
                <View style={{backgroundColor:color.primaryColor,justifyContent:'center',alignItems:'center',height:height/4}}>
                    <View style={{width:80,height:80}}>
                        <Image style={{width:'100%',height:'100%'}} source={require('../../assets/about_us.png')}/>
                    </View>
                    <Text style={{fontWeight:'bold',fontSize:18,color:color.white}}>Contact Us</Text>
                </View>




                {/* <View style={{padding: 20}}>
            <TextInput
                style={{height: 45, borderColor:'#000', borderWidth: 1}}
                onChangeText={text => setData(text)}
            />
            <TouchableOpacity onPress={() => {
                saveToAsycStorage(data)
            }}  style={{marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,  justifyContent:  'center', alignItems: 'center',backgroundColor: '#33aacc'}}>
              <Text>Save to Async Storage</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                getDataFromAsyncStorage()
            }}  style={{marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,  justifyContent:  'center', alignItems: 'center',backgroundColor: '#33aacc'}}>
              <Text>Get Data from Async Storage</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                removeDataFromAsyncStorage()
            }}  style={{marginVertical: 20, paddingVertical: 8, paddingHorizontal: 18,  justifyContent:  'center', alignItems: 'center',backgroundColor: '#33aacc'}}>
              <Text>Remove Data from Async Storage</Text>
            </TouchableOpacity>

            <Text style={{marginVertical: 15}}>{collectData}</Text>


        </View> */}



            
{
          aboutUs.map((item, index) => {
            return (
              <View key={index} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10, marginTop: 10, }}>
                <View style={{ width: 20, height: 20, backgroundColor: color.primaryColor }}></View>
                <Text style={{ flex: 1, marginLeft: 15, fontSize: 16, color: color.darkGray }}>{item.description}</Text>
              </View>
            )
          })
        }


            </View>
        </SafeAreaView>
    )
}
export default AboutUsScreen