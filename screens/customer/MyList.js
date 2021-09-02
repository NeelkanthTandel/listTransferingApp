import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import OptionsMenu from "react-native-option-menu";

import Colors from "../../theme/colors";
import { Ionicons } from "@expo/vector-icons";

const MyList = (props) => {
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
                  title: props.title,
               });
            }
         }}
      >
         <View
            style={{
               ...styles.myListContainer,
               ...props.style,
               // backgroundColor: Colors.primary,
               backgroundColor: selected ? "" : Colors.primary,
            }}
         >
            <Text style={styles.myListTitle}>{props.title}</Text>

            <OptionsMenu
               customButton={myIcon}
               destructiveIndex={1}
               options={["Mark as done", "Delete", "Cancel"]}
               actions={[() => {}, () => {}]}
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
   myListContainer: {
      paddingLeft: 15,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
   },
   myListTitle: {
      fontSize: 16,
      color: Colors.textPrimary,
   },
});

export default MyList;
