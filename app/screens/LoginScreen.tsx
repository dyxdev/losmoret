import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import { TextInput, View, ImageBackground, SafeAreaView } from "react-native"
import { Button, Icon,Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import { $signIn, $tapButton, $textField, contentCenter,$fullImage, $fullBg } from "../theme/styles"


const store = require("../../assets/images/login.png")
interface LoginScreenProps extends AppStackScreenProps<"Login"> { }

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {

  const authPasswordInput = useRef<TextInput>(null)

  const [authPassword, setAuthPassword] = useState("")
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: { authEmail, setAuthEmail, setAuthToken, validationError },
  } = useStores()

  useEffect(() => {

    setAuthEmail("admin@codes.store")
    setAuthPassword("Odoo")

    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const error = isSubmitted ? validationError : ""

  function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError) return

    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")

    setAuthToken(String(Date.now()))
  }

  const PasswordRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  return (
    <SafeAreaView style={$fullBg}>
      <ImageBackground source={store} resizeMode="contain" style={$fullImage}>

        <View style={contentCenter}>
          <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
          <View>
            <TextField
              value={authEmail}
              onChangeText={setAuthEmail}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              keyboardType="email-address"
              labelTx="loginScreen.emailFieldLabel"
              placeholderTx="loginScreen.emailFieldPlaceholder"
              helper={error}
              status={error ? "error" : undefined}
              onSubmitEditing={() => authPasswordInput.current?.focus()}
            />

            <TextField
              ref={authPasswordInput}
              value={authPassword}
              onChangeText={setAuthPassword}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              onSubmitEditing={login}
              RightAccessory={PasswordRightAccessory}
            />

            <Button
              testID="login-button"
              tx="loginScreen.tapToSignIn"
              style={$tapButton}
              preset="reversed"
              onPress={login}
            />
          </View>


        </View>

      </ImageBackground>
    </SafeAreaView>
  )
})

