import React, { useEffect, useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
   Modal,
   Alert,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ShopkeeperProductView from "../../components/ShopkeeperProductView";
import Colors from "../../theme/colors";
import { API_URL } from "../../keys";

const customerListScreen = (props) => {
   // const [isModalVisible, setIsModalVisible] = useState(true);
   // let count = 0;
   const { products } = props.route.params;
   const productIds = products.map((data) => data.product_id);
   const [productsArray, setProductsArray] = useState();
   const [selectedProductIds, setSelectedProductIds] = useState();

   console.log("list props:", productIds);

   const [count, setCount] = useState(0);
   // console.log(count);

   const fetchProducts = async () => {
      try {
         const response = await fetch(`${API_URL}/fetchProduct`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               ids: productIds,
            }),
         });
         const data = await response.json();
         // console.log("prod:", data);
         await setProductsArray(data);
      } catch (err) {
         console.log(err.message);
      }
   };

   useEffect(() => {
      fetchProducts();
   }, []);

   useEffect(() => {
      props.navigation.setOptions({
         title: props.route.params.title,
      });
   }, []);
   return (
      <>
         <View style={styles.screen}>
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingRight: 15,
                  // marginBottom: 10,
               }}
            >
               <Text style={{ color: Colors.textSecondary }}>Qty</Text>
            </View>
            <FlatList
               data={productsArray}
               renderItem={(itemData) => {
                  const quantity = products.find(
                     (data) => data.product_id === itemData.item._id
                  ).quantity;
                  const isGiven = products.find(
                     (data) => data.product_id === itemData.item._id
                  ).is_given;

                  console.log(
                     "IN customerList Screen: ",
                     itemData,
                     " ",
                     quantity
                  );

                  return (
                     // <ShopkeeperProductView
                     //    itemData={itemData}
                     //    quantity={quantity}
                     //    selectedProductIds={selectedProductIds}
                     //    setSelectedProductIds={setSelectedProductIds}
                     //    isGiven={isGiven}
                     // />
                     <ShopkeeperProductView
                        itemData={itemData}
                        quantity={quantity}
                        isGiven={isGiven}
                        selectedProductIds={selectedProductIds}
                        setSelectedProductIds={setSelectedProductIds}
                        setCount={setCount}
                     />
                  );
               }}
               keyExtractor={(item) => item._id}
            />
            {/* <ShopkeeperProductView
               product="Product 1"
               quantity={10}
               isGiven={false}
               setCount={setCount}
            />
            <ShopkeeperProductView
               product="Product 2"
               quantity={4}
               isGiven={false}
               setCount={setCount}
            />
            <ShopkeeperProductView
               product="Product 3"
               quantity={2}
               isGiven={false}
               setCount={setCount}
            /> */}
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
                  if (count < 3) {
                     Alert.alert(
                        "Confirmation",
                        "Few products are remaining. Do you want to still continue?",
                        [
                           { text: "Cancel", style: "cancel" },
                           {
                              text: "Continue",
                              onPress: () =>
                                 props.navigation.navigate("home", {
                                    isDone: true,
                                    listName: props.route.params.title,
                                 }),
                           },
                        ]
                     );
                  } else {
                     props.navigation.navigate("home", {
                        isDone: true,
                        listName: props.route.params.title,
                     });
                  }
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
            {/* <Modal
               animationType="fade"
               transparent={true}
               visible={isModalVisible}
               onRequestClose={() => {
                  setIsModalVisible(!isModalVisible);
               }}
            >
               <View style={styles.overlay}>
                  <View style={styles.container}>
                     <View style={styles.headerContainer}>
                        <View style={styles.headerTitle}>
                           <Text
                              style={{
                                 color: Colors.headerTitle,
                                 fontSize: 16,
                                 fontWeight: "bold",
                                 textAlign: "center",
                              }}
                           >
                              Header
                           </Text>
                        </View>
                        <TouchableOpacity
                           activeOpacity={0.3}
                           onPress={() => setIsModalVisible(false)}
                           style={{
                              marginLeft: 15,
                              width: 30,
                           }}
                        >
                           <Ionicons
                              name="close-sharp"
                              size={23}
                              color={Colors.headerTitle}
                           />
                        </TouchableOpacity>
                     </View>
                     <View style={styles.body}>
                        <TouchableOpacity
                           activeOpacity={0.5}
                           onPress={async () => {
                              setEnteredValue("");
                           }}
                           style={styles.button}
                        >
                           <Text
                              style={{
                                 color: Colors.textPrimary,
                                 fontWeight: "bold",
                              }}
                           >
                              Button Name
                           </Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </Modal> */}
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
   overlay: {
      flex: 1,
      backgroundColor: Colors.selected,
      justifyContent: "center",
      alignItems: "center",
   },
   container: {
      width: "80%",
      backgroundColor: Colors.backgroundColor,
      borderRadius: 10,
      overflow: "hidden",
   },
   headerContainer: {
      height: 45,
      width: "100%",
      backgroundColor: Colors.headerBgColor,
      justifyContent: "center",
   },
   headerTitle: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
   },
   body: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      alignItems: "center",
   },
   button: { marginVertical: 5 },
});

export default customerListScreen;
