import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-google-app-auth";
import { StackActions } from "@react-navigation/native";

import Colors from "../theme/colors";

const loginScreen = (props) => {
   const signInWithGoogleAsync = async () => {
      try {
         const result = await Google.logInAsync({
            androidClientId:
               "295729975949-pqhv120lksjjl52ojos88jm48ah5b1g1.apps.googleusercontent.com",
            scopes: ["profile", "email"],
         });

         if (result.type === "success") {
            console.log(result.user);
            props.navigation.dispatch(
               StackActions.replace("chooseType", {
                  email: result.user.email,
                  name: result.user.name,
               })
            );
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
            <Text style={styles.Text}>Register / Sign In</Text>
            <TouchableOpacity
               activeOpacity={0.8}
               style={styles.button}
               onPress={signInWithGoogleAsync}
            >
               <Image
                  source={require("../assets/images/btn_google_light_normal_edit.png")}
                  style={{
                     width: 25,
                     height: 25,
                     position: "absolute",
                     left: 15,
                  }}
               />
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
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: Colors.secondary,
      alignItems: "center",
   },
   Text: {
      fontSize: 16,
      marginTop: 10,
      color: "#ffff",
   },
   button: {
      paddingLeft: 15,
      width: "85%",
      paddingVertical: 6,
      borderRadius: 100,
      backgroundColor: "white",
      alignItems: "center",
      marginBottom: 30,
      marginTop: 80,
      flexDirection: "row",
      justifyContent: "center",
   },
   textBox: {
      padding: 8,
      fontSize: 18,
   },
});

export default loginScreen;
