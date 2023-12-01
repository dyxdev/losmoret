import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ActivityIndicator, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen, Text, Toggle } from "app/components"
import { translate } from "app/i18n"
import { ContentStyle } from "@shopify/flash-list"
import { spacing } from "app/theme/spacing"
import { delay } from "app/utils/delay"
import { OrderBlock } from "app/components/OrderBlock"
import { useCartHeader } from "app/hooks/customHeader"



interface OrdersScreenProps extends AppStackScreenProps<"Orders"> {}

const data = [{
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  fullName: "Orden #",
  timeStamp: "12:47 PM",
  recentText: "Productos ordenados:  10",
  avatarUrl: require('../../assets/images/order.png')
}];

export const OrdersScreen: FC<OrdersScreenProps> = observer(function OrdersScreen(_props) {
  
  const [isLoading, setIsLoading] = React.useState(false)

  useCartHeader(_props.navigation)

  useEffect(() => {
    ;(async function load() {
      setIsLoading(true)
      for(let i = 0 ; i < 10 ; i++){
        data.push(data[0]);
      }
      await Promise.all([delay(750),delay(750)])
      setIsLoading(false)
    })()
  },[])
  
  return (
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
              <ActivityIndicator />
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
              <Text preset="heading" tx="orderScreen.title" />
              {(data.length > 0) && (
                <View style={$toggle}>
                  <Toggle
                    value={true}
                    onValueChange={() =>
                      console.log("lol")
                    }
                    variant="switch"
                    labelTx="orderScreen.complete"
                    labelPosition="left"
                    labelStyle={$labelStyle}
                    accessibilityLabel={translate("demoPodcastListScreen.accessibility.switch")}
                  />
                </View>
              )}
            </View>
          }
          renderItem={({ item }) => (
            <OrderBlock
            avatarUrl={item.avatarUrl}
            fullName={item.fullName}
            timeStamp={item.timeStamp}
            recentText={item.recentText}
            />
          )}
        />
      </Screen>
  )
})


const $screenContentContainer: ViewStyle = {
  flex: 1,
 
}

const $listContentContainer: ContentStyle = {
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.lg + spacing.xl,
  paddingBottom: spacing.lg,
}

const $heading: ViewStyle = {
  marginBottom: spacing.md,
}


const $toggle: ViewStyle = {
  marginTop: spacing.md,
}

const $labelStyle: TextStyle = {
  textAlign: "left",
}


const $emptyState: ViewStyle = {
  marginTop: spacing.xxl,
}

const $emptyStateImage: ImageStyle = {
  transform: [{ scaleX: 1 }],
}