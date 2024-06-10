/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable-next-line react-native/no-inline-styles */
import { ProductLineCartSnapshotOut } from "app/models/Product"
import { Avatar, Box, HStack, Spacer, VStack,Text } from "native-base"
import React from "react"
import { Icon } from "./Icon"
import { TouchableHighlight } from "react-native-gesture-handler"
import { colors } from "app/theme"

interface ProductCartProps{
    image?:string
    product: ProductLineCartSnapshotOut,
    onPress: (product:ProductLineCartSnapshotOut) => void
}

export const ProductCartBlock = (props:ProductCartProps) => {

    
    return (
        <Box  borderColor="muted.900" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[1, 2]} alignItems="center">
            
                <TouchableHighlight onPress={()=>{
                    props.onPress(props.product)
                }}>
                <Icon icon="trash" size={30} color={colors.palette.primary}/>
                </TouchableHighlight>
                <Box w={5}/>
                <VStack alignItems="start" justifyContent="space-around">
                    <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                        {props.product.name}
                    </Text>
                    <Text  style={{
                       color:"white",
                       fontSize: 16
                    }}>
                        Cantidad: {Number(props.product.product_uom_qty).toFixed(0)}
                    </Text>
                    <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                    Total: $ {` ${props.product.price_total} ${props.product.currency_id.length > 1 ? props.product.currency_id[1] : "CUP"}`} 
                </Text>
                </VStack>
            </HStack>
        </Box>)
}

export const ProductSearchBlock = (props:ProductCartProps) => {
    
    return (
        <Box  borderColor="muted.900" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[1, 2]} alignItems="center">

                <Box w={5}/>
                <VStack alignItems="start" justifyContent="space-around">
                    <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                        {props.product.name}
                    </Text>
                </VStack>
            </HStack>
        </Box>)
}