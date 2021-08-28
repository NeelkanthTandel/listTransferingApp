import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import Colors from "../theme/colors";

const ShopkeeperProductView = (props) => {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
   const { product, quantity, isGiven } = props;

   useEffect(() => {
      if (isGiven) {
         setToggleCheckBox(true);
      }
   }, []);

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
               if (newValue) {
                  props.setCount((data) => data + 1);
               } else {
                  props.setCount((data) => data - 1);
               }
            }}
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
               {product}
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
