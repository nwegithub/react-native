import React  from "react";
import {View,StyleSheet,Text,TouchableOpacity,Image, Platform} from 'react-native'

const HeaderComponent = ({navigation,title, routeName,iconName,parentScreenName}) =>{
    return(
        <View style={styles.headerContainer}>
            {
                iconName == 'menupic' ?
                <TouchableOpacity onPress={ () => navigation.toggleDrawer()}>
                    <Image source={require('../../assets/menupic.png')} style={styles.headerIcon}/>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => {
                    navigation.navigate(parentScreenName)
                  }}>
                    <Image source={require('../../assets/forwardarrow.png')} style={styles.headerIcon}/>
                </TouchableOpacity>
            }
            <Text style={styles.headerTitle}>{title}</Text>

        </View>
    )
}


const styles = StyleSheet.create ({
    headerContainer:{
        height:50,marginTop:40,backgroundColor:'white',flexDirection:'row',alignItems:'center',paddingHorizontal:18
    },
    headerIcon:{
        width:30,height:30,tintColor:'#C95227'
    },
    headerTitle:{
        fontSize: 18, color:'#C95227', marginLeft:10,fontWeight:'bold'
    },
})

export default HeaderComponent