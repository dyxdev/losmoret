/* eslint-disable no-useless-return */
import { observer } from "mobx-react-lite"
import React, { FC, useEffect } from "react"
import {
  TextStyle,
  ViewStyle,
  Image,
  ImageStyle,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native"
import { Button, Icon, Screen, Text } from "../components"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { $full } from "../theme/styles"
import { openInbox } from "react-native-email-link";

const store = require("../../assets/images/fondo.png")
interface GotoMessageScreenProps extends AppStackScreenProps<"GotoMessage"> { }

export const GotoMessageScreen: FC<GotoMessageScreenProps> = observer(function GotoMessageScreen(_props) {
  
 
  const { navigation } = _props 
  let touchbutton = false
  const {
    registerStore: {
      resultMessage,
    },
  } = useStores()


  function onLogin() {
    touchbutton = true
    navigation.navigate("Login")
    touchbutton = true
  }

  function onEmail() {
    openInbox({
      message: "Abrir aplicación de correos",
      cancelLabel: "Ir atras",
    });
  }
  
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
        if(touchbutton){
          return;
        }
        e.preventDefault()
    })
    
    return unsubscribe;
  }, [navigation,touchbutton]);
 
 
  return (
    <Screen
      backgroundColor={colors.palette.bgImage}
      preset="scroll"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom", "left", "right"]}
    >
      <KeyboardAvoidingView behavior={"position"} style={$full}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={$view}>
            <View style={$viewImageStyle}>
              <Image style={$image} source={store}></Image>
            </View>
            <Text
              testID="goto-heading"
              tx="MessagesScreen.label"
              preset="heading"
              style={$register}
            />
            <Text
              testID="goto-heading"
              tx="MessagesScreen.confirm"
              preset="formHelper"
              style={$registersub}
            />

          
            <Button
              testID="login-button"
              tx="MessagesScreen.login"
              style={$tapButton}
              preset="reversed"
              onPress={onLogin}
              LeftAccessory={()=> <Icon style={$icon} icon="community" color="white"></Icon>}
            />
            <Button
              tx="MessagesScreen.email"
              style={$tapButton}
              preset="reversed"
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onPress={()=>onEmail()}
              LeftAccessory={()=> <Icon style={$icon} icon="mail" color="white"></Icon>}
            
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
}

const $view: ViewStyle = {
  flex:1,
  paddingVertical: spacing.xxl,
  paddingHorizontal: spacing.lg,
  flexDirection: "column",
  alignItems: "center"
}

const $register: TextStyle = {
  marginBottom: spacing.sm,
  color: "white",
  flexShrink: 1 
}

const $registersub: TextStyle = {
  marginBottom: spacing.sm,
  color: "white",
  lineHeight: 30,
  letterSpacing: 1,
  alignSelf:"center",
  textAlign:"justify",
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.primary,
  flex: 1,
  width: 200,
  padding: 2
}

const $image: ImageStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
  resizeMode: "stretch",
}

const $viewImageStyle: ViewStyle = {
  marginTop: spacing.lg,
  width: 150,
  height: 150,
  alignSelf: "center",
}

const $icon: ImageStyle = {
  marginRight: spacing.sm, 
}
