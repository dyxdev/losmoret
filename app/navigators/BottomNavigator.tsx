import React from "react"
import {
  HomeCategorieScreen,
  OrdersScreen,
  PayScreen,
} from "app/screens"

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Text } from "native-base";
import { colors } from "app/theme";





const Tab = createBottomTabNavigator()
const orderTab = (
  <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: ({ children, color, focused }) => (
            <Text style={
              {
                color: focused ? colors.palette.primary : color
              }
            }>Mis órdenes</Text>
          ),
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="book-check" color={focused ? colors.palette.primary : color} size={size} />
          ),
        }}
      />
)

export const BottomNavigator = () => {


  return (
    <Tab.Navigator
      detachInactiveScreens={true}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={HomeCategorieScreen}
        options={{
          tabBarLabel: ({ children, color, focused }) => (
            <Text style={
              {
                color: focused ? colors.palette.bgImg : color
              }
            }>Catergorías</Text>
          ),

          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="home" color={focused ? colors.palette.bgImg : color} size={size} />
          ),
        }}
      />

       {orderTab}

      

    </Tab.Navigator>
  )
}
