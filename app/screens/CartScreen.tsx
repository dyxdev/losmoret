/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen, Text } from "app/components"
import { ContentStyle } from "@shopify/flash-list"
import { spacing } from "app/theme/spacing"
import { useBackHeader } from "app/hooks/customHeader"
import { colors } from "app/theme"
import { Button, Center, VStack } from "native-base"
import { ProductCartBlock } from "app/components/ProductCartBlock"
import { SkeletonProducts } from "app/components/Skeleton"
import { useStores } from "app/store"
import {ProductLineCartSnapshotOut } from "app/models/Product"
import { CustomDivider } from "app/components/CustomDivider"
import { ResultClass } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { DeleteCartResponse } from "app/services/api/cart/types"
import { useToastErrorApi } from "app/components/AlertToast"
import { AlertShow } from "app/components/AlertCard"
import { translate } from "app/i18n"

interface CartScreenProps extends AppStackScreenProps<"Cart"> { }


export const CartScreen: FC<CartScreenProps> = observer(function CartScreen(_props) {
  
  const { navigation } = _props
  const {
    cartStore
  } = useStores()
  const [currentProduct, setCurrentProduct] = useState<ProductLineCartSnapshotOut>()
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useBackHeader()
  const { showToastErrorResponse,showToastInfoMessage } = useToastErrorApi()
  async function load() {
    await cartStore.fetchCart()
   
  }
  useEffect(() => {
    load().then(()=> console.log(cartStore.state,cartStore.orderLine))
  }, [])
  
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
      <ListView<ProductLineCartSnapshotOut>
        ItemSeparatorComponent={CustomDivider}
        contentContainerStyle={$listContentContainer}
        data={cartStore.orderLine}
        estimatedItemSize={177}
        ListEmptyComponent={
          <Center flex={1} height="full">
            {(
             <EmptyState
             preset="generic"
             imageSource={require("../../assets/images/empty.png")}
             style={$emptyState}
             headingTx={
               "cartScreen.empty"

             }
             contentTx={

               "cartScreen.message"

             }
             headingStyle={{
              color:"white"
             }}
             contentStyle={{
              color:"white"
             }}
             imageStyle={$emptyStateImage}
             ImageProps={{ resizeMode: "contain" }}
           />
            )}
          </Center>
        }
        ListHeaderComponent={
          <View style={$heading}>
            <VStack>
              <Text preset="heading" tx="cartScreen.title" style={{
                color: "white"
              }} />
              {cartStore.orderLine.length > 0 && <Button bg="red.900" onPress={()=>{
                navigation.navigate("Pay")
              }}>Finalizar pedido</Button>}
            </VStack>
          </View>
        }
        renderItem={({ item }) => (
            <ProductCartBlock
              product={item}
              onPress={(product)=>{
                setOpenAlert(true)
                setCurrentProduct(product)
              }}
            />
        )}
      />
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

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}

const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
  flex:1
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
