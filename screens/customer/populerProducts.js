import React, { useEffect, useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../../theme/colors";
import { API_URL } from "../../keys";
import ProductView from "../../components/ProductView";
import { LogBox } from "react-native";

LogBox.ignoreLogs([
   "Non-serializable values were found in the navigation state",
]);

var uni;

const addProductsScreen = (props) => {
   // console.log("token: ", props);
   const [products, setProducts] = useState();
   const [selectedProducts, setSelectedProducts] = useState();
   uni = selectedProducts;
   const [refresh, setRefresh] = useState(true);
   const [run, setRun] = useState(false);
   const token = props.route.params.drawerProps.route.params.token;

   // console.log(selectedProducts);
   const fetchProducts = async () => {
      try {
         const response = await fetch(`${API_URL}/fetchPopularProduct`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
            },
         });
         const data = await response.json();
         // console.log("fetch prod data:", data);
         setProducts(data);
      } catch (err) {
         console.log("fetch prod error: ", err.message);
      }
      setRefresh(false);
   };

   useEffect(() => {
      if (refresh) fetchProducts();
   }, [refresh]);

   const addItemToArray = async (id, quantity) => {
      setSelectedProducts((data) =>
         data
            ? [
                 ...data,
                 {
                    product_id: id,
                    quantity,
                 },
              ]
            : [{ product_id: id, quantity }]
      );
      console.log("Done");
   };

   const updateList = async () => {
      if (!uni) {
         return console.log("Nothing to update");
      }
      try {
         const response = await fetch(`${API_URL}/updateCustomerList`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: "Bearer " + token,
            },
            body: JSON.stringify({
               _id: props.route.params.drawerProps.route.params.list_id,
               products: uni,
            }),
         });
         const result = await response.json();
         console.log(result);
      } catch (err) {
         console.log("update list error: ", err);
      }
   };

   useEffect(() => {
      props.route.params.drawerProps.navigation.setOptions({
         title: "Add Product",
         headerLeft: () => (
            <TouchableOpacity
               activeOpacity={0.6}
               onPress={() => props.navigation.goBack()}
            >
               <Ionicons
                  name={"ios-arrow-back"}
                  size={28}
                  color={Colors.headerTitle}
                  style={{ marginRight: 15 }}
               />
            </TouchableOpacity>
         ),
         headerRight: () => (
            <TouchableOpacity
               activeOpacity={0.6}
               onPress={async () => {
                  setRun(true);
                  setTimeout(async () => {
                     await updateList();
                     props.navigation.goBack();
                  }, 1);
               }}
            >
               <Ionicons
                  name={"ios-checkmark"}
                  size={26}
                  color={Colors.headerTitle}
               />
            </TouchableOpacity>
         ),
      });
   }, []);
   return (
      <View style={styles.screen}>
         <FlatList
            data={products}
            renderItem={(itemData) => {
               let quantity;
               if (props.route.params.currentList.products) {
                  const prod = props.route.params.currentList.products.find(
                     (data) => data.product_id === itemData.item._id
                  );
                  if (prod) {
                     quantity = prod.quantity;
                  } else {
                     quantity = 0;
                  }
               } else {
                  quantity = 0;
               }

               return (
                  <ProductView
                     itemData={itemData}
                     setSelectedProducts={setSelectedProducts}
                     run={run}
                     addItemToArray={addItemToArray}
                     quantity={quantity}
                  />
               );
            }}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={<Text>Loading...</Text>}
            refreshing={refresh}
            onRefresh={() => setRefresh(true)}
         />
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
});

export default addProductsScreen;
