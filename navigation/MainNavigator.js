import React, { Component } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShopkeeperDrawerNavigator from "./ShopkeeperDrawerNavigator";

import Colors from "../theme/colors";
import loginScreen from "../screens/loginScreen";
import chooseTypeScreen from "../screens/chooseTypeScreen";

const Stack = createNativeStackNavigator();

class MainNavigator extends Component {
   render() {
      return (
         <>
            <StatusBar
               backgroundColor={Colors.headerBgColor}
               barStyle="light-content"
            />
            <NavigationContainer>
               <Stack.Navigator
                  screenOptions={{
                     headerShown: false,
                     animation: "slide_from_right",
                  }}
               >
                  <Stack.Screen name="loginScreen" component={loginScreen} />
                  <Stack.Screen
                     name="chooseType"
                     component={chooseTypeScreen}
                  />
                  <Stack.Screen
                     name="shopkeeperDrawer"
                     component={ShopkeeperDrawerNavigator}
                  />
               </Stack.Navigator>
            </NavigationContainer>
         </>
      );
   }
}

export default MainNavigator;
