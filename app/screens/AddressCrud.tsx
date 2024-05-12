import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
    TextStyle,
    ViewStyle,
    ImageStyle,
    View,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
    SafeAreaView
} from "react-native"
import { Button, Text, TextField } from "../components"
import { useStores } from "../store"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import { $full, $fullBg, } from "../theme/styles"
import { CommonResult } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { useToastCustom } from "app/components/AlertToast"
import { ScrollView } from "react-native-gesture-handler"
import { StateSelect } from "app/components/StateSelect"

interface AddressCrudScreenProps extends AppStackScreenProps<"AddressCrud"> { }

export const AddressCrudScreen: FC<AddressCrudScreenProps> = observer(function AddressCrudScreen(_props) {

    const [loading, setLoading] = useState(false)
    const { navigation, route } = _props
    const id = route.params?.id;
    const [viewValidation, setViewValidation] = useState(false)

    function onRegister() {
        navigation.navigate("GotoMessage")
    }


    const {
        addressStore: {

            name,
            street,
            street2,
            city,
            state_id,
            phone,
            mobile,
            setName,
            setStreet,
            setStreet2,
            setCity,
            setPhone,
            setMobile,
            validationName,
            validationStreet,
            validationMobile,
            validationPhone,
            saveAddreess,
            updateAddreess,
            validationCity,
            asValidationError,
            cleanStore

        },
    } = useStores()
    const { showToast } = useToastCustom()

    useEffect(() => {
        return () => {
            cleanStore()
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

    const MobileLeftAccessory = useMemo(
        () =>
            function MobileLeftAccessory() {
                return (
                    // eslint-disable-next-line react-native/no-inline-styles
                    <View style={{ alignItems: "center", width: 50, marginTop: 6 }}>
                        <Text
                            text="+53"
                            preset="formHelper"
                            style={$help}
                        />
                    </View>

                )
            },
        [],
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
                            tx="addressScreen.label"
                            preset="heading"
                            style={$register}
                        />
                        <View style={$scrollStyle}>

                            <TextField
                                value={name}
                                onChangeText={setName}
                                containerStyle={$textField}
                                autoCapitalize="none"
                                autoComplete="name"
                                autoCorrect={false}
                                keyboardType="default"
                                labelTx="addressScreen.nameFieldLabel"
                                LabelTextProps={{
                                    style: $register,
                                }}
                                placeholderTx="addressScreen.nameFieldLabel"
                                helper={validationName && viewValidation ? validationName : undefined}
                                status={validationName && viewValidation ? "error" : undefined}
                            />

                            <TextField
                                value={street}
                                onChangeText={setStreet}
                                containerStyle={$textField}
                                autoCapitalize="none"
                                autoComplete="address-line1"
                                autoCorrect={false}
                                keyboardType="default"
                                labelTx="addressScreen.streetFieldLabel"
                                LabelTextProps={{
                                    style: $register,
                                }}
                                placeholderTx="addressScreen.streetFieldLabel"
                                helper={validationStreet && viewValidation ? validationStreet : undefined}
                                status={validationStreet && viewValidation ? "error" : undefined}

                            />

                            <TextField
                                value={street2}
                                onChangeText={setStreet2}
                                containerStyle={$textField}
                                autoCapitalize="none"
                                autoComplete="address-line2"
                                autoCorrect={false}
                                keyboardType="default"
                                labelTx="addressScreen.street2FieldLabel"
                                LabelTextProps={{
                                    style: $register,
                                }}
                                placeholderTx="addressScreen.street2FieldLabel"

                            />

                            <TextField
                                value={city}
                                onChangeText={setCity}
                                containerStyle={$textField}
                                autoCapitalize="none"
                                autoComplete="country"
                                autoCorrect={false}
                                labelTx="addressScreen.city"
                                LabelTextProps={{
                                    style: $register,
                                }}
                                placeholderTx="addressScreen.city"
                                helper={validationCity && viewValidation ? "error" : undefined}
                            />

                            <TextField
                                value={phone}
                                onChangeText={setPhone}
                                containerStyle={$textField}
                                autoCapitalize="none"
                                keyboardType="name-phone-pad"
                                autoCorrect={false}
                                labelTx="addressScreen.phone"
                                LabelTextProps={{
                                    style: $register,
                                }}
                                placeholderTx="addressScreen.phone"
                                LeftAccessory={MobileLeftAccessory}
                                helper={validationPhone && viewValidation ? validationPhone : undefined}
                                status={validationPhone && viewValidation ? "error" : undefined}
                            />

                            <TextField
                                value={mobile}
                                onChangeText={setMobile}
                                containerStyle={$textField}
                                autoCapitalize="none"
                                autoCorrect={false}
                                label="Telefono secundario"
                                keyboardType="name-phone-pad"
                                LabelTextProps={{
                                    style: $register,
                                }}
                                placeholder="Telefono secundario"
                                LeftAccessory={MobileLeftAccessory}
                                helper={validationMobile && viewValidation ? validationMobile : undefined}
                                status={validationMobile && viewValidation ? "error" : undefined}
                            />

                           
                            <View style={{...$full,...{width:"100%",marginBottom:20, alignItems:"flex-start",marginLeft:20}}}>

                                <Text
                                    tx="addressScreen.state"
                                    preset="formLabel"
                                    style={{...$register}}
                                />
                                <StateSelect />
                            </View>

                            <Button
                                testID="login-button"
                                tx={id ? "addressScreen.update" : "addressScreen.update"}
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

const $help: TextStyle = {
    marginBottom: spacing.sm,
    color: "black",
    textAlign: "center"
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

const $scrollStyle: ViewStyle = {
    width: "100%",
    alignItems: "center",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "stretch",
}