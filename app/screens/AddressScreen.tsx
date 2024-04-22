/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import {ActivityIndicator, ImageStyle, View, ViewStyle } from "react-native"
import { AppStackScreenProps } from "app/navigators"
import { EmptyState, ListView, Screen } from "app/components"
import { ContentStyle } from "@shopify/flash-list"
import { spacing } from "app/theme/spacing"
import { useBackHeader } from "app/hooks/customHeader"
import { colors } from "app/theme"
import { Center, VStack } from "native-base"
import { CustomDivider } from "app/components/CustomDivider"
import { ResultClass } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { useToastErrorApi } from "app/components/AlertToast"
import { AlertShow } from "app/components/AlertCard"
import { AddressBlock } from "app/components/AddressBlock"
import { Address } from "app/services/api/account/types"
import { getAddress } from "app/services/api/account/service"


interface AddressScreenProps extends AppStackScreenProps<"Address"> { }


export const AddressScreen: FC<AddressScreenProps> = observer(function AddressScreen(_props) {
  
  const { navigation } = _props
  const [address, setAdreess] = useState<Array<Address>>([])
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const {showToastApiError } = useToastErrorApi()

  useBackHeader(navigation)
  
  async function load() {
    setLoading(true)
    const response = await getAddress()
    if (isGeneralProblem(response)) {
        showToastApiError(response as GeneralApiProblem)
      } else{
        const result = (response as ResultClass<Array<Address>>).result
        setAdreess([...result])
        setLoading(false)
      }
      setLoading(false)
  }

 
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
        load()
    });

    navigation.addListener('beforeRemove', (_) => {
        load()
    })

    return unsubscribe;
  }, [navigation]);

  
  return (
    <Screen
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
    >

      <ListView<Address>
        ItemSeparatorComponent={CustomDivider}
        contentContainerStyle={$listContentContainer}
        data={address}
        estimatedItemSize={177}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator />
          ):(
          <Center flex={1} height="full">
            {(
             <EmptyState
             preset="generic"
             imageSource={require("../../assets/images/noaddress.png")}
             style={$emptyState}
             headingTx={
               "addressScreen.empty"
             }
             contentTx={

               "addressScreen.message"

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
          </Center>)
        }
        ListHeaderComponent={
          <View style={$heading}>
            <VStack>
            
            </VStack>
          </View>
        }
        renderItem={({ item }) => (
            <AddressBlock
              key={JSON.stringify(item)}
              address={item}
            />
        )}
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
