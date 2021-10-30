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
import PlusButton from "../../components/PlusButton";
import TextInputModal from "../../components/TextInputModal";

LogBox.ignoreLogs([
   "Non-serializable values were found in the navigation state",
]);

var uni;

const savedProductsScreen = (props) => {
   // console.log("token: ", props);
   const [products, setProducts] = useState();
   const [selectedProducts, setSelectedProducts] = useState();
   uni = selectedProducts;
   const [refresh, setRefresh] = useState(true);
   const [run, setRun] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const token = props.route.params.drawerProps.route.params.token;

   // console.log(selectedProducts);
   const fetchProducts = async () => {
      try {
         const response = await fetch(`${API_URL}/fetchSavedProduct`, {
            method: "GET",
            headers: {
               "Content-Type": "application/json",
               Authorization: token,
            },
         });
         const data = await response.json();
         setProducts(data);
      } catch (err) {
         console.log("fetch prod error: ", err.message);
      }
      setRefresh(false);
   };

   useEffect(() => {
      if (refresh) fetchProducts();
   }, [refresh]);

   const saveProductHandler = async (productName) => {
      try {
         const response = await fetch(`${API_URL}/saveProduct`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: token,
            },
            body: JSON.stringify({
               name: productName,
            }),
         });
         const data = await response.json();
         console.log("save product:", data);
         setRefresh(true);
      } catch (err) {
         console.log("fetch prod error: ", err.message);
      }
   };

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
                     props.route.params.drawerProps.navigation.goBack();
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
         <PlusButton onPress={() => setIsModalVisible(true)} />
         <TextInputModal
            headerTitle="Save Your Product"
            buttonName="Save"
            setIsModalVisible={setIsModalVisible}
            isModalVisible={isModalVisible}
            onPress={saveProductHandler}
            placeholder="Product Name"
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

export default savedProductsScreen;
