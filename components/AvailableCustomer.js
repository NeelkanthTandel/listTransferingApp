import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import OptionsMenu from "react-native-option-menu";

import Colors from "../theme/colors";
import { Ionicons } from "@expo/vector-icons";
import markAsDoneHandler from "../global/markAsDoneHandler";
import { API_URL } from "../keys";

const AvailableCustomer = (props) => {
   const [selected, setSelected] = useState(false);
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
      if (props.isPressedDelete && selected) {
         console.log("delete");
         onDeleteHandler();
      }
   });
   const myIcon = (
      <View
         style={{
            // width: 30,
            alignItems: "flex-end",
            padding: 15,
            paddingRight: 10,
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

   const onDoneHandler = () => {
      markAsDoneHandler(props.customerName, props._id, props.token);
      props.setRefresh(true);
   };

   const onDeleteHandler = async () => {
      props.setRefresh(true);
      try {
         const response = await fetch(`${API_URL}/deleteShopkeeperList`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization: "Bearer " + props.token,
            },
            body: JSON.stringify({
               _id: props._id,
            }),
         });
         const data = await response.json();
         console.log("Delete: ", data);
         props.setRefresh(true);
         props.setSelected(false);
         props.setIsSelectAll(false);
         props.setIsPressedDelete(false);
      } catch (err) {
         console.log("shopkeeper list delete: ", err);
      }
   };

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
               props.navigation.navigate("customerList", {
                  title: props.listName,
                  customerName: props.customerName,
                  products: props.products,
                  token: props.token,
                  _id: props._id,
               });
            }
         }}
      >
         <View
            style={{
               ...styles.customerListContainer,
               ...props.style,
               // backgroundColor: Colors.primary,
               backgroundColor: selected ? "" : Colors.primary,
            }}
         >
            <View>
               <Text style={styles.customerListTitle}>
                  {props.customerName}
               </Text>
               <Text style={styles.customerName}>{props.listName}</Text>
            </View>

            <OptionsMenu
               customButton={myIcon}
               destructiveIndex={1}
               options={["Mark as done", "Delete", "Cancel"]}
               actions={[onDoneHandler, onDeleteHandler]}
            />
         </View>

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
      paddingLeft: 15,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   customerListTitle: {
      fontSize: 16,
      color: Colors.textPrimary,
   },
   customerName: {
      fontSize: 12,
      color: Colors.textPrimary,
   },
});

export default AvailableCustomer;
