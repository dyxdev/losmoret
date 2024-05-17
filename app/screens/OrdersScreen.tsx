/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen, Text } from "app/components"
import { ContentStyle } from "@shopify/flash-list"
import { spacing } from "app/theme/spacing"
import { OrderBlock } from "app/components/OrderBlock"
import { useBackHeader } from "app/hooks/customHeader"
import { colors } from "app/theme"
import { Divider } from "native-base"
import { getOrders } from "app/services/api/orders/service"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { useToastErrorApi } from "app/components/AlertToast"
import { ResultClass } from "app/services/api"
import { Order } from "app/services/api/orders/types"



interface OrdersScreenProps extends AppStackScreenProps<"Orders"> {}

const  avatarUrl = require('../../assets/images/order.png')


export const OrdersScreen: FC<OrdersScreenProps> = observer(function OrdersScreen(_props) {
  
  const [isLoading, setIsLoading] = React.useState(false)
  const [orders, setOrders] = React.useState<Order[]>()
  const { navigation } = _props

  useBackHeader(navigation)
  const { showToastApiError} = useToastErrorApi()

  async function load() {
    setIsLoading(true)
    const response = await getOrders()
    
    if (isGeneralProblem(response)) {
      showToastApiError(response as GeneralApiProblem)
    } else{
      const result = (response as ResultClass<Order[]>).result
      setOrders(result)
    }
    setIsLoading(false)
  }
  useEffect(() => {
      load()
  },[])

  async function onPress(order: Order) {
    
    navigation.navigate("OrderDetail", {
      order
    })
  }
  
  return (
    <Screen
        preset="fixed"
        contentContainerStyle={$screenContentContainer}
      >
        <ListView
          ItemSeparatorComponent={Divider}
          contentContainerStyle={$listContentContainer}
          data={orders}
          estimatedItemSize={177}
          ListEmptyComponent={
            isLoading ? (
              <ActivityIndicator />
            ) : (
              <EmptyState
              preset="generic"
              style={$emptyState}
              imageSource={require("../../assets/images/sad.png")}
              headingTx={
                "orderScreen.empty"

              }
              contentTx={

                "orderScreen.message"

              }
              imageStyle={$emptyStateImage}
              ImageProps={{ resizeMode: "contain" }}
            />
            )
          }
          ListHeaderComponent={
            <View style={$heading}>
              <Text preset="heading" tx="orderScreen.title" style={{
                color:"white"
              }} />
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={()=>onPress(item)}>
                        <OrderBlock
            avatarUrl={avatarUrl}
            fullName={item.name}
            timeStamp={item.date_order}
            recentText={item.state}
            />
            </TouchableOpacity>
            
          )}
        />
      </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
  backgroundColor: colors.palette.bgImage
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