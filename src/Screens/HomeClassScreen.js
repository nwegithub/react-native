import React,{Component} from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,TextInput} from 'react-native'
import color from '../Constants/Color'

class HomeClassScreen extends Component{
    constructor(props){
        super(props)
        this.state= {
            username: '',
            pass: ''
        }
    }

    goToNextClass = () =>{
        console.log('username is...', this.state.username,'and pass is',this.state.pass)
        this.props.navigation.navigate('NextClass',{
            username: this.state.username,
            pass: this.state.pass
        })
    }
    

render(){
    console.log('Next Class params..', this.props.route.params)
    return( 
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1, padding:18, justifyContent:'center', alignItems:'center'}}>
                <View style={{width: '100%'}}>
                    <TextInput 
                    value={this.state.username}
                    style={{height:50, borderWidth: 1, borderColor:color.primaryColor, paddingLeft:10, borderRadius:5}}
                    placeholder="username"
                    onChangeText={text => this.setState({
                        username: text
                    })}
                    />

                    <TextInput 
                     value={this.state.pass}
                    style={{height:50, borderWidth: 1, borderColor:color.primaryColor,marginTop:10, paddingLeft:10, borderRadius:5}}
                    placeholder="password"
                    onChangeText={text => this.setState({
                       pass: text 
                    })}
                    />
                    <TouchableOpacity onPress={() => this.goToNextClass() }
                    style={{marginTop:10, height:50, borderRadius:5,backgroundColor:color.primaryColor,
                        justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontWeight: 'bold', color:color.white,fontSize:15}}>Login</Text>
                    </TouchableOpacity>

                </View>

            </View>
            
        </SafeAreaView>
    )
}

}

export default HomeClassScreen
