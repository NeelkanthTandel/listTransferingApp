import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SavedProducts from "../screens/customer/savedProductsScreen";
import Catagories from "../screens/customer/categoriesScreen";
import PopulerProducts from "../screens/customer/populerProductsScreen";
import colors from "../theme/colors";
import categoryProducts from "../screens/customer/categoryProductsScreen";

const Stack = createNativeStackNavigator();

const categoryStack = (props) => {
   return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
         <Stack.Screen name="categories" component={Catagories} />
         <Stack.Screen
            name="categoryProducts"
            component={categoryProducts}
            initialParams={{
               currentList: props.route.params.currentList,
               drawerProps: props.route.params.drawerProps,
            }}
         />
      </Stack.Navigator>
   );
};

const Tab = createMaterialTopTabNavigator();

const CustomerAddItemTabNavigator = (props) => {
   console.log("list:", props.route.params.currentList);
   return (
      <Tab.Navigator
         screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: colors.primary },
         }}
      >
         <Tab.Screen
            name="Populer"
            component={PopulerProducts}
            initialParams={{
               currentList: props.route.params.currentList,
               drawerProps: props,
            }}
         />
         <Tab.Screen
            name="categoryStack"
            component={categoryStack}
            options={{ title: "Category" }}
            initialParams={{
               currentList: props.route.params.currentList,
               drawerProps: props,
            }}
         />
         <Tab.Screen
            name="Saved"
            component={SavedProducts}
            initialParams={{
               currentList: props.route.params.currentList,
               drawerProps: props,
            }}
         />
      </Tab.Navigator>
   );
};

export default CustomerAddItemTabNavigator;
