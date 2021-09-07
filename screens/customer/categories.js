import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";

const CategoryLabel = (props) => {
   return(
<View style={styles.subContainer}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("categoryProducts");
          }}
        >
          <Text style={styles.categories}>{props.title}</Text>
        </TouchableOpacity>
      </View>
   )
}

const Catagories = (props) => {
  return (
    <View style={styles.container}>
      <CategoryLabel title="Category 1" navigation={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: 30,
  },
  subContainer: {
    justifyContent: "center",
    height: 45,
    width: "100%",
    marginLeft: 10,
  },
  categories: {
    fontSize: 23,
    marginLeft: 21,
    color: colors.secondary,
  },
});
export default Catagories;
