import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
   KeyboardAvoidingView,
   ScrollView,
   Alert,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../keys";
import Colors from "../theme/colors";

const ChooseTypeScreen = (props) => {
   const [isShopkeeper, setIsShopkeeper] = useState(false);
   const [shopName, setShopName] = useState("");

   const finishHandler = async () => {
      if (!isShopkeeper) {
         try {
            const response = await fetch(`${API_URL}/customerSignUp`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify({
                  email: props.route.params.email,
                  name: props.route.params.name,
               }),
            });
            const data = await response.json();
            console.log("user data:", data);
            if (data.token) {
               AsyncStorage.setItem("token", data.token);
               props.navigation.dispatch(
                  StackActions.replace("customerDrawer", {
                     email: props.route.params.email,
                     name: props.route.params.name,
                  })
               );
            }
         } catch (err) {
            console.log("customer signup error", err);
         }
      } else {
         if (isShopkeeper && shopName) {
            try {
               const response = await fetch(`${API_URL}/shopkeeperSignUp`, {
                  method: "POST",
                  headers: {
                     "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                     email: props.route.params.email,
                     name: props.route.params.name,
                     shop_name: shopName,
                  }),
               });
               const data = await response.json();
               console.log("user data:", data);
               if (data.token) {
                  AsyncStorage.setItem("token", data.token);
                  props.navigation.dispatch(
                     StackActions.replace("shopkeeperDrawer", {
                        shopName,
                        email: props.route.params.email,
                        name: props.route.params.name,
                     })
                  );
               }
            } catch (err) {
               console.log("shopkeeper signup error", err);
            }
         } else if (!shopName && isShopkeeper) {
            Alert.alert("Message", "Please enter shop name");
         }
      }
   };

   return (
      <KeyboardAvoidingView
         behavior="height"
         style={{ flex: 1, backgroundColor: Colors.backgroundColor }}
      >
         <View style={styles.screen}>
            <Text style={styles.Text}>Last Step</Text>
            <Text style={styles.TypeText}>Choose Account Type</Text>

            <View
               style={{
                  marginVertical: 30,
                  alignSelf: "center",
                  marginTop: 100,
               }}
            >
               <TouchableOpacity
                  style={{
                     ...styles.button,
                     backgroundColor: isShopkeeper
                        ? Colors.primary
                        : Colors.secondary,
                  }}
                  onPress={() => setIsShopkeeper(false)}
                  activeOpacity={0.9}
               >
                  <Text style={styles.ButtonText}>Customer</Text>
               </TouchableOpacity>
               <TouchableOpacity
                  style={{
                     ...styles.button,
                     backgroundColor: !isShopkeeper
                        ? Colors.primary
                        : Colors.secondary,
                  }}
                  onPress={() => setIsShopkeeper(true)}
                  activeOpacity={0.9}
               >
                  <Text style={styles.ButtonText}>Shopkeeper</Text>
               </TouchableOpacity>
            </View>
         </View>
         {isShopkeeper ? (
            <TextInput
               placeholder="Enter your shop name"
               onChangeText={(val) => setShopName(val)}
               style={styles.input}
            />
         ) : null}
         <TouchableOpacity
            style={styles.Finish}
            activeOpacity={0.6}
            onPress={finishHandler}
         >
            <Text style={styles.FinishText}>Finish</Text>
         </TouchableOpacity>
      </KeyboardAvoidingView>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      paddingHorizontal: 20,
      // height: "100%",
   },
   Text: {
      marginVertical: 5,
      fontSize: 14,
      color: Colors.textSecondary,
      textAlign: "center",
   },
   TypeText: {
      // paddingTop: 20,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
   },
   button: {
      height: 130,
      width: 130,
      marginVertical: 30,
      borderRadius: 20,
      justifyContent: "flex-end",
      padding: 10,
      alignItems: "center",
   },
   ButtonText: {
      fontSize: 16,
      color: Colors.textPrimary,
   },
   input: {
      marginHorizontal: 20,
      marginHorizontal: 30,
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderRadius: 10,
      backgroundColor: Colors.primary,
   },

   Finish: {
      width: "100%",
      alignSelf: "center",
      paddingVertical: 15,
      marginTop: 30,
      backgroundColor: Colors.headerBgColor,
   },
   FinishText: {
      color: Colors.headerTitle,
      fontSize: 18,
      fontWeight: "bold",
      textAlign: "center",
   },
});

export default ChooseTypeScreen;
