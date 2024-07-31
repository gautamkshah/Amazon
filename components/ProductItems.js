import { StyleSheet, Text, View,Pressable,Image } from 'react-native'
import React from 'react'

const ProductItems = ({item}) => {
  return (
    <Pressable style={{marginHorizontal:20, marginVertical:15}}>
        <Image source={{uri:item.image}} style={{width:150,height:150}}/>
        <Text numberOfLines={1} style={{marginTop:10,width:150}}>{item.title}</Text>
        <View style={{marginTop:5,flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            <Text style={{fontSize:15,fontWeight:"bold"}}>₹ {item.price}</Text>
            <Text style={{color:"#FFC72C",fontWeight:"bold"}}>{item.rating?.rate} ratings</Text>
        </View>
        <Pressable >
            <Text style={{backgroundColor:"#ffc72c",color:"white",padding:5,marginTop:5,textAlign:"center",borderRadius:8}}>Add to Cart</Text>
        </Pressable>
    </Pressable>
  )
}

export default ProductItems

const styles = StyleSheet.create({})