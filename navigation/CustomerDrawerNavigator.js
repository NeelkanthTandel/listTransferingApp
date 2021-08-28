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

import Colors from "../theme/colors";
// import homeScreen from "../screens/customer/homeScreen";
import productListScreen from "../screens/customer/productListScreen";
// import addProductsScreen from "../screens/customer/addProductsScreen";
// import scannerScreen from "../screens/customer/scannerScreen";

const Stack = createNativeStackNavigator();

const customerNavigator = () => {
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
         {/* <Stack.Screen name="home" component={homeScreen} /> */}
         <Stack.Screen
            name="productList"
            component={productListScreen}
            initialParams={{}}
         />
         {/* <Stack.Screen name="addProducts" component={addProductsScreen} /> */}
         {/* <Stack.Screen name="scanner" component={scannerScreen} /> */}
      </Stack.Navigator>
   );
};

const Drawer = createDrawerNavigator();

export default function CustomerDrawerNavigator(Props) {
   return (
      <Drawer.Navigator
         screenOptions={{
            headerShown: false,
            swipeEnabled: false,
            drawerActiveTintColor: Colors.textPrimary,
            drawerActiveBackgroundColor: Colors.primary,
            drawerInactiveTintColor: Colors.secondary,
            drawerStyle: {
               backgroundColor: Colors.backgroundColor,
            },
            overlayColor: Colors.selected,
         }}
         drawerContent={(props) => (
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
                     Username
                  </Text>
                  <Text style={{ color: Colors.headerTitle, lineHeight: 20 }}>
                     username@gmail.com
                  </Text>
               </View>
               <DrawerItemList {...props} />
               <DrawerItem
                  label="Log Out"
                  onPress={() =>
                     Props.navigation.dispatch(StackActions.replace("login"))
                  }
               />
            </DrawerContentScrollView>
         )}
      >
         <Drawer.Screen
            name="stacks"
            component={customerNavigator}
            options={{
               drawerLabel: "Home",
               swipeEnabled: true,
            }}
         />
      </Drawer.Navigator>
   );
}
