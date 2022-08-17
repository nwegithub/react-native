import React,{useEffect, useState}  from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, FlatList } from 'react-native'
import HeaderComponent from "../Component/HeaderComponent";
import color from "../Constants/Color";



const OrderDetailScreen = ({ navigation,route }) => {

  let orderDetail = route?.params?.selectedOrder
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <HeaderComponent navigation={navigation} title='Order Detail' iconName='back' parentScreenName="Order"/>
        <ScrollView>
          <View style={{ flex: 1, padding: 15 }}>
            <Text style={styles.textRight}>{orderDetail.orderDate}</Text>
            <Text style={styles.textBold}>{orderDetail.voucherNo}</Text>
  
            <View style={styles.titleRowContainer}>
              <Text style={[{ flex: 1 }, styles.textBold]}>Name</Text>
              <Text style={[{ width: '15%', textAlign: 'center' }, styles.textBold]}>Qty</Text>
              <Text style={[{ width: '20%' }, styles.textRightBold]}>Price</Text>
              <Text style={[{ width: '20%' }, styles.textRightBold]}>Total</Text>
            </View>
            <View style={styles.bigDivider} />
            {
  
  orderDetail?.porducts.map((item, index) => {
                console.log("Item", item)
                return (
                  <View key={index}>
                    <View style={styles.titleRowContainer}>
                      <Text style={[{ flex: 1 }, styles.textNormal]}>{item.proudctName}</Text>
                      <Text style={[{ width: '15%', textAlign: 'center' }, styles.textNormal]}>{item.qty}</Text>
                      <Text style={[{ width: '20%' }, styles.textRight]}>{item.price}</Text>
                      <Text style={[{ width: '20%' }, styles.textRight]}>{item.qty * item.price}</Text>
                    </View>
                    <View style={styles.smallDivider} />
                  </View>
  
                )
              })
            }
            <View style={styles.subTotalContainer}>
              <View>
                <Text style={styles.textRightBold}>Sub Total -</Text>
                <Text style={styles.textRightBold}>Tax -</Text>
                <Text style={styles.textRightBold}>Delivery -</Text>
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.textRightBold}>{orderDetail.totalAmount}</Text>
                <Text style={styles.textRightBold}>{orderDetail.tax}</Text>
                <Text style={styles.textRightBold}>{orderDetail.delivery}</Text>
              </View>
            </View>
            <View style={styles.bigDivider} />
            <View style={styles.subTotalContainer}>
              <Text style={styles.textRightBold}>Total - </Text>
              <Text style={[styles.textRightBold, { marginLeft: 20 }]}>{orderDetail.totalAmount + orderDetail.tax + orderDetail.delivery}</Text>
            </View>
            <View style={[{ marginTop: 5 }, styles.bigDivider]} />
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
export default OrderDetailScreen





const styles = StyleSheet.create({
  textRight: { textAlign: 'right', color: color.darkGray, fontSize: 14 },
  textBold: { color: color.darkGray, fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  textNormal: { color: color.darkGray, fontSize: 14 },
  titleRowContainer: { flexDirection: 'row', paddingLeft: 5, paddingVertical: 10, alignItems: 'center' },
  textRightBold: { textAlign: 'right', color: color.darkGray, fontSize: 18, fontWeight: 'bold', marginTop: 5 },
  bigDivider: { height: 2, backgroundColor: color.darkGray },
  smallDivider: { marginLeft: 5, height: 1, backgroundColor: color.darkGray },
  subTotalContainer: { flexDirection: 'row', justifyContent: 'flex-end', marginVertical: 15 },
})