import React, { useState } from "react";
import {
   Platform,
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   Modal,
   Button,
   TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

const AddItemModal = (props) => {
   const [isVisible, setIsVisible] = useState(false);

   return (
      <View style={styles.container}>
         <Modal
            animationType={"fade"}
            transparent={true}
            visible={isVisible}
            onRequestClose={() => {
               console.log("Type Here...");
            }}
         >
            {/*All views of Modal*/}
            <View style={styles.overlay}>
               <View style={styles.modal}>
                  <View
                     style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 8,
                        backgroundColor: "black",
                     }}
                  >
                     <TouchableOpacity onPress={() => setIsVisible(!isVisible)}>
                        <Ionicons
                           name="close-sharp"
                           size={23}
                           color="white"
                           style={{ marginLeft: 10 }}
                        />
                     </TouchableOpacity>
                     <View style={{ flex: 1, alignItems: "center" }}>
                        <Text style={{ color: "white", marginLeft: -33 }}>
                           Header
                        </Text>
                     </View>
                  </View>
                  <TextInput
                     placeholder=" Type Here... "
                     style={styles.input}
                  />

                  <TouchableOpacity
                     style={styles.saveButton}
                     onPress={() => {
                        setIsVisible(!isVisible);
                     }}
                  >
                     <Text color="#cccc">Save</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </Modal>
         <Button title="Open" onPress={() => setIsVisible(true)} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E8F0F2",
   },
   overlay: {
      flex: 1,
      backgroundColor: "rgba(255,255,255,0.5)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 30,
   },
   modal: {
      alignItems: "center",
      backgroundColor: "white",
      borderRadius: 25,
      borderWidth: 1,
      borderColor: "#E8F0F2",
      overflow: "hidden",
   },
   text: {
      color: "#1E2022",
      marginTop: 10,
   },
   saveButton: {
      alignItems: "center",
      height: 30,
      width: "30%",
   },
   input: {
      alignItems: "center",
      height: 30,
      width: 250,
      margin: 20,
      marginLeft: 10,
      backgroundColor: "#A2DBFA",
   },
});

export default AddItemModal;
