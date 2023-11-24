import React from "react"
import { createDrawerNavigator } from '@react-navigation/native';
import {
  WelcomeScreen
} from "app/screens"

export type CategoryNavigatorParamList = {
  Demo: undefined
}

const Drawer = createDrawerNavigator()

const HomeScreen = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">

export const CategoryNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>
  )
}
