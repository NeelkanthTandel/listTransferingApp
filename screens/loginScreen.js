import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import * as Google from "expo-google-app-auth";

import Colors from "../theme/colors";

const loginScreen = () => {
   const signInWithGoogleAsync = async () => {
      try {
         const result = await Google.logInAsync({
            androidClientId:
               "295729975949-s720j7b1m3r6n4u4c8kjavugvqt32ppg.apps.googleusercontent.com",
            scopes: ["profile", "email"],
         });

         if (result.type === "success") {
            console.log(result.user);
         } else {
            return { cancelled: true };
         }
      } catch (e) {
         return { error: true };
      }
   };

   return (
      <View style={styles.screen}>
         <Text style={styles.text}>App Name</Text>
         <View style={styles.box}>
            <Text style={styles.Text}>Login/Signup</Text>
            <TouchableOpacity
               style={styles.button}
               onPress={signInWithGoogleAsync}
            >
               <Text style={styles.textBox}>Continue with Google</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   screen: {
      flex: 1,
      justifyContent: "space-between",
      backgroundColor: Colors.backgroundColor,
   },
   text: {
      marginTop: "60%",
      textAlign: "center",
      fontSize: 23,
      fontWeight: "bold",
   },
   box: {
      width: "100%",
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      backgroundColor: Colors.secondary,
      alignItems: "center",
   },
   Text: {
      fontSize: 16,
      marginTop: 10,
      color: "#ffff",
   },
   button: {
      width: "85%",
      paddingVertical: 6,
      borderRadius: 100,
      backgroundColor: "white",
      textAlign: "center",
      alignItems: "center",
      marginBottom: 30,
      marginTop: 80,
   },
   textBox: {
      padding: 8,
      fontSize: 18,
   },
});

export default loginScreen;
