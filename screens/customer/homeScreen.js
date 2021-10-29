import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../../theme/colors";
import CustomerList from "../../components/CustomerList";
import { Ionicons } from "@expo/vector-icons";
import PlusButton from "../../components/PlusButton";
import { API_URL } from "../../keys";
import CreateListModal from "../../components/CreateListModal";

const homeScreen = (props) => {
   // console.log();
   const [selected, setSelected] = useState(false);
   const [pressedDelete, setPressedDelete] = useState(false);
   const [isSelectAll, setIsSelectAll] = useState(-1);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [refresh, setRefresh] = useState(true);
   const [myLists, setMyLists] = useState([]);
   // const { token } = props.route.params;
   const [token, setToken] = useState("");

   const fetchList = async () => {
      const tokenIn = await AsyncStorage.getItem("token");
      setToken(tokenIn);

      try {
         const response = await fetch(`${API_URL}/fetchCustomerLists`, {
            method: "Get",
            headers: {
               "Content-Type": "application/json",
               authorization: "Bearer " + tokenIn,
            },
         });
         const data = await response.json();
         // console.log(data);
         setMyLists(data);
      } catch (err) {
         console.log("fetch list error:", err);
      }
      setRefresh(false);
   };

   useEffect(() => {
      if (refresh) {
         console.log("fetchingList");
         fetchList();
      }
   }, [refresh]);
   useEffect(() => {
      if (selected) {
         props.navigation.setOptions({
            title: "",
            headerStyle: {
               backgroundColor: Colors.secondary,
            },
            headerTitleAlign: "center",
            headerLeft: () => (
               <TouchableOpacity onPress={() => setIsSelectAll(0)}>
                  <Ionicons
                     name="close-sharp"
                     size={26}
                     color={Colors.headerTitle}
                  />
               </TouchableOpacity>
            ),
            headerRight: () => (
               <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => setPressedDelete(true)}>
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
            headerStyle: {
               backgroundColor: Colors.headerBgColor,
            },
            headerTitleAlign: "center",
            headerLeft: () => (
               <TouchableOpacity
                  onPress={() => props.navigation.toggleDrawer()}
               >
                  <Ionicons
                     name="ios-menu"
                     size={26}
                     color={Colors.headerTitle}
                     style={{ marginRight: 15 }}
                  />
               </TouchableOpacity>
            ),
            headerRight: () => {},
         });
      }
   }, [selected]);

   return (
      <View style={styles.screen}>
         <View style={styles.titleContainer}>
            <Text style={styles.title}>My List</Text>
            <TouchableOpacity
               onPress={() => setRefresh(true)}
               activeOpacity={0.6}
            >
               <Ionicons name="ios-refresh-sharp" size={23} />
            </TouchableOpacity>
         </View>

         <View style={{ flex: 1 }}>
            <FlatList
               data={myLists}
               showsVerticalScrollIndicator={false}
               renderItem={(itemData) => {
                  return (
                     <>
                        <CustomerList
                           style={styles.customerLists}
                           setSelected={setSelected}
                           setIsSelectAll={setIsSelectAll}
                           selected={selected}
                           isSelectAll={isSelectAll}
                           list={itemData.item}
                           setRefresh={setRefresh}
                           pressedDelete={pressedDelete}
                           setPressedDelete={setPressedDelete}
                           navigation={props.navigation}
                           token={token}
                           customerName={props.route.params.name}
                        />
                     </>
                  );
               }}
               keyExtractor={(item) => item._id}
               refreshing={refresh}
               onRefresh={() => setRefresh(true)}
               ListEmptyComponent={<Text>No list found</Text>}
            />
         </View>
         <PlusButton onPress={() => setIsModalVisible(true)} />
         <CreateListModal
            headerTitle="Create List"
            buttonName="Create"
            setIsModalVisible={setIsModalVisible}
            setRefresh={setRefresh}
            isModalVisible={isModalVisible}
            token={token}
         />
      </View>
   );
};

// home.navigationOptions = (navigationData)

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      paddingTop: 30,
      paddingHorizontal: 20,
      backgroundColor: Colors.backgroundColor,
   },
   titleContainer: {
      marginBottom: 30,
      flexDirection: "row",
      justifyContent: "space-between",
   },
   title: {
      fontSize: 18,
      color: Colors.textPrimary,
      fontWeight: "bold",
   },
   customerLists: {
      marginBottom: 20,
      // backgroundColor: Colors.selected,
   },
});

export default homeScreen;
