import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import Colors from "../theme/colors";

const ShopkeeperProductView = (props) => {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
   const { itemData, quantity, isGiven } = props;

   // console.log("ItemData: ", itemData);

   useEffect(() => {
      if (isGiven) {
         setToggleCheckBox(true);
      }
   }, []);

   const toggleCheckboxHandler = (newValue) => {
      props.setIsSaved(false);
      setToggleCheckBox(newValue);
      if (newValue) {
         props.setCount((data) => data + 1);
         // props.setSelectedProductIds((data) =>
         //    data
         //       ? [
         //            ...data,
         //            {
         //               product_id: itemData.item._id,
         //               quantity: quantity,
         //               is_given: true,
         //            },
         //         ]
         //       : [
         //            {
         //               product_id: itemData.item._id,
         //               quantity: quantity,
         //               is_given: true,
         //            },
         //         ]
         // );

         // const index =
         //    props.products.indexOf(
         //       props.products.find(
         //          (data) => data.product_id === itemData.item._id
         //       )
         //    );

         let newProducts = props.products.filter(
            (ele) => ele.product_id !== itemData.item._id
         );

         const updatedProductArray = {
            product_id: itemData.item._id,
            quantity: quantity,
            is_given: true,
         };

         // newProducts.pop(updatedProductArray);

         console.log("new Prod:", newProducts);
         console.log("upd pro", updatedProductArray);

         props.setProducts([...newProducts, updatedProductArray]);
      } else {
         // const newArray = props.selectedProductIds.filter(
         //    (ele) => ele.product_id !== itemData.item._id
         // );
         // props.setSelectedProductIds(newArray);

         let newProducts = props.products.filter(
            (ele) => ele.product_id !== itemData.item._id
         );

         const updatedProductArray = {
            product_id: itemData.item._id,
            quantity: quantity,
            is_given: false,
         };

         // newProducts.pop(updatedProductArray);

         console.log("new Prod:", newProducts);
         console.log("upd pro", updatedProductArray);

         props.setProducts([...newProducts, updatedProductArray]);

         props.setCount((data) => data - 1);
      }
   };

   return (
      <View
         style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -5,
            marginBottom: 15,
         }}
      >
         <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={toggleCheckboxHandler}
            tintColors={{
               true: Colors.textPrimary,
               false: Colors.textPrimary,
            }}
            animationDuration={0}
         />
         <View
            style={{
               flex: 1,
               flexDirection: "row",
               justifyContent: "space-between",
               marginLeft: 10,
            }}
         >
            <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
               {itemData.item.name}
            </Text>
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Text
                  style={{
                     fontSize: 16,
                     marginRight: 15,
                     marginLeft: 10,
                  }}
               >
                  {quantity}
               </Text>
            </View>
         </View>
      </View>
   );
};

export default ShopkeeperProductView;
