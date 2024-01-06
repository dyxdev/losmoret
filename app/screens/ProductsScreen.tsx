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
import { SkeletonProducts } from "app/components/Skeleton"
import { ProductSnapshotOut } from "app/models/Product"
import { useStores } from "app/store"
import { usePaginatedResponse } from "app/hooks/api"
import { Meta, PaginateResponse, ResultClass } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { useToastErrorApi } from "app/components/AlertToast"



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
  
  const { showToastApiError } = useToastErrorApi()

  async function load() {
    setIsLoading(true)
    const response = await callEndpoint()
    if (isGeneralProblem(response)) {
      showToastApiError(response as GeneralApiProblem)
    } else{
      const result = (response as ResultClass<PaginateResponse<ProductSnapshotOut>>).result
      setData([...result.items])
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
    navigation.navigate("ProductDetail", {
      product,
      categoryName: "Productos ahumados"

    })
  }

  async function onPressCart(product: ProductSnapshotOut) {
    
    addProduct(
      {
        id: product.id,
        name: product.name,
        price: product.list_price,
        quantity: product.qty_available,
        image: product.product_images.length > 0 ? product.product_images[0] : null ,
        firstTime: true
      }
    )
  }
  useEffect(() => {
    load()
  }, [])

  return (
    <Screen
      preset="fixed"
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
          isLoading ? (
            <SkeletonProducts />
          ) : (
            <EmptyState
              preset="generic"
              style={$emptyState}
              headingTx={
                "demoPodcastListScreen.noFavoritesEmptyState.heading"

              }
              contentTx={

                "demoPodcastListScreen.noFavoritesEmptyState.content"

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
