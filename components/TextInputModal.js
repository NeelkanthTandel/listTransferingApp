import React, { useState } from "react";
import {
   StyleSheet,
   Modal,
   View,
   Text,
   TouchableOpacity,
   TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors from "../theme/colors";

const TextInputModal = (props) => {
   const [enteredValue, setEnteredValue] = useState("");

   return (
      <Modal
         animationType="fade"
         transparent={true}
         visible={props.isModalVisible}
         onRequestClose={() => {
            props.setIsModalVisible(!props.isModalVisible);
         }}
      >
         <View style={styles.overlay}>
            <View style={styles.container}>
               <View style={styles.headerContainer}>
                  <View style={styles.headerTitle}>
                     <Text
                        style={{
                           color: Colors.headerTitle,
                           fontSize: 16,
                           fontWeight: "bold",
                           textAlign: "center",
                        }}
                     >
                        {props.headerTitle}
                     </Text>
                  </View>
                  <TouchableOpacity
                     activeOpacity={0.3}
                     onPress={() => props.setIsModalVisible(false)}
                     style={{
                        marginLeft: 15,
                        width: 30,
                     }}
                  >
                     <Ionicons
                        name="close-sharp"
                        size={23}
                        color={Colors.headerTitle}
                     />
                  </TouchableOpacity>
               </View>
               <View style={styles.body}>
                  <TextInput
                     placeholder="List Name"
                     value={enteredValue}
                     style={styles.inputField}
                     onChangeText={(val) => setEnteredValue(val)}
                  />
                  <TouchableOpacity
                     activeOpacity={0.5}
                     onPress={async () => {
                        await props.onPress(enteredValue);
                        setEnteredValue("");
                        props.setIsModalVisible(false);
                     }}
                     style={styles.button}
                  >
                     <Text
                        style={{
                           color: Colors.textPrimary,
                           fontWeight: "bold",
                        }}
                     >
                        {props.buttonName}
                     </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </View>
      </Modal>
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

export default TextInputModal;
