import React,{useState} from "react"
import {SafeAreaView,View,Text,TouchableOpacity,StyleSheet,Dimensions,Image,TextInput} from 'react-native'
import color from '../Constants/Color'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useDispatch } from "react-redux"
import LoginAction from "../store/actions/login"
import HeaderComponent from "../Component/HeaderComponent"

const LoginScreen = ({navigation, route}) =>{
    const [username, setUsername] = useState('')
    const [pass, setPass] =useState('')
    const dispatch = useDispatch()

    const loginHandle = async () =>{
        const response = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/users')
        const resData  = await response.json();
        console.log('Res data...', resData)
        resData.map((res) =>{
            if(res.username == username && res.password == pass){
                AsyncStorage.setItem('loginuser', JSON.stringify(res))
                dispatch(LoginAction.login(res))
                setUsername('')
                setPass('')
                navigation.navigate('Home')
            }
        })
    }

    return( 
        <SafeAreaView style={{flex:1}}>
            <HeaderComponent navigation={navigation} title='Profile' iconName='menupic'/>
            <View style={{flex:1, padding:18, justifyContent:'center', alignItems:'center'}}>
                <View style={{width: '100%'}}>
                    <TextInput 
                    style={{height:50, borderWidth: 1, borderColor:color.primaryColor, paddingLeft:10, borderRadius:5}}
                    placeholder="username"
                    onChangeText={text => setUsername(text)}
                    />

                    <TextInput 
                    style={{height:50, borderWidth: 1, borderColor:color.primaryColor,marginTop:10, paddingLeft:10, borderRadius:5}}
                    placeholder="password"
                    onChangeText={text => setPass(text)}
                    />
                    <TouchableOpacity onPress={() => loginHandle()}
                    style={{marginTop:10, height:50, borderRadius:5,backgroundColor:color.primaryColor,
                        justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontWeight: 'bold', color:color.white,fontSize:15}}>Login</Text>
                    </TouchableOpacity>

                </View>

            </View>
            
        </SafeAreaView>
    )
}
export default LoginScreen