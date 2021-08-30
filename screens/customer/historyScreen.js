import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../theme/colors";

const HistoryContainer = (props) => (
   <View style={styles.box}>
      <View style={styles.details}>
         <Text style={styles.listName}>{props.listName}</Text>
         <Text style={{ color: Colors.textSecondary }}>
            Status: {props.status}
         </Text>
      </View>
      <View style={styles.details}>
         <Text style={{ color: Colors.ShopName }}>{props.shopName}</Text>
         <Text style={{ color: Colors.textSecondary }}>{props.date}</Text>
      </View>
   </View>
);

const historyScreen = (props) => {
   return (
      <View style={styles.screen}>
         <Text style={styles.title}>History</Text>
         <HistoryContainer
            listName="List 1"
            shopName="Shop 1"
            date="12/10/20"
            status="Done"
         />
         <HistoryContainer
            listName="List 2"
            shopName="Shop 2"
            date="11/10/20"
            status="Done"
         />
         <HistoryContainer
            listName="List 3"
            shopName="Shop 3"
            date="10/10/20"
            status="Done"
         />
      </View>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      paddingTop: 30,
      paddingHorizontal: 20,
   },
   title: {
      paddingBottom: 20,
      fontSize: 18,
      fontWeight: "bold",
   },
   box: {
      width: "100%",
      backgroundColor: Colors.primary,
      padding: 15,
      borderRadius: 12,
      marginBottom: 15,
   },
   details: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
   },
   listName: {
      fontSize: 16,
   },
   ShopName: {
      fontSize: 14,
   },
});

export default historyScreen;
