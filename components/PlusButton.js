import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../theme/colors";

const PlusButton = (props) => {
   return (
      <TouchableOpacity
         activeOpacity={0.7}
         style={{ ...styles.container, ...props.style }}
         onPress={() => {
            props.onPress();
         }}
      >
         <Ionicons name="add-sharp" size={30} color={Colors.headerTitle} />
      </TouchableOpacity>
   );
};

const styles = StyleSheet.create({
   container: {
      width: 50,
      height: 50,
      paddingLeft: 2,
      backgroundColor: Colors.headerBgColor,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 25,
      position: "absolute",
      bottom: 30,
      right: 30,
   },
});

export default PlusButton;
