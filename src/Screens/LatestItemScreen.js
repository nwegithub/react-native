import React, { useState, useEffect } from 'react'
import { SafeAreaView, View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import color from "../Constants/Color";
import AsyncStorage from '@react-native-async-storage/async-storage'
import {useDispatch} from 'react-redux'
import cartAction from '../store/actions/cart'
import qtyAction from '../store/actions/qty'
const width = Dimensions.get('screen').width

const LatestItemScreen = ({ navigation, route }) => {
    const [hottestItems, sethottestItems] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        const getLatestProductList = async () => {
            const resp = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
            const resData = await resp.json()
            resData.map((prod) => prod.qty = 1)
            sethottestItems(resData)
        }

        getLatestProductList()
    }, [])

    const clickMinus = async (item) => {
        const resp = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
        const resData = await resp.json()
        resData.map((prod) => prod.qty = 1)
        if (item.qty > 1) {
            item.qty -= 1
            let index = resData.findIndex(prod => prod._id == item._id)
            resData[index] = item
        }
        sethottestItems(resData)
    }

    const clickPlus = async (item) => {
        const resp = await fetch('https://mobidevzoneshopapi.herokuapp.com/api/products')
        const resData = await resp.json()
        resData.map((prod) => prod.qty = 1)
        item.qty += 1
        let index = resData.findIndex(prod => prod._id == item._id)
        resData[index] = item
        sethottestItems(resData)
        //setSelectedProduct(item)
    }

    const saveToCart = (item) => {
        AsyncStorage.getItem('cart').then((res) => {
            let cartProducts = JSON.parse(res)
            let products = []
            if (cartProducts == null) {
                products.push(item)
                AsyncStorage.setItem('cart', JSON.stringify(products))
                dispatch(cartAction.addToCart(products))
                AsyncStorage.setItem('cartQty', JSON.stringify(item.qty))
                dispatch(qtyAction.setTotalQty(item.qty))
            } else {
                let isInCart = null
                let totQty = item.qty;
                for (let i = 0; i < cartProducts.length; i++) {
                    totQty += cartProducts[i].qty
                    if (cartProducts[i]._id == item._id) {
                        cartProducts[i].qty += item.qty
                        isInCart = item._id
                    }
                }
                if (isInCart == null) {
                    cartProducts.push(item) 
                } 
                AsyncStorage.setItem('cart', JSON.stringify(cartProducts))
                dispatch(cartAction.addToCart(cartProducts))
                AsyncStorage.setItem('cartQty', JSON.stringify(totQty))
                dispatch(qtyAction.setTotalQty(totQty))

            }

        })
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <HeaderComponent navigation={navigation} title='Hotest Item' iconName='menupic'/>
            <View style={{ flex: 1 }}>
                <FlatList
                    numColumns={2}
                    data={hottestItems}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.cardCtn}>
                                <View style={styles.imgCtn}>
                                    <View style={{ width: 100, height: 80 }}>
                                        <Image style={{ width: '100%', height: '100%' }} resizeMode='cover' source={{uri: item.imgUrl}} />
                                    </View>

                                    <Text style={styles.prodNameTxt}>{item.productName}</Text>
                                    <Text style={styles.priceTxt}>{item.price} MMK</Text>

                                    <View style={styles.qtyContainer}>
                                        <TouchableOpacity onPress={() => clickMinus(item)}>
                                            <Image style={styles.increaseIcon} source={require('../../assets/minus.png')} />
                                        </TouchableOpacity>
                                        <Text style={styles.qtyText}>{item.qty}</Text>
                                        <TouchableOpacity onPress={() => clickPlus(item)}>
                                            <Image style={styles.increaseIcon} source={require('../../assets/plus.png')} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => saveToCart(item)} style={styles.addToCartCtn}>
                                    <Text style={{ color: color.white }}>Add to Cart</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default LatestItemScreen

const styles = StyleSheet.create({
    qtyContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
    increaseIcon: { width: 30, height: 30, tintColor: color.primaryColor },
    qtyText: { marginHorizontal: 10, fontSize: 16, color: color.darkGray, fontWeight: 'bold' },
    cardCtn: { width: width / 2 - 20, backgroundColor: color.white, margin: 10 },
    imgCtn: { flex: 1, alignItems: 'center', padding: 10, justifyContent: 'center' },
    prodNameTxt: { textAlign: 'center', marginTop: 10, color: color.darkGray, fontSize: 16, fontWeight: 'bold' },
    priceTxt: { textAlign: 'center', marginTop: 10, color: color.darkGray, fontSize: 14 },
    addToCartCtn: { backgroundColor: color.primaryColor, justifyContent: 'center', alignItems: 'center', padding: 10 },

})