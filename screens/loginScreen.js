import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import * as Google from "expo-google-app-auth";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../keys";
import Colors from "../theme/colors";

const loginScreen = (props) => {
  const [loading, setLoading] = useState(false);

  const signInWithGoogleAsync = async () => {
    setLoading(true);
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "yourAndroidClientId",
        androidStandaloneAppClientId:
          "yourAndroidStandaloneAppClientId",
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        console.log(result.user);
        try {
          const response = await fetch(`${API_URL}/signIn`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: result.user.email,
            }),
          });
          const data = await response.json();
          console.log("user data:", data);
          if (!data.registered) {
            setLoading(false);
            props.navigation.dispatch(
              StackActions.replace("chooseType", {
                email: result.user.email,
                name: result.user.name,
              })
            );
          } else {
            if (data.isShopkeeper) {
              AsyncStorage.setItem("token", data.token);
              setLoading(false);
              props.navigation.dispatch(
                StackActions.replace("shopkeeperDrawer", {
                  email: result.user.email,
                  name: result.user.name,
                  shopName: data.shopName,
                  token: data.token,
                  shop_id: data.shop_id,
                })
              );
            } else {
              AsyncStorage.setItem("token", data.token);
              setLoading(false);
              props.navigation.dispatch(
                StackActions.replace("customerDrawer", {
                  email: result.user.email,
                  name: result.user.name,
                  token: data.token,
                })
              );
            }
          }
        } catch (err) {
          console.log("login error", err);
          setLoading(false);
        }
      } else {
        setLoading(false);
        return { cancelled: true };
      }
    } catch (e) {
      setLoading(false);
      return { error: true };
    }
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
          style={{
            ...styles.button,
            backgroundColor: loading ? "rgba(255,255,255,0.5)" : "white",
          }}
          onPress={signInWithGoogleAsync}
          disabled={loading}
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
          <Text style={styles.textBox}>
            {loading ? "Please Wait..." : "Continue with Google"}
          </Text>
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
