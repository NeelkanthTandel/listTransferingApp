import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import colors from "../../theme/colors";

import { API_URL } from "../../keys";

const CategoryLabel = (props) => {
  return (
    <View style={styles.subContainer}>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("categoryProducts", {
            ids: props.ids,
          });
        }}
      >
        <Text style={styles.categories}>{props.category.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const Catagories = (props) => {
  const [categories, setCategories] = useState();
  const [refresh, setRefresh] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/fetchCategories`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          // authorization: "Bearer " + tokenIn,
        },
      });
      const data = await response.json();
      // console.log(data);
      // setMyLists(data);
      setCategories(data);
    } catch (err) {
      console.log("fetch categories error:", err);
    }
    setRefresh(false);
  };

  useEffect(() => {
    if (refresh) fetchCategories();
  }, [refresh]);

  return (
    <View style={styles.container}>
      {/* <CategoryLabel title="Category 1" navigation={props.navigation} /> */}
      <FlatList
        data={categories}
        renderItem={(itemData) => {
          return (
            <CategoryLabel
              category={itemData.item}
              navigation={props.navigation}
              ids={itemData.item.product_id}
            />
          );
        }}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>Loading...</Text>}
        refreshing={refresh}
        onRefresh={() => setRefresh(true)}
        //   ItemSeparatorComponent={() => (
        //     <View
        //       style={{
        //         borderBottomWidth: 0.5,
        //         borderBottomColor: "grey",
        //       }}
        //     ></View>
        //   )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColor,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  subContainer: {
    justifyContent: "center",
    height: 40,
    width: "100%",
    //  marginLeft: 10,
  },
  categories: {
    fontSize: 16,
    //  marginLeft: 15,
    color: "#000000",
  },
});
export default Catagories;
