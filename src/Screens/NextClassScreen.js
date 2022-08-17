import React,{Component} from 'react'
import {SafeAreaView,View,Text,TouchableOpacity} from 'react-native'
import color from '../Constants/Color'


class NextClassScreen extends Component{
    constructor(props){
        super(props)
        this.state= {
            homeData : 'Data From Next Class'
        }
    }

    render(){
        console.log('params...', this.props.route.params)
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
                    <Text>username is {this.props.route.params.username}</Text>
                    <Text>username is {this.props.route.params.pass}</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('HomeClass',{
                        data: this.state.homeData
                    })} style={{marginTop: 10, paddingHorizontal: 15, paddingVertical: 8, justifyContent: 'center',
                     alignItems: 'center',  backgroundColor: color.primaryColor, borderRadius: 5}}>
                         <Text style={{color: color.white, fontSize: 14}}>Back</Text>

                    </TouchableOpacity>

                </View>
                    <Text>{this.props.route.params?.data}</Text>
            </SafeAreaView>
        )
    }

}
export default NextClassScreen