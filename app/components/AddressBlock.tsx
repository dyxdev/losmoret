/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable-next-line react-native/no-inline-styles */
import { Box, HStack, VStack,Text } from "native-base"
import React from "react"
import { Icon } from "./Icon"
import { TouchableHighlight } from "react-native-gesture-handler"
import { colors } from "app/theme"
import { Address } from "app/services/api/account/types"

interface AddressBlockProps{
    
    address: Address,
    onDelete?: (address:Address) => void,
    onEdit?: (address:Address) => void
}

export const AddressBlock = (props:AddressBlockProps) => {

    
    return (
        <Box  borderColor="muted.900" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack alignItems="center">
            
                <TouchableHighlight onPress={()=>{
                    props.onDelete && props.onDelete(props.address)
                }}>
                <Icon icon="trash" size={30} color={colors.palette.primary}/>
                </TouchableHighlight>
                <TouchableHighlight onPress={()=>{
                    props.onEdit && props.onEdit(props.address)
                }}>
                <Icon icon="pencil" size={25} color={colors.palette.primary}/>
                </TouchableHighlight>
                <Box w={5}/>
                <VStack alignItems="start" justifyContent="space-around">
                    <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                        {"Calle y numero: " + props.address.street}
                    </Text>
                    <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                        {"Calle 2: " + props.address.street2}
                    </Text>
                    <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                        {"Reparto: " + props.address.city}
                    </Text>
                    <Text style={{
                       color:"white",
                       fontSize: 16
                    }}>
                        {"Estado/Provincia: " + props.address.state_id[1] ??  + " " + props.address.state_id[2]}
                    </Text>
                </VStack>
            </HStack>
        </Box>)
}