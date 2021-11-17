import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Colors from "../../theme/colors";
import { API_URL } from "../../keys";

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
  const [refresh, setRefresh] = useState(true);
  const [history, setHistory] = useState();
  const isFocused = useIsFocused();

  const fetchList = async () => {
    try {
      const response = await fetch(`${API_URL}/fetchCustomerHistory`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + props.route.params.token,
        },
      });
      const data = await response.json();
      console.log("history: ", data);
      // const filteredData = data.filter((ele) => ele.is_done);
      // console.log(filteredData);
      setHistory(data);
    } catch (err) {
      console.log("fetch history error: ", err.message);
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
      <Text style={styles.title}>History</Text>
      <FlatList
        data={history}
        renderItem={(itemData) => {
          // console.log("Available cust: ", itemData.item);
          return (
            <HistoryContainer
              listName={itemData.item.list_name}
              shopName={itemData.item.shop_name}
              date={itemData.item.date?.split("T")[0]}
              status={itemData.item.is_done ? "Done" : "Pending"}
            />
          );
        }}
        keyExtractor={(item) => item._id}
        refreshing={refresh}
        onRefresh={() => setRefresh(true)}
        ListEmptyComponent={() => <Text>No History yet.</Text>}
      />
      {/* <HistoryContainer
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
         /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.backgroundColor,
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
