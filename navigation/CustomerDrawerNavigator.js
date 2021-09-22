import * as React from "react";
import { Button, View, Text, TouchableOpacity } from "react-native";
import {
   createDrawerNavigator,
   DrawerContentScrollView,
   DrawerItem,
   DrawerItemList,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../theme/colors";
import productListScreen from "../screens/customer/productListScreen";
import historyScreen from "../screens/customer/historyScreen";
import scannerScreen from "../screens/customer/scannerScreen";
import homeScreen from "../screens/customer/homeScreen";
import populerProducts from "../screens/customer/populerProducts";
import AddItemModal from "../components/addItemModal";
import CustomerAddItemTabNavigator from "./CustomerAddItemTabNavigator";

const Stack = createNativeStackNavigator();

const customerNavigator = (props) => {
   return (
      <Stack.Navigator
         screenOptions={{
            headerTintColor: Colors.headerTitle,

            headerStyle: {
               backgroundColor: Colors.headerBgColor,
            },
            animation: "slide_from_right",
         }}
      >
         <Stack.Screen
            name="home"
            component={homeScreen}
            initialParams={{ token: props.route.params.token }}
         />
         <Stack.Screen
            name="popular"
            component={populerProducts}
            initialParams={{}}
         />
         <Stack.Screen
            name="productList"
            component={productListScreen}
            initialParams={{}}
         />
         <Stack.Screen
            name="addProducts"
            component={CustomerAddItemTabNavigator}
         />
         <Stack.Screen name="scanner" component={scannerScreen} />
      </Stack.Navigator>
   );
};

const Drawer = createDrawerNavigator();

export default function CustomerDrawerNavigator(Props) {
   let toggleDrawer;

   return (
      <Drawer.Navigator
         screenOptions={{
            swipeEnabled: false,
            drawerActiveTintColor: Colors.textPrimary,
            drawerActiveBackgroundColor: Colors.primary,
            drawerInactiveTintColor: Colors.secondary,
            drawerStyle: {
               backgroundColor: Colors.backgroundColor,
            },
            overlayColor: Colors.selected,
            headerTintColor: Colors.headerTitle,

            headerStyle: {
               backgroundColor: Colors.headerBgColor,
            },
            headerLeft: () => (
               <TouchableOpacity onPress={() => toggleDrawer()}>
                  <Ionicons
                     name="ios-menu"
                     size={25}
                     color={Colors.headerTitle}
                     style={{ marginLeft: 15 }}
                  />
               </TouchableOpacity>
            ),
         }}
         drawerContent={(props) => {
            toggleDrawer = props.navigation.toggleDrawer;
            return (
               <DrawerContentScrollView {...props}>
                  <View
                     style={{
                        backgroundColor: Colors.headerBgColor,
                        marginTop: -4,
                        paddingVertical: 30,
                        paddingLeft: 15,
                        marginBottom: 10,
                     }}
                  >
                     <Text
                        style={{
                           color: Colors.headerTitle,
                           fontSize: 23,
                           lineHeight: 23,
                           fontWeight: "bold",
                        }}
                     >
                        {Props.route.params.name}
                     </Text>
                     <Text
                        style={{ color: Colors.headerTitle, lineHeight: 20 }}
                     >
                        {Props.route.params.email}
                     </Text>
                  </View>
                  <DrawerItemList {...props} />
                  <DrawerItem
                     label="Log Out"
                     onPress={async () => {
                        await AsyncStorage.removeItem("token");
                        Props.navigation.dispatch(
                           StackActions.replace("login")
                        );
                     }}
                  />
               </DrawerContentScrollView>
            );
         }}
      >
         <Drawer.Screen
            name="stacks"
            component={customerNavigator}
            options={{
               drawerLabel: "Home",
               swipeEnabled: true,
               headerShown: false,
            }}
            initialParams={{
               token: Props.route.params.token,
            }}
         />
         <Drawer.Screen
            name="history"
            component={historyScreen}
            options={{
               // drawerLabel: "History",
               title: "History",
               swipeEnabled: true,
            }}
         />
      </Drawer.Navigator>
   );
}
