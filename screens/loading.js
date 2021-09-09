import React from "react";
import { StyleSheet, View, Text } from "react-native";

const loadingScreen = () => {
   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <Text>Loading...</Text>
      </View>
   );
};

export default loadingScreen;
