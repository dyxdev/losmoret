import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  TextStyle,
  ViewStyle,
  Image,
  ImageStyle,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  SafeAreaView
} from "react-native"
import { Button, Icon, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { $full, $fullBg, } from "../theme/styles"
import { CommonResult } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { useToastCustom } from "app/components/AlertToast"
import { ScrollView } from "react-native-gesture-handler"

const store = require("../../assets/images/fondo.png")
interface RegisterScreenProps extends AppStackScreenProps<"Register"> { }

export const RegisterScreen: FC<RegisterScreenProps> = observer(function RegisterScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isAuthRepeetPasswordHidden, setIsAuthRepeetPasswordHidden] = useState(true)
  const [loading, setLoading] = useState(false)
  const { navigation } = _props
  const [viewValidation, setViewValidation] = useState(false)

  function onRegister() {
    navigation.navigate("GotoMessage")
  }


  const {
    registerStore: {
      authEmail,
      setAuthEmail,
      authPassword,
      setAuthPassword,
      confirmPassword,
      setConfirmAuthPassword,
      name,
      lastname,
      setName,
      setLastName,
      validationError,
      validationName,
      validationLastName,
      validationErrorPassword,
      validationErrorConfirmPassword,
      userRegister,
      asValidationError

    },
  } = useStores()
  const { showToast } = useToastCustom()

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
      setName("")
      setLastName("")
      setConfirmAuthPassword("")
    }
  }, [])

  function register() {

    setViewValidation(true)

    if (asValidationError) return



    userRegister().then(
      (response: CommonResult | GeneralApiProblem) => {
        if (isGeneralProblem(response)) {
          showToast(
            {
              title: "Ocurrio un error",
              status: "error",
              description: (response as GeneralApiProblem).message ?? "Ocurrio un error al realizar el registro contacte con los administradores",
              variant: "solid"
            }
          )
        } else {
          const result = (response as CommonResult).result
          const error = (response as CommonResult).error
          if (error) {
            showToast(
              {
                title: "Atención",
                status: "warning",
                description: error.message,
                variant: "solid"
              }
            )
          } else if (result) {
            onRegister()
          }
        }
      }).finally(() => {
        setLoading(false)
      })


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

  const PasswordRepeetRightAccessory: ComponentType<TextFieldAccessoryProps> = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthRepeetPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            size={20}
            onPress={() => setIsAuthRepeetPasswordHidden(!isAuthRepeetPasswordHidden)}
          />
        )
      },
    [isAuthRepeetPasswordHidden],
  )

  return (
    <SafeAreaView
      // eslint-disable-next-line react-native/no-inline-styles
      style={{ ...$fullBg, padding: 40 }}
    >
      <KeyboardAvoidingView behavior={"height"} style={$full}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <Text
              testID="heading"
              tx="registerScreen.label"
              preset="heading"
              style={$register}
            />
            <View style={$scrollStyle}>

              <View style={$viewImageStyle}>
                <Image style={$image} source={store}></Image>
              </View>

              <TextField
                value={name}
                onChangeText={setName}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect={false}
                keyboardType="default"
                labelTx="registerScreen.nameFieldLabel"
                LabelTextProps={{
                  style: $register,
                }}
                placeholderTx="registerScreen.nameFieldLabel"
                helper={validationName && viewValidation ? validationName : undefined}
                status={validationName && viewValidation ? "error" : undefined}
              />

              <TextField
                value={lastname}
                onChangeText={setLastName}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="name-family"
                autoCorrect={false}
                keyboardType="default"
                labelTx="registerScreen.lastnameFieldLabel"
                LabelTextProps={{
                  style: $register,
                }}
                placeholderTx="registerScreen.lastnameFieldLabel"
                helper={validationLastName && viewValidation ?  validationLastName : undefined}
                status={validationLastName && viewValidation ? "error" : undefined}

              />

              <TextField
                value={authEmail}
                onChangeText={setAuthEmail}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                keyboardType="default"
                labelTx="loginScreen.emailFieldLabel"
                LabelTextProps={{
                  style: $register,
                }}
                placeholderTx="loginScreen.emailFieldPlaceholder"
                helper={validationError && viewValidation ?  validationError : undefined}
                status={validationError && viewValidation ? "error" : undefined}
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
                LabelTextProps={{
                  style: $register,
                }}
                placeholderTx="loginScreen.passwordFieldPlaceholder"
                RightAccessory={PasswordRightAccessory}
                helper={validationErrorPassword && viewValidation ? "error" : undefined}
              />

              <TextField
                value={confirmPassword}
                onChangeText={setConfirmAuthPassword}
                containerStyle={$textField}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                secureTextEntry={isAuthRepeetPasswordHidden}
                label="Repetir contraseña"
                LabelTextProps={{
                  style: $register,
                }}
                placeholderTx="registerScreen.passwordFieldLabel"
                RightAccessory={PasswordRepeetRightAccessory}
                helper={validationErrorConfirmPassword && viewValidation ? validationErrorConfirmPassword : undefined}
                status={validationErrorConfirmPassword && viewValidation ? "error" : undefined}
              />

              <Button
                testID="login-button"
                tx="registerScreen.confirm"
                style={$tapButton}
                preset="reversed"
                onPress={register}
                LeftAccessory={() => loading && <ActivityIndicator color="white" />}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})

const $register: TextStyle = {
  marginBottom: spacing.sm,
  color: "white",
}

const $textField: ViewStyle = {
  marginBottom: spacing.lg,
  width: "90%"
}

const $tapButton: ViewStyle = {
  marginTop: spacing.xs,
  backgroundColor: colors.palette.button,
  width: "90%",
  marginBottom: spacing.lg
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

const $scrollStyle: ViewStyle = {
  width: "100%",
  alignItems: "center",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  alignContent: "stretch",
}