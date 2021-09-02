import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";

const Catagories = (props) => {
   return (
      <View style={styles.container}>
         <View style={styles.subContainer}>
            <TouchableOpacity>
               <Text style={styles.categories}>Category 1</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.subContainer}>
            <TouchableOpacity>
               <Text style={styles.categories}>Category 2</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.subContainer}>
            <TouchableOpacity>
               <Text style={styles.categories}>Category 3</Text>
            </TouchableOpacity>
         </View>
      </View>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: colors.backgroundColor,
   },
   subContainer: {
      justifyContent: "center",
      height: 50,
      width: "100%",
      marginTop: 10,
      marginLeft: 10,
   },
   categories: {
      fontSize: 30,
   },
});
export default Catagories;
