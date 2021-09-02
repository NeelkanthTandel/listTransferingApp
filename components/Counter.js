import React, { useState, useCallback } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../theme/colors";
const Counter = (props) => {
   const [count, setCount] = useState(0);

   const OnIncrementClick = useCallback(() => {
      setCount(count + 1);
   }, [count]);

   const OnDecrementClick = useCallback(() => {
      setCount(count - 1);
   }, [count]);
   return (
      <View style={styles.main}>
         {/* 
               This is Decrement button
         */}
         <TouchableOpacity
            style={styles.designButton}
            onPress={OnDecrementClick}
         >
            <Text style={styles.textStyle}>-</Text>
         </TouchableOpacity>

         {/* 
               View for Count
         */}
         <View>
            <Text style={styles.textStyle}>{count}</Text>
         </View>

         {/* 
               This is Increment button
         */}
         <TouchableOpacity
            style={styles.designButton}
            onPress={OnIncrementClick}
         >
            <Text style={styles.textStyle}>+</Text>
         </TouchableOpacity>
      </View>
   );
};
const styles = StyleSheet.create({
   main: {
      backgroundColor: colors.backgroundColor,
      flexDirection: "row",
   },
   designButton: {
      width: 26,
      height: 26,
      paddingLeft: 2,
      backgroundColor: colors.primary,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 13,
      marginHorizontal: 10,
   },
   textStyle: {
      alignItems: "center",
      justifyContent: "center",
      fontSize: 20,
   },
});
export default Counter;
