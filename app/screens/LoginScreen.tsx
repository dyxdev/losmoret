import { observer } from "mobx-react-lite"
import React, { ComponentType, FC, useEffect, useMemo, useRef, useState } from "react"
import {
  TextInput,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  TextStyle,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Platform
} from "react-native"
import { Button, Icon, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors } from "../theme"
import {
  $signIn,
  $tapButton,
  $textField,
  contentCenter,
  $fullImage,
  $fullBg,
  $enterDetails,
  $tapButtonTxt,
  $topMargin,
  $centerText,
  $full
} from "../theme/styles"
import type { LoginResponse } from "app/services/api/account/types"
import { isGeneralProblem, type GeneralApiProblem } from "app/services/api/apiProblem"
import { useToastCustom } from "app/components/AlertToast"
import { setAuthTokenSession } from "app/services/api/account/service"

const store = require("../../assets/images/login.png")
interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>(null)
  const emailInput = useRef<TextInput>(null)
  const { navigation } = _props

  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const {
    authenticationStore: {
      authEmail,
      setAuthEmail,
      setAuthToken,
      validationError,
      validationErrorPassword,
      authPassword,
      setAuthPassword,
      userLogin,
      setUserInfo,
    },
  } = useStores()

  const { showToast } = useToastCustom()

  useEffect(() => {
  
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const [error, setError] = useState(isSubmitted ? validationError : null)
  const [errorPassword, setErrorPassword] = useState(isSubmitted ? validationErrorPassword : null)
  const [loading,setLoading] = useState(false)

  async function login() {
    setIsSubmitted(true)
    setAttemptsCount(attemptsCount + 1)

    if (validationError || validationErrorPassword) {
      setError(validationError)
      setErrorPassword("Revise los valores del campo")
      return
    }
   setLoading(true)
   userLogin().then(
      (response: LoginResponse | GeneralApiProblem) =>{
        if (isGeneralProblem(response)) {
          showToast(
            {
              title:"Creedenciales incorrectas",
              status: "error",
              description:"Las creedenciales no son correctas. Revise los valores del campo correo y del campo contraseña",
              variant:"solid"
            }
          )
        } else{
          const result = (response as LoginResponse).result
          console.log("result:",result.access_token)
          
          setAuthTokenSession(result.access_token).then(()=>{
            setAuthToken(result.access_token)
          })
          setUserInfo(result)
        }
    }).finally(()=>{
      setLoading(false)
    })

    
  }

  function onRegister() {
    navigation.navigate("Register")
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
      <KeyboardAvoidingView 
       behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
       style={$full}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground source={store} resizeMode="contain" style={$fullImage}>
        <View style={contentCenter}>
          <View>
            <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
            <Text tx="loginScreen.details" preset="heading" style={$enterDetails} />
          </View>
          <View style={$topMargin}>
            <TextField
              ref={emailInput}
              value={authEmail}
              onChangeText={setAuthEmail}
              containerStyle={$textField}
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              LabelTextProps={{
                style: $signIn,
              }}
              labelTx="loginScreen.emailFieldLabel"
              placeholderTx="loginScreen.emailFieldPlaceholder"
              helper={error}
              status={error ? "error" : undefined}
            />

            <TextField
              ref={authPasswordInput}
              value={authPassword}
              onChangeText={setAuthPassword}
              containerStyle={$textField}
              LabelTextProps={{
                style: $signIn,
              }}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry={isAuthPasswordHidden}
              labelTx="loginScreen.passwordFieldLabel"
              placeholderTx="loginScreen.passwordFieldPlaceholder"
              onSubmitEditing={login}
              RightAccessory={PasswordRightAccessory}
              helper={errorPassword}
              status={errorPassword ? "error" : undefined}
            />

            <Button
              testID="login-button"
              tx="loginScreen.tapToSignIn"
              style={$tapButton}
              onPress={login}
              textStyle={$tapButtonTxt}
              LeftAccessory={()=>loading && <ActivityIndicator color="white"/>}
              
            />
            <TouchableOpacity activeOpacity={0.8} onPress={onRegister}>
              <Text
                tx="loginScreen.register"
                preset="formHelper"
                style={$centerText as TextStyle}
              ></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
})
