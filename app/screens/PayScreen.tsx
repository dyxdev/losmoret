/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import {ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { Screen, Text } from "app/components"
import { colors, spacing } from "app/theme"
import { Box, Button, HStack, VStack, ScrollView, Center, Heading, useTheme } from "native-base"
import { useStores } from "app/store"
import {ProductLineCartSnapshotOut } from "app/models/Product"
import { CustomDivider } from "app/components/CustomDivider"
import { ResultClass } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { DeleteCartResponse } from "app/services/api/cart/types"
import { useToastErrorApi } from "app/components/AlertToast"
import { AlertShow } from "app/components/AlertCard"
import { translate } from "app/i18n"

interface PayScreenProps extends AppStackScreenProps<"Pay"> { }


export const PayScreen: FC<PayScreenProps> = observer(function PayScreen(_props) {

  const {
    cartStore
  } = useStores()
  const [currentProduct] = useState<ProductLineCartSnapshotOut>()
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const { showToastErrorResponse,showToastInfoMessage } = useToastErrorApi()
  const {
    colors
  } = useTheme();

  const onRemoveProduct = async (product?:ProductLineCartSnapshotOut) => {
        setLoading(true)
        cartStore.removeProductAsync(product?.id).then((response:ResultClass<DeleteCartResponse>|GeneralApiProblem)=>{
          if (isGeneralProblem(response)) {
            showToastErrorResponse(response as GeneralApiProblem)
            setOpenAlert(false)
            setLoading(false)
          } else{
            const result = (response as ResultClass<DeleteCartResponse>).result
            showToastInfoMessage(result.message)
            setOpenAlert(false)
            setLoading(false)
            cartStore.fetchCart()
          }
        })
        
  }
  
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
    >
      <Box w="100%" marginTop="10" padding="5" flex={1}>
          
          <VStack style={$heading} >
            <HStack justifyContent="space-between" justifyItems="center">
              <Text preset="subheading" tx="cartScreen.order" style={{
                color: "white",
                textAlign: "center"
              }} />
              <Text preset="subheading" text={cartStore.order_id} style={{
                color: "white"
              }}/>
            </HStack>
            <HStack justifyContent="space-between">
              <Text preset="subheading" tx="cartScreen.delivery" style={{
                color: "white"
              }} />
              <Text preset="subheading" text={String(cartStore.amount_delivery)} style={{
                color: "white"
              }}/>
            </HStack>
            <HStack justifyContent="space-between" marginTop="10">
              <Text preset="bold" tx="cartScreen.total" style={{
                color: "white",
                fontSize: 24
              }} />
              <Text preset="bold" text={String(cartStore.amount_total)} style={{
                color: "white",
                fontSize: 24
              }}/>
            </HStack>
          </VStack>
  
          <CustomDivider></CustomDivider>

          <ScrollView w="100%" h="80" padding="2">
      <Center mt="3" mb="4">
        <Heading fontSize="xl" color={colors.red[500]}>Productos</Heading>
      </Center>
      <VStack flex="1">
        {cartStore.orderLine.map((key) => {
       return (
        <HStack key={key.id} justifyContent="space-between" marginTop="10">
        <Text preset="subheading" text={`Producto: ${key.name}`} style={{
          color: "white",
        }} />
        <Text preset="subheading" text={key.product_uom_qty.toFixed(0)} style={{
          color: "white",
        }}/>
      </HStack>
       )
      })}
      </VStack>
    </ScrollView>;

    <HStack alignItems="center" marginTop="10" w="100%" justifyContent="space-between">
          <Button variant="solid" colorScheme="coolGrey">
                Cancelar
              </Button>
          <Button colorScheme="danger">
                Pagar
          </Button>
    </HStack>
      </Box>
    
      <AlertShow
          isOpen={openAlert} 
          description={translate("cartScreen.delete", { product: currentProduct?.name ?? "" })}
          status="danger"
          titleButton={translate("cartScreen.deletebutton")}
          onOK={()=>onRemoveProduct(currentProduct)}
          onClose={()=>setOpenAlert(false)}
          isLoading={loading}
      />
    </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
  padding: 10,
  backgroundColor: colors.palette.secondary

}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}


