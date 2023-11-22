import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Image, ImageStyle,View, ViewStyle } from "react-native"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { useHeader } from "../utils/useHeader"

const welcomeLogo = require("../../assets/images/store-removebg-preview.png")


interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(_props) {
  const { navigation } = _props
  const {
    authenticationStore: { logout },
  } = useStores()

  //  funtion para navegar
  function goNext() {
    navigation.navigate("Login")
  }

  useHeader(
    {
      rightTx: "common.logOut",
      onRightPress: logout,
      backgroundColor: colors.palette.secondary,
      
    },
    [logout],
  )

  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,
}


const $welcomeLogo: ImageStyle = {
  height: 300,
  width: "100%",
  marginBottom: spacing.xxl,
}

