import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomerAddItemTabNavigator from "./navigation/CustomerAddItemTabNavigator";
import MainNavigator from "./navigation/MainNavigator";

export default function App() {
   return <MainNavigator />;
   // return <CustomerAddItemTabNavigator />;
}
