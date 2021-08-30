import React from "react";
import { StyleSheet } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import scannerScreen from "../screens/customer/scannerScreen";
import historyScreen from "../screens/customer/historyScreen";

const Tab = createMaterialTopTabNavigator();

const CustomerAddItemTabNavigator = () => {
   return (
      <Tab.Navigator>
         <Tab.Screen name="Home" component={scannerScreen} />
         <Tab.Screen name="History" component={historyScreen} />
      </Tab.Navigator>
   );
};

export default CustomerAddItemTabNavigator;
