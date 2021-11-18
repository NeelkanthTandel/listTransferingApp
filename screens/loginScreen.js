import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-google-app-auth";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { API_URL } from "../keys";
import Colors from "../theme/colors";

const loginScreen = (props) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "295729975949-ejhl8lmrc0asf1su89tk28vi6gv1ccpe.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  const signInWithGoogleAsync = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const result = await GoogleSignin.signIn();
      console.log("signin", result);
    } catch (error) {
      console.log("e:", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
    // try {
    //   const result = await Google.logInAsync({
    //     androidClientId:
    //       "295729975949-pqhv120lksjjl52ojos88jm48ah5b1g1.apps.googleusercontent.com",
    //     androidStandaloneAppClientId:
    //       "295729975949-s720j7b1m3r6n4u4c8kjavugvqt32ppg.apps.googleusercontent.com",
    //     scopes: ["profile", "email"],
    //   });

    //   if (result.type === "success") {
    //     console.log(result.user);
    //     try {
    //       const response = await fetch(`${API_URL}/signIn`, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           email: result.user.email,
    //         }),
    //       });
    //       const data = await response.json();
    //       console.log("user data:", data);
    //       if (!data.registered) {
    //         props.navigation.dispatch(
    //           StackActions.replace("chooseType", {
    //             email: result.user.email,
    //             name: result.user.name,
    //           })
    //         );
    //       } else {
    //         if (data.isShopkeeper) {
    //           AsyncStorage.setItem("token", data.token);
    //           props.navigation.dispatch(
    //             StackActions.replace("shopkeeperDrawer", {
    //               email: result.user.email,
    //               name: result.user.name,
    //               shopName: data.shopName,
    //               token: data.token,
    //               shop_id: data.shop_id,
    //             })
    //           );
    //         } else {
    //           AsyncStorage.setItem("token", data.token);
    //           props.navigation.dispatch(
    //             StackActions.replace("customerDrawer", {
    //               email: result.user.email,
    //               name: result.user.name,
    //               token: data.token,
    //             })
    //           );
    //         }
    //       }
    //     } catch (err) {
    //       console.log("login error", err);
    //     }
    //   } else {
    //     return { cancelled: true };
    //   }
    // } catch (e) {
    //   return { error: true };
    // }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/icon.png")}
          style={{
            height: 100,
            width: 100,
          }}
          resizeMode="contain"
        />
        <Text style={styles.text}>LetMe</Text>
      </View>
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
  logoContainer: {
    marginTop: "40%",
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
    color: Colors.textPrimary,
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
