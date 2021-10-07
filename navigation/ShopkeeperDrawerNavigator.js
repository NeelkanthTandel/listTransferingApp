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
import homeScreen from "../screens/shopkeeper/homeScreen";
import historyScreen from "../screens/shopkeeper/historyScreen";
import qrGeneratorScreen from "../screens/shopkeeper/qrGeneratorScreen";
import customerListScreen from "../screens/shopkeeper/customerListScreen";

const Stack = createNativeStackNavigator();

const shopkeeperNavigator = () => {
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
         <Stack.Screen name="home" component={homeScreen} />
         <Stack.Screen name="customerList" component={customerListScreen} />
      </Stack.Navigator>
   );
};

const Drawer = createDrawerNavigator();

export default function ShopkeeperDrawerNavigator(Props) {
   let toggleDrawer;
   console.log(Props);
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
                        Shop Name: {Props.route.params.shopName}
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
            component={shopkeeperNavigator}
            options={{
               drawerLabel: "Home",
               swipeEnabled: true,
               headerShown: false,
            }}
         />
         <Drawer.Screen
            name="History"
            component={historyScreen}
            options={{ swipeEnabled: true }}
         />
         <Drawer.Screen
            name="Generate QR"
            component={qrGeneratorScreen}
            options={{ swipeEnabled: true }}
            initialParams={{
               id: Props.route.params.shop_id,
            }}
         />
      </Drawer.Navigator>
   );
}
