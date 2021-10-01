import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import Colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";

const ProductView = (props) => {
   const [quantity, setQuantity] = useState(1);
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
   const { itemData } = props;

   useEffect(() => {
      if (props.quantity) {
         setToggleCheckBox(true);
         setQuantity(props.quantity);
      }
   }, []);

   useEffect(() => {
      if (props.run) {
         if (toggleCheckBox) {
            if (!props.quantity) {
               console.log("adding");
               props.addItemToArray(itemData.item._id, quantity);
            } else if (props.quantity != quantity) {
               console.log("replace quant");
            }
         } else if (props.quantity) {
            console.log("remove");
         }
      }
   }, [props.run]);

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
            onValueChange={(newValue) => {
               setToggleCheckBox(newValue);
            }}
            tintColors={{ true: Colors.textPrimary, false: Colors.textPrimary }}
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
               <TouchableOpacity
                  onPress={() => {
                     if (quantity > 1) {
                        setQuantity((q) => q - 1);
                     }
                  }}
                  style={{
                     width: 23,
                     height: 23,
                     backgroundColor: Colors.primary,
                     justifyContent: "center",
                     alignItems: "center",
                     paddingLeft: 1,
                     borderRadius: 12,
                  }}
               >
                  <Ionicons name="remove-sharp" size={20} />
               </TouchableOpacity>
               <Text style={{ fontSize: 16, marginRight: 15, marginLeft: 10 }}>
                  {" "}
                  {quantity}
               </Text>
               <TouchableOpacity
                  onPress={() => {
                     setQuantity((q) => q + 1);
                  }}
                  style={{
                     width: 23,
                     height: 23,
                     backgroundColor: Colors.primary,
                     justifyContent: "center",
                     alignItems: "center",
                     paddingLeft: 1,
                     borderRadius: 12,
                  }}
               >
                  <Ionicons name="add-sharp" size={20} />
               </TouchableOpacity>
            </View>
         </View>
      </View>
   );
};

export default ProductView;
