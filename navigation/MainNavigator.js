import React, { useEffect, useState } from "react";
import { StatusBar, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../theme/colors";
import loginScreen from "../screens/loginScreen";
import chooseTypeScreen from "../screens/chooseTypeScreen";
import CustomerDrawerNavigator from "./CustomerDrawerNavigator";
import ShopkeeperDrawerNavigator from "./ShopkeeperDrawerNavigator";
import { API_URL } from "../keys";
import loadingScreen from "../screens/loading";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
   const [screen, setScreen] = useState("");
   const [isCheck, setIsCheck] = useState(false);
   // let initialParams = {};
   const [initialParams, setInitialParams] = useState({});

   const isSignedIn = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
         console.log("No Token");
         setScreen("login");
         return setIsCheck(true);
      }
      console.log("Token: ", token);
      try {
         const response = await fetch(`${API_URL}/`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + token,
            },
         });
         const data = await response.json();
         console.log("data:", data);
         if (!data.error) {
            if (data.isShopkeeper) {
               setScreen("shopkeeper");
               setInitialParams({
                  email: data.user.email,
                  name: data.user.name,
                  shopName: data.user.shop_name,
                  token,
                  shop_id: data.user._id,
               });
            } else {
               console.log("customer");
               setScreen("customer");
               setInitialParams({
                  email: data.email,
                  name: data.name,
                  token,
               });
               console.log(initialParams);
            }
         } else {
            setScreen("login");
         }
         setIsCheck(true);
      } catch (err) {
         console.log("check is signed In error: ", err);
      }
   };

   useEffect(() => {
      console.log("Running");
      isSignedIn();
   }, []);

   return (
      <>
         <StatusBar
            backgroundColor={Colors.headerBgColor}
            barStyle="light-content"
         />
         {isCheck ? (
            <NavigationContainer>
               <Stack.Navigator
                  screenOptions={{
                     headerShown: false,
                     animation: "simple_push",
                  }}
               >
                  {console.log(screen)}
                  {/* <Stack.Screen name="stak" component={StackDecider} /> */}

                  {screen === "loading" ? (
                     <>
                        {console.log("loading stack")}
                        <Stack.Screen name="login" component={loginScreen} />
                        <Stack.Screen
                           name="loading"
                           component={loadingScreen}
                        />
                        <Stack.Screen
                           name="chooseType"
                           component={chooseTypeScreen}
                        />
                        <Stack.Screen
                           name="shopkeeperDrawer"
                           component={ShopkeeperDrawerNavigator}
                           initialParams={initialParams}
                        />
                        <Stack.Screen
                           name="customerDrawer"
                           component={CustomerDrawerNavigator}
                           initialParams={initialParams}
                        />
                     </>
                  ) : screen === "login" ? (
                     <>
                        {console.log("login stack")}
                        <Stack.Screen name="login" component={loginScreen} />
                        <Stack.Screen
                           name="loading"
                           component={loadingScreen}
                        />
                        <Stack.Screen
                           name="chooseType"
                           component={chooseTypeScreen}
                        />
                        <Stack.Screen
                           name="shopkeeperDrawer"
                           component={ShopkeeperDrawerNavigator}
                           initialParams={initialParams}
                        />
                        <Stack.Screen
                           name="customerDrawer"
                           component={CustomerDrawerNavigator}
                           initialParams={initialParams}
                        />
                     </>
                  ) : screen === "customer" ? (
                     <>
                        {console.log("customer stack: ", initialParams)}
                        <Stack.Screen
                           name="customerDrawer"
                           component={CustomerDrawerNavigator}
                           initialParams={initialParams}
                        />
                        <Stack.Screen name="login" component={loginScreen} />
                        <Stack.Screen
                           name="loading"
                           component={loadingScreen}
                        />
                        <Stack.Screen
                           name="chooseType"
                           component={chooseTypeScreen}
                        />
                        <Stack.Screen
                           name="shopkeeperDrawer"
                           component={ShopkeeperDrawerNavigator}
                           initialParams={initialParams}
                        />
                     </>
                  ) : screen === "shopkeeper" ? (
                     <>
                        {console.log("shopkeeper stack")}
                        <Stack.Screen
                           name="shopkeeperDrawer"
                           component={ShopkeeperDrawerNavigator}
                           initialParams={initialParams}
                        />
                        <Stack.Screen
                           name="customerDrawer"
                           component={CustomerDrawerNavigator}
                           initialParams={initialParams}
                        />
                        <Stack.Screen name="login" component={loginScreen} />
                        <Stack.Screen
                           name="loading"
                           component={loadingScreen}
                        />
                        <Stack.Screen
                           name="chooseType"
                           component={chooseTypeScreen}
                        />
                     </>
                  ) : null}
               </Stack.Navigator>
            </NavigationContainer>
         ) : (
            <View
               style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Text>Loading...</Text>
            </View>
         )}
      </>
   );
};

export default MainNavigator;
