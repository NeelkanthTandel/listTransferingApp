import React, { useEffect, useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
} from "react-native";
import ShopkeeperProductView from "../../components/ShopkeeperProductView";

import Colors from "../../theme/colors";

const customerListScreen = (props) => {
   return (
      <>
         <View style={styles.screen}>
            <ShopkeeperProductView
               product="Product 1"
               quantity={10}
               isGiven={true}
            />
            <ShopkeeperProductView
               product="Product 2"
               quantity={4}
               isGiven={false}
            />
            <ShopkeeperProductView
               product="Product 3"
               quantity={2}
               isGiven={false}
            />
         </View>
         <View
            style={{
               width: "100%",
               position: "absolute",
               bottom: 0,
               justifyContent: "center",
               backgroundColor: Colors.headerBgColor,
            }}
         >
            <TouchableOpacity
               onPress={() => {
                  props.navigation.goBack();
               }}
               style={{
                  width: "100%",
                  height: "100%",
                  paddingVertical: 15,
                  alignItems: "center",
               }}
               activeOpacity={0.5}
            >
               <Text
                  style={{
                     color: Colors.headerTitle,
                     fontSize: 18,
                     fontWeight: "bold",
                  }}
               >
                  Done
               </Text>
            </TouchableOpacity>
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: Colors.backgroundColor,
   },
});

export default customerListScreen;
