import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../../theme/colors";

const HistoryContainer = (props) => (
   <View style={styles.box}>
      <View>
         <Text style={styles.customerName}>{props.name}</Text>
      </View>
      <View style={styles.details}>
         <Text style={{ color: Colors.textSecondary }}>{props.date}</Text>
         <Text style={{ color: Colors.textSecondary }}>
            Status: {props.status}
         </Text>
      </View>
   </View>
);

const historyScreen = (props) => {
   return (
      <View style={styles.screen}>
         <Text style={styles.title}>History</Text>
         <HistoryContainer name="Customer 1" date="12/12/12" status="Done" />
         <HistoryContainer name="Customer 2" date="12/12/12" status="Done" />
         <HistoryContainer name="Customer 3" date="12/12/12" status="Done" />
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
   customerName: {
      fontSize: 16,
   },
});

export default historyScreen;
