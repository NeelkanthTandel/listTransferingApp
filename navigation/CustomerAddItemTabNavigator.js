import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SavedProducts from "../screens/customer/saved";
import Catagories from "../screens/customer/categories";
import PopulerProducts from "../screens/customer/populerProducts";
import colors from "../theme/colors";
import categoryProducts from "../screens/customer/categoryProducts";

const Stack = createNativeStackNavigator();

const categoryStack = () => {
   return (
      <Stack.Navigator screenOptions={{headerShown: false}} >
         <Stack.Screen name="categories" component={Catagories} />
         <Stack.Screen name="categoryProducts" component={categoryProducts} />
      </Stack.Navigator>
   )
}

const Tab = createMaterialTopTabNavigator();

const CustomerAddItemTabNavigator = () => {
   return (
      <Tab.Navigator
         screenOptions={{
            tabBarLabelStyle: { fontSize: 12 },
            tabBarStyle: { backgroundColor: colors.primary },
         }}
      >
         <Tab.Screen name="Populer" component={PopulerProducts} />
         <Tab.Screen name="categoryStack" component={categoryStack} options={{title:"Category"}} />
         <Tab.Screen name="Saved" component={SavedProducts} />
      </Tab.Navigator>
   );
};

export default CustomerAddItemTabNavigator;
