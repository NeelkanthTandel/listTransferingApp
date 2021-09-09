import React, { useState } from "react";
import { StyleSheet } from "react-native";

import Colors from "../theme/colors";
import { API_URL } from "../keys";
import TextInputModal from "./TextInputModal";
const token =
   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MTEwZWEwMTQyZmI4NTIyN2M4YTFlYTYiLCJpYXQiOjE2Mjg1MTM0MDN9.WcXw8ToMwXB1CGH30ECEFkWamhno5l5JAXspADvxxHo";

const CreateListModal = (props) => {
   const createList = async (name) => {
      console.log("name:", name);
      try {
         const response = await fetch(`${API_URL}/createCustomerList`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               authorization: "Bearer " + token,
            },
            body: JSON.stringify({
               list_name: name,
            }),
         });
         const data = await response.json();
         console.log("create list: ", data);
      } catch (err) {
         console.log("create list error:", err.message);
      }
      props.setRefresh(true);
   };

   return (
      <TextInputModal
         headerTitle={props.headerTitle}
         buttonName={props.buttonName}
         setIsModalVisible={props.setIsModalVisible}
         isModalVisible={props.isModalVisible}
         onPress={createList}
      />
   );
};

const styles = StyleSheet.create({
   overlay: {
      flex: 1,
      backgroundColor: Colors.selected,
      justifyContent: "center",
      alignItems: "center",
   },
   container: {
      width: "80%",
      backgroundColor: Colors.backgroundColor,
      borderRadius: 10,
      overflow: "hidden",
   },
   headerContainer: {
      height: 45,
      width: "100%",
      backgroundColor: Colors.headerBgColor,
      justifyContent: "center",
   },
   headerTitle: {
      position: "absolute",
      width: "100%",
      height: "100%",
      justifyContent: "center",
   },
   body: {
      paddingVertical: 15,
      paddingHorizontal: 15,
      alignItems: "center",
   },
   inputField: {
      width: "100%",
      marginVertical: 15,
      paddingVertical: 8,
      paddingHorizontal: 15,
      backgroundColor: Colors.primary,
      borderRadius: 10,
   },
   button: { marginVertical: 5 },
});

export default CreateListModal;
