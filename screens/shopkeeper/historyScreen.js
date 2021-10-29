import React, { useEffect, useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   FlatList,
   TouchableOpacity,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Colors from "../../theme/colors";
import { API_URL } from "../../keys";
import { Ionicons } from "@expo/vector-icons";

const HistoryContainer = (props) => (
   <View style={styles.box}>
      <View>
         <Text style={styles.customerName}>{props.name}</Text>
      </View>
      <View style={styles.details}>
         <Text style={{ color: Colors.textSecondary }}>{props.date}</Text>
         {/* <Text style={{ color: Colors.textSecondary }}>
            Status: {props.status}
         </Text> */}
      </View>
   </View>
);

const historyScreen = (props) => {
   const [refresh, setRefresh] = useState(true);
   const [doneList, setDoneList] = useState();
   const isFocused = useIsFocused();

   const fetchList = async () => {
      try {
         const response = await fetch(`${API_URL}/fetchShopkeeperList`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               authorization: "Bearer " + props.route.params.token,
            },
         });
         const data = await response.json();
         // console.log(data);
         const filteredData = data.filter((ele) => ele.is_done);
         // console.log(filteredData);
         setDoneList(filteredData);
      } catch (err) {
         console.log("fetch error: ", err.message);
      }
      setRefresh(false);
   };

   useEffect(() => {
      if (refresh && isFocused) {
         fetchList();
      }
   }, [refresh]);

   return (
      <View style={styles.screen}>
         <View style={styles.titleContainer}>
            <Text style={styles.title}>History</Text>
            <TouchableOpacity
               onPress={() => setRefresh(true)}
               activeOpacity={0.6}
            >
               <Ionicons name="ios-refresh-sharp" size={23} />
            </TouchableOpacity>
         </View>
         <FlatList
            data={doneList}
            renderItem={(itemData) => {
               // console.log("Available cust: ", itemData.item);
               return (
                  <HistoryContainer
                     name={itemData.item.customer_name}
                     date={itemData.item.date.split("T")[0]}
                     status="Done"
                  />
               );
            }}
            keyExtractor={(item) => item._id}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            ListEmptyComponent={() => <Text>No History yet.</Text>}
         />
         {/* <HistoryContainer name="Customer 1" date="12/12/12" status="Done" />
         <HistoryContainer name="Customer 2" date="12/12/12" status="Done" />
         <HistoryContainer name="Customer 3" date="12/12/12" status="Done" /> */}
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
   titleContainer: {
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
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
