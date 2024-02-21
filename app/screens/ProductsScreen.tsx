/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen, Text } from "app/components"
import { useBackHeader } from "app/hooks/customHeader"
import { ProductBlock } from "app/components/Product"
import { Box, View } from "native-base"
import { colors, spacing } from "app/theme"
import { ContentStyle } from "@shopify/flash-list"
import { ProductSnapshotOut } from "app/models/Product"
import { useStores } from "app/store"
import { usePaginatedResponse } from "app/hooks/api"
import { Meta, PaginateResponse, ResultClass } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { useToastErrorApi } from "app/components/AlertToast"
import { add2Cart } from "app/services/api/cart/service"
import { CartAddResponse } from "app/services/api/cart/types"


// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProductsScreenProps extends AppStackScreenProps<"Products"> { }

export const ProductsScreen: FC<ProductsScreenProps> = observer(function ProductsScreen(_props) {

  useBackHeader()

  const { navigation } = _props
  const [data, setData] = React.useState<Array<ProductSnapshotOut>>([])
  const {
    cartStore: { addProduct },
  } = useStores()
  const initialParams:Meta = {
    page:1,
    take:20
  }
  const {
    refreshing,
    isLoading, setIsLoading,
    callEndpoint,
    setRefreshing
  } = usePaginatedResponse<ProductSnapshotOut,Meta>("/products",initialParams)
  
  const { showToastApiError,showToastErrorResponse,showToastInfoMessage } = useToastErrorApi()

  async function load() {
    setIsLoading(true)
    const response = await callEndpoint()
    if (isGeneralProblem(response)) {
      showToastApiError(response as GeneralApiProblem)
    } else{
      const result = (response as ResultClass<PaginateResponse<ProductSnapshotOut>>).result
      setData([...result.items])
      setIsLoading(false)
    }
    
  }

  async function onRefresh() {
    setRefreshing(true)
    const response = await callEndpoint()
    if (isGeneralProblem(response)) {
      showToastApiError(response as GeneralApiProblem)
    } else{
      const result = (response as ResultClass<PaginateResponse<ProductSnapshotOut>>).result
      setData([...result.items])
    }
    setRefreshing(false)
  }

  async function onPress(product: ProductSnapshotOut) {
    console.log(product)
    navigation.navigate("ProductDetail", {
      product,
      categoryName: product.categ_name
    })
  }

  async function onPressCart(product: ProductSnapshotOut) {
    
    add2Cart({
      product_id:Number.parseInt(product.id),
      quantity: 1
    }).then((response:GeneralApiProblem | ResultClass<CartAddResponse>)=>{
      if (isGeneralProblem(response)) {
        showToastErrorResponse(response as GeneralApiProblem)
      } else{
        const result = (response as ResultClass<CartAddResponse>).result
        showToastInfoMessage(result.message)
      }
    })
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
    >

      <View style={$screenContentContainer}>
      <ListView<ProductSnapshotOut>
        contentContainerStyle={$listContentContainer}
        data={data}
        refreshing={refreshing}
        estimatedItemSize={177}
        onRefresh={onRefresh}
        ListEmptyComponent={
         (
            <EmptyState
              preset="generic"
              style={$emptyState}
              imageSource={require("../../assets/images/sad.png")}
              headingTx={
                "productScreen.empty"

              }
              contentTx={

                "productScreen.message"

              }
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
          )
        }
        ListHeaderComponent={
          <View style={$heading}>
            <Text preset="heading" tx="productScreen.title" style={{
              color: "white"
            }} />
          </View>
        }
        renderItem={({ item }) => (
          <Box marginBottom="5">
            <ProductBlock
              key={item.id}
              product={item}
              onPress={onPress}
              onPressCart={onPressCart}
            />
          </Box>
        )}
      />
      </View>
    </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
  height: "100%",
  backgroundColor: colors.palette.secondary,
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg,
  paddingBottom: spacing.lg,
  backgroundColor: colors.palette.secondary,
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
