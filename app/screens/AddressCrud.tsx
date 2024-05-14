import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useState } from "react"
import {
    TextStyle,
    ViewStyle,
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
import { ResultClass } from "app/services/api"
import { GeneralApiProblem, isGeneralProblem } from "app/services/api/apiProblem"
import { useToastCustom } from "app/components/AlertToast"
import { ScrollView } from "react-native-gesture-handler"
import { StateSelect } from "app/components/StateSelect"
import { Address } from "app/services/api/account/types"
import { useBackHeader } from "app/hooks/customHeader"

interface AddressCrudScreenProps extends AppStackScreenProps<"AddressCrud"> { }

export const AddressCrudScreen: FC<AddressCrudScreenProps> = observer(function AddressCrudScreen(_props) {

    const [loading, setLoading] = useState(false)
    const { navigation, route } = _props
    const id = route.params?.id;
    const [viewValidation, setViewValidation] = useState(false)

    useBackHeader(navigation)

    const {
        addressStore: {

            name,
            street,
            street2,
            city,
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
            cleanStore,
            fetchAddress

        },
    } = useStores()
    const { showToast } = useToastCustom()

    useEffect(() => {
        fetchAddress(id)
        return () => {
            cleanStore()
        }
    }, [])

    function saveAddress() {

        setViewValidation(true)
        setLoading(true)

        if (asValidationError){
            setLoading(false)

            return}
        
        const savePromise = id ? updateAddreess(id) : saveAddreess()

        savePromise.then(
            (response: ResultClass<Address> | GeneralApiProblem) => {
                if (isGeneralProblem(response)) {
                    showToast(
                        {
                            title: "Ocurrio un error",
                            status: "error",
                            description: (response as GeneralApiProblem).message ?? "Ocurrio un error al agregar la dirección",
                            variant: "solid"
                        }
                    )
                } else {
                    cleanStore()
                    showToast(
                        {
                            title: "Guardado",
                            status: "success",
                            description: response?.result?.message ?? "",
                            variant: "solid"
                        }
                    )
                    navigation.navigate("Address")
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
                                keyboardType="phone-pad"
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
                                keyboardType="phone-pad"
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
                                text="Guardar"
                                style={$tapButton}
                                preset="reversed"
                                onPress={saveAddress}
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