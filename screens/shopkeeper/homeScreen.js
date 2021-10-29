import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   ToastAndroid,
   FlatList,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";

import Colors from "../../theme/colors";
import AvailableCustomer from "../../components/AvailableCustomer";
import { Ionicons } from "@expo/vector-icons";
import { API_URL } from "../../keys";

const home = (props) => {
   const [selected, setSelected] = useState(false);
   const [isSelectAll, setIsSelectAll] = useState(-1);
   const [availableList, setAvailableList] = useState();
   const [refresh, setRefresh] = useState(true);
   const isFocused = useIsFocused();
   const [search, setSearch] = useState("");
   const [filteredList, setFilteredList] = useState();
   const [isPressedDelete, setIsPressedDelete] = useState(false);

   // console.log("Home props: ", props);

   useEffect(() => {
      if (isFocused && !refresh) {
         setRefresh(true);
      }

      // if (props.route.params?.isDone && isFocused) {
      //    ToastAndroid.show(
      //       "Done with " + props.route.params.customerName,
      //       ToastAndroid.SHORT
      //    );
      //    props.navigation.setParams({ isDone: false, listName: "" });
      // }
   }, [isFocused]);

   useEffect(() => {
      if (selected) {
         props.navigation.setOptions({
            title: "",
            headerStyle: {
               backgroundColor: Colors.secondary,
            },
            headerLeft: () => (
               <TouchableOpacity onPress={() => setIsSelectAll(0)}>
                  <Ionicons
                     name="close-sharp"
                     size={23}
                     color={Colors.headerTitle}
                  />
               </TouchableOpacity>
            ),
            headerRight: () => (
               <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                     onPress={() => {
                        setIsPressedDelete(true);
                     }}
                  >
                     <Text
                        style={{
                           fontSize: 16,
                           color: Colors.headerTitle,
                           marginRight: 20,
                        }}
                     >
                        Delete
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsSelectAll(1)}>
                     <Text
                        style={{
                           fontSize: 16,
                           color: Colors.headerTitle,
                           marginRight: 20,
                        }}
                     >
                        Select All
                     </Text>
                  </TouchableOpacity>
               </View>
            ),
         });
      } else {
         props.navigation.setOptions({
            title: "LetMe",
            headerTitleAlign: "center",

            headerStyle: {
               backgroundColor: Colors.headerBgColor,
            },
            headerLeft: () => (
               <TouchableOpacity
                  onPress={() => props.navigation.toggleDrawer()}
               >
                  <Ionicons
                     name="ios-menu"
                     size={25}
                     color={Colors.headerTitle}
                     style={{ marginRight: 15 }}
                  />
               </TouchableOpacity>
            ),
            headerRight: () => {},
         });
      }
   }, [selected]);

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
         const filteredData = data.filter((ele) => !ele.is_done);
         // console.log(filteredData);
         setAvailableList(filteredData);
      } catch (err) {
         console.log("fetch error: ", err.message);
      }
      setRefresh(false);
   };

   useEffect(() => {
      if (refresh) {
         fetchList();
      }
   }, [refresh]);

   const handleSearch = (text) => {
      const formatedText = text.toLowerCase();
      const filteredData = availableList.filter((user) =>
         user.customer_name.toLowerCase().includes(formatedText)
      );
      setFilteredList(filteredData);
   };

   return (
      <View style={styles.screen}>
         <SearchBar
            placeholder="Search"
            onChangeText={(val) => {
               setSearch(val);
               handleSearch(val);
            }}
            value={search}
            inputContainerStyle={{
               backgroundColor: "white",
               borderRadius: 10,
            }}
            lightTheme
            containerStyle={{
               padding: 0,
               borderTopWidth: 0,
               borderBottomWidth: 0,
               borderRadius: 10,
               marginBottom: 30,
            }}
         />
         <View style={styles.titleContainer}>
            {search ? (
               <Text style={styles.title}>Search Result</Text>
            ) : (
               <>
                  <View>
                     <Text style={styles.title}>Available Customer</Text>
                     <Text
                        style={{
                           fontSize: 12,
                           color: Colors.textSecondary,
                        }}
                     >
                        Tap on customer to open their list
                     </Text>
                  </View>
                  <TouchableOpacity
                     onPress={() => setRefresh(true)}
                     activeOpacity={0.6}
                  >
                     <Ionicons name="ios-refresh-sharp" size={23} />
                  </TouchableOpacity>
               </>
            )}
         </View>

         <FlatList
            data={search ? filteredList : availableList}
            renderItem={(itemData) => {
               // console.log("Available cust: ", itemData.item);
               return (
                  <AvailableCustomer
                     style={styles.availableCustomer}
                     setSelected={setSelected}
                     setIsSelectAll={setIsSelectAll}
                     selected={selected}
                     isSelectAll={isSelectAll}
                     customerName={itemData.item.customer_name}
                     listName={itemData.item.list_name}
                     products={itemData.item.products}
                     navigation={props.navigation}
                     token={props.route.params.token}
                     _id={itemData.item._id}
                     setRefresh={setRefresh}
                     isPressedDelete={isPressedDelete}
                     setIsPressedDelete={setIsPressedDelete}
                  />
               );
            }}
            keyExtractor={(item) => item._id}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
            ListEmptyComponent={() => <Text>No List Found</Text>}
         />
      </View>
   );
};

// home.navigationOptions = (navigationData)

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: Colors.backgroundColor,
   },
   title: {
      fontSize: 18,
      color: Colors.textPrimary,
      fontWeight: "bold",
   },
   titleContainer: {
      marginBottom: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   availableCustomer: {
      marginBottom: 20,
      // backgroundColor: Colors.selected,
   },
});

export default home;
