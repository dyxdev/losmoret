/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  NavigationContainer
} from "@react-navigation/native"
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack"
import { observer } from "mobx-react-lite"
import React from "react"
import * as Screens from "app/screens"
import Config from "../config"
import { useStores } from "../store"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { colors } from "app/theme"
import {BottomNavigator} from "./BottomNavigator"
import { ProductSnapshotOut } from "app/models/Product"
import { NativeBaseProvider } from "native-base"
import { Order } from "app/services/api/orders/types"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  Register: undefined
  HomeCategorie: undefined
  Orders: undefined
  User: undefined
  Products: undefined
  ProductDetail: { 
    product: ProductSnapshotOut
    categoryName: string
  }
  Cart:undefined
  Pay:undefined
  PayWeb:undefined
  OrderDetail: {
    order: Order
  }
  Address: undefined
  GotoMessage: undefined
  AddressCrud:{
    id:number|string|null
  }
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  return (
    <NativeBaseProvider>
    <Stack.Navigator
      screenOptions={{ headerShown: false, navigationBarColor: colors.background }}
      initialRouteName={isAuthenticated ? "HomeCategorie" : "Login"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="HomeCategorie" component={BottomNavigator} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={Screens.LoginScreen} />
          <Stack.Screen name="Register" component={Screens.RegisterScreen} />
        </>
      )}

      {/** 🔥 Your screens go here */}
     
			<Stack.Screen name="Orders" component={Screens.OrdersScreen} />
      <Stack.Screen name="OrderDetail" component={Screens.OrderDetailScreen} />
			<Stack.Screen name="User" component={Screens.UserScreen} />
      <Stack.Screen name="Products" component={Screens.ProductsScreen} />
      <Stack.Screen name="ProductDetail" component={Screens.ProductDetailScreen} />
      <Stack.Screen name="Cart" component={Screens.CartScreen} />
      <Stack.Screen name="Pay" component={Screens.PayScreen} />
      <Stack.Screen name="PayWeb" component={Screens.PayWebScreen} />
      <Stack.Screen name="Address" component={Screens.AddressScreen} />
      <Stack.Screen name="AddressCrud" component={Screens.AddressCrudScreen} />
      <Stack.Screen name="GotoMessage" component={Screens.GotoMessageScreen} />
			{/* IGNITE_GENERATOR_ANCHOR_APP_STACK_SCREENS */}
    </Stack.Navigator>
    </NativeBaseProvider>
  )
})

export interface NavigationProps
  extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
 
  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
