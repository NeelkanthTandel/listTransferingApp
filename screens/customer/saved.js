import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ProductItem from "../../components/productItem";
import colors from "../../theme/colors";
import Constants from "expo-constants";
const SavedProducts = (props) => {
   return (
      <View style={{ height: 700, backgroundColor: colors.backgroundColor }}>
         <View
            style={{ marginTop: 68, backgroundColor: colors.backgroundColor }}
         >
            <ProductItem product="product 1" isTaken={false} />
            <ProductItem product="product 2" isTaken={false} />
            <ProductItem product="product 3" isTaken={false} />
            <ProductItem product="product 4" isTaken={false} />
            <ProductItem product="product 5" isTaken={false} />
         </View>
      </View>
   );
};
const styles = StyleSheet.create({});
export default SavedProducts;
