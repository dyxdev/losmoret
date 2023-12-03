import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ImageStyle, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen, Text } from "app/components"
import { useBackHeader } from "app/hooks/customHeader"
import { ProductBlock } from "app/components/Product"
import { Box, NativeBaseProvider, View } from "native-base"
import { spacing } from "app/theme"
import { delay } from "app/utils/delay"
import { ContentStyle } from "@shopify/flash-list"
import { SkeletonProducts } from "app/components/Skeleton"

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "app/models"

interface ProductsScreenProps extends AppStackScreenProps<"Products"> {}

const ahumados = require("../../assets/images/ahumado.jpg")


const productos = [
  {
    id: 1,
    title: 'Productos ahumados',
    image: ahumados,
    stock: 10,
    price:  1000,
    value: "1000"
  }
  ];

export const ProductsScreen: FC<ProductsScreenProps> = observer(function ProductsScreen(_props) {
  
  useBackHeader()

  const [isLoading, setIsLoading] = React.useState(false)

const [data,setData] = React.useState(productos)

async function load() {
  setIsLoading(true)
  const newData = []
  for(let i = 0 ; i < 100 ; i++){
    newData.push(data[0]);
  }
  setData([...newData])
      
}

  useEffect(() => {
    
      load().then(()=>{console.log()})
    
  },[])
  
  return (
    <NativeBaseProvider>
    <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >
        <ListView
          contentContainerStyle={$listContentContainer}
          data={data}
          estimatedItemSize={177}
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
              <Text preset="heading" tx="productScreen.title" />
            </View>
          }
          renderItem={({ item }) => (
            <Box marginBottom="5">
              <ProductBlock key={item.id} id={item.id} image={item.image} title={item.title} />
            </Box>
          )}
        />
      </Screen>
    </NativeBaseProvider>
    
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
 
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
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}
