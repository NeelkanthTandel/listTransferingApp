import React, { useEffect, useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/core";

// import { apiURL } from "../../keys";
import Colors from "../../theme/colors";
import PlusButton from "../../components/PlusButton";

let uniCurrent;

const productListScreen = (props) => {
   const isFocused = useIsFocused();
   const [products, setProducts] = useState();
   const [currentList, setCurrentList] = useState();
   uniCurrent = currentList;
   const [isShare, setIsShare] = useState(false);
   let productIds;
   const [refresh, setRefresh] = useState(false);
   // console.log();
   // const title =
   //    props.route.params.list_name.length > 20
   //       ? props.route.params.list_name.substring(0, 20) + "..."
   //       : props.route.params.list_name; //to truncat title if it's bigger than 20 character

   // const fetchList = async () => {
   //    setProducts();
   //    try {
   //       const response = await fetch(`${apiURL}/fetchList`, {
   //          method: "POST",
   //          headers: {
   //             "Content-Type": "application/json",
   //             authorization: "Bearer " + props.route.params.token,
   //          },
   //          body: JSON.stringify({
   //             _id: props.route.params._id,
   //          }),
   //       });
   //       const data = await response.json();
   //       // console.log("fetched list:", data);
   //       setCurrentList(data);
   //       productIds = data.products.map((data) => data.product_id);
   //       return await fetchProducts();
   //    } catch (err) {
   //       console.log("fetch list error:", err);
   //    }
   // }; //function to fetch list of customer containing product id and quantity
   // const fetchProducts = async () => {
   //    try {
   //       const response = await fetch(`${apiURL}/fetchProduct`, {
   //          method: "POST",
   //          headers: {
   //             "Content-Type": "application/json",
   //          },
   //          body: JSON.stringify({
   //             ids: productIds,
   //          }),
   //       });
   //       const data = await response.json();
   //       // console.log("prod:", data);
   //       await setProducts(data);
   //    } catch (err) {
   //       console.log(err.message);
   //    }
   //    setRefresh(false);
   // }; //function to fetch products name from productsIds

   // useEffect(() => {
   //    if (isFocused) {
   //       setRefresh(true);
   //    }
   // }, [isFocused]); //to refresh list when we come back from child screen

   // useEffect(() => {
   //    if (refresh) {
   //       console.log("fetching:", isFocused, refresh);
   //       fetchList();
   //       // fetchProducts();
   //    }
   // }, [refresh]); //to refresh list when refresh var is true i.e. when list is pulled down

   useEffect(() => {
      props.navigation.setOptions({
         // title,
         headerLeft: () => (
            <TouchableOpacity
               activeOpacity={0.6}
               // onPress={() => props.navigation.goBack()}
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
               onPress={() => {
                  props.navigation.navigate("scanner", {});
               }}
            >
               <Ionicons
                  name={"ios-scan-sharp"}
                  size={26}
                  color={Colors.headerTitle}
               />
            </TouchableOpacity>
         ),
      });
   }, []); //configuring header title, right and left icon

   const deleteProduct = async (id) => {
      // setProducts();
      try {
         const response = await fetch(`${apiURL}/deleteProduct`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: "Bearer " + props.route.params.token,
            },
            body: JSON.stringify({
               list_id: props.route.params._id,
               product_id: id,
            }),
         });
         const result = await response.json();
         console.log(result);
      } catch (err) {
         console.log("delete error:", err.message);
      }
      setRefresh(true);
   }; //delete product function

   const shareList = async (shop_id) => {
      console.log("shop id:", props.route.params.token);
      try {
         const response = await fetch(`http://192.168.155.213:3000/shareList`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: "Bearer " + props.route.params.token,
            },
            body: JSON.stringify({
               shop_id,
               products: uniCurrent.products,
               customer_name: "First Customer", //need to be changed
            }),
         });
         const data = await response.json();
         console.log("share: ", data);
      } catch (err) {
         console.log("share list error: ", err.message);
      }
   }; //function to share list with shopkeeper

   return (
      <View style={styles.screen}>
         <FlatList
            data={products}
            renderItem={(itemData) => {
               // console.log("flatlist", products);
               return (
                  <View style={styles.listContainer}>
                     <TouchableOpacity
                        onPress={() => deleteProduct(itemData.item._id)}
                        style={{ paddingTop: 2 }}
                     >
                        <Ionicons name="close-sharp" size={23} />
                     </TouchableOpacity>
                     <View style={styles.productContainer}>
                        <Text style={styles.listText}>
                           {itemData.item.name}
                        </Text>
                        <Text style={styles.listText}>
                           {
                              currentList.products.find(
                                 (data) => data.product_id === itemData.item._id
                              ).quantity
                           }
                        </Text>
                     </View>
                  </View>
               );
            }}
            keyExtractor={(item, index) => item._id}
            refreshing={refresh}
            onRefresh={() => {
               setRefresh(true);
            }}
            ListEmptyComponent={<Text>No item found</Text>}
         />
         <PlusButton
            onPress={
               () => {}
               // props.navigation.navigate("addProducts", {
               //    currentList,
               //    list_id: props.route.params._id,
               //    token: props.route.params.token,
               // })
            }
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
   listContainer: {
      width: "100%",
      flexDirection: "row",
      marginBottom: 15,
      alignItems: "center",
   },
   productContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: 15,
   },
   listText: {
      fontSize: 16,
      textTransform: "capitalize",
   },
});

export default productListScreen;
