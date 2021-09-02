import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import scannerScreen from "../screens/customer/scannerScreen";
import historyScreen from "../screens/customer/historyScreen";

import SavedProducts from "../screens/customer/saved";
import Catagories from "../screens/customer/categories";
import PopulerProducts from "../screens/customer/populerProducts";
import colors from "../theme/colors";

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
         <Tab.Screen name="Catagories" component={Catagories} />
         <Tab.Screen name="Saved" component={SavedProducts} />
      </Tab.Navigator>
   );
};

export default CustomerAddItemTabNavigator;
