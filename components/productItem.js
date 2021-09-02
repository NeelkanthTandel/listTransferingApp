import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import CheckBox from "@react-native-community/checkbox";

import Colors from "../theme/colors";
import Counter from "./Counter";
import colors from "../theme/colors";

const ProductItem = (props) => {
   const [toggleCheckBox, setToggleCheckBox] = useState(false);
   const { product, isTaken } = props;

   useEffect(() => {
      if (isTaken) {
         setToggleCheckBox(true);
      }
   }, [isTaken]);

   return (
      <View
         style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: -5,
            marginBottom: 15,
            marginTop: 20,
         }}
      >
         {/* This is checkbox 
            Current issue While Checking checkBox it gives error.
         */}
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
               true: Colors.primary,
               false: Colors.bgColor,
            }}
            style={{
               marginLeft: 20,
            }}
            animationDuration={0}
         />
         {/* 
            View that encloses the Product item and Counter Component
         */}
         <View
            style={{
               flex: 1,
               flexDirection: "row",
               justifyContent: "space-between",
               marginLeft: 10,
            }}
         >
            {/* 
                  Issue ~~~textTransform: "capitalize"~~~ Not working
            */}
            <Text style={{ fontSize: 20, textTransform: "capitalize" }}>
               {product}
            </Text>

            {/* 
               View and Text Component for Counter Component
            */}
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
               }}
            >
               <Text
                  style={{
                     marginRight: 15,
                     marginLeft: 10,
                  }}
               >
                  <Counter />
               </Text>
            </View>
         </View>
      </View>
   );
};

export default ProductItem;
