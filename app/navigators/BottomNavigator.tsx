import React from "react"
import { DrawerNavigationOptions, createDrawerNavigator } from '@react-navigation/drawer';
import {
  HomeCategorieScreen,
  OrdersScreen,
  UserScreen
} from "app/screens"
import { colors } from "app/theme";
import { CustomDrawerContent } from "app/components/Drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

//@ts-ignore
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';





const Tab = createBottomTabNavigator()


export const BottomNavigator = () => {

 
  return (
      <Tab.Navigator
      initialRouteName="Home"
      >
       <Tab.Screen
        name="Home"
        component={HomeCategorieScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="feed" color={color} size={size} />
          ),
        }}
      />

<Tab.Screen
        name="User"
        component={HomeCategorieScreen}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="user" color={color} size={size} />
          ),
        }}
      />

    
      </Tab.Navigator>
  )
}
