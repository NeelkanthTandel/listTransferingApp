import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import OptionsMenu from "react-native-option-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { API_URL } from "../keys";
import Colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import TextInputModal from "../components/TextInputModal";
import shareListHandler from "../global/shareListHandler";

const CustomerList = (props) => {
  const [selected, setSelected] = useState(false);
  const { token } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log(props.isSelectAll);
    if (props.isSelectAll == 1) {
      setSelected(true);
    } else if (props.isSelectAll == 0) {
      console.log("close");
      props.setSelected(false);
      setSelected(false);
      // props.setIsSelectAll(false);
    }
  }, [props.isSelectAll]);

  useEffect(() => {
    if (selected && props.isSelectAll != 0) {
      console.log(true);
      props.setSelected(true);
    }
  });

  useEffect(() => {
    if (props.pressedDelete && selected) {
      console.log("delete");
      deleteHandler();
    }
  });

  useEffect(() => {
    async () => {
      token = await AsyncStorage.getItem("token");
    };
  }, []);

  const deleteHandler = async () => {
    try {
      const response = await fetch(`${API_URL}/deleteCustomerList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          _id: props.list._id,
        }),
      });
      const data = await response.json();
      console.log("delete res:", data);
      props.setRefresh(true);
      props.setSelected(false);
      props.setIsSelectAll(false);
      props.setPressedDelete(false);
    } catch (err) {
      console.log("delete error", err.message);
    }
  };

  const renameListHandler = async (newName) => {
    try {
      const response = await fetch(`${API_URL}/renameCustomerList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          _id: props.list._id,
          list_name: newName,
        }),
      });
      const data = await response.json();
      console.log("rename res:", data);
      props.setRefresh(true);
    } catch (err) {
      console.log("rename error", err.message);
    }
  };

  const shareList = async (shop_id) => {
    console.log(props.list.products);
    shareListHandler(
      shop_id,
      token,
      props.list.products,
      props.customerName,
      props.list.list_name
    );
  };

  const myIcon = (
    <View
      style={{
        // width: 30,
        alignItems: "flex-end",
        paddingHorizontal: 15,
        // backgroundColor: "white",
      }}
    >
      <Ionicons
        name="ellipsis-vertical-sharp"
        size={23}
        color={Colors.textPrimary}
      />
    </View>
  );
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onLongPress={() => {
        if (
          !props.selected &&
          (props.isSelectAll == -1 || props.isSelectAll == 0)
        ) {
          setSelected(!selected);
          props.setSelected(true);
          props.setIsSelectAll(-1);
        }
      }}
      onPress={() => {
        if (props.selected || props.isSelectAll == 1) {
          if (selected) {
            props.setSelected(false);
            props.setIsSelectAll(-1);
          }
          setSelected(!selected);
        } else {
          props.navigation.navigate("productList", {
            _id: props.list._id,
            list_name: props.list.list_name,
            products: props.list.products,
            token,
          });
        }
      }}
    >
      <View
        style={{
          ...styles.customerListContainer,
          ...props.style,
          // backgroundColor: Colors.primary,
          backgroundColor: Colors.primary,
        }}
      >
        <View style={styles.content}>
          <Text style={styles.customerListTitle}>{props.list.list_name}</Text>

          <OptionsMenu
            customButton={myIcon}
            destructiveIndex={2}
            options={["Share", "Rename", "Delete", "Cancel"]}
            actions={[
              () => props.navigation.navigate("scanner", { shareList }),
              () => setIsModalVisible(true),
              deleteHandler,
            ]}
          />
        </View>
      </View>
      <TextInputModal
        headerTitle="Rename List"
        buttonName="Rename"
        setIsModalVisible={setIsModalVisible}
        isModalVisible={isModalVisible}
        onPress={renameListHandler}
      />
      {selected ? (
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: 55,
            backgroundColor: Colors.selected,
            borderRadius: 10,
          }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  customerListContainer: {
    borderRadius: 10,
    // paddingVertical: 15,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
    marginLeft: 15,
  },
  customerListTitle: {
    fontSize: 16,
    color: Colors.textPrimary,
    width: "80%",
  },
});

export default CustomerList;
