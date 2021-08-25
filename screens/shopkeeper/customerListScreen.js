import React, { useEffect, useState } from "react";
import {
   StyleSheet,
   View,
   Text,
   FlatList,
   TouchableOpacity,
   Modal,
   Alert,
} from "react-native";
import { StackActions } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import ShopkeeperProductView from "../../components/ShopkeeperProductView";
import Colors from "../../theme/colors";

const customerListScreen = (props) => {
   // const [isModalVisible, setIsModalVisible] = useState(true);
   useEffect(() => {
      props.navigation.setOptions({
         title: props.route.params.title,
      });
   });
   return (
      <>
         <View style={styles.screen}>
            <View
               style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  paddingRight: 15,
                  // marginBottom: 10,
               }}
            >
               <Text style={{ color: Colors.textSecondary }}>Qty</Text>
            </View>
            <ShopkeeperProductView
               product="Product 1"
               quantity={10}
               isGiven={true}
            />
            <ShopkeeperProductView
               product="Product 2"
               quantity={4}
               isGiven={false}
            />
            <ShopkeeperProductView
               product="Product 3"
               quantity={2}
               isGiven={false}
            />
         </View>
         <View
            style={{
               width: "100%",
               position: "absolute",
               bottom: 0,
               justifyContent: "center",
               backgroundColor: Colors.headerBgColor,
            }}
         >
            <TouchableOpacity
               onPress={() => {
                  Alert.alert(
                     "Confirmation",
                     "Few products are remaining. Do you want to still continue?",
                     [
                        { text: "Cancel", style: "cancel" },
                        {
                           text: "Continue",
                           onPress: () => props.navigation.goBack(),
                        },
                     ]
                  );
               }}
               style={{
                  width: "100%",
                  height: "100%",
                  paddingVertical: 15,
                  alignItems: "center",
               }}
               activeOpacity={0.5}
            >
               <Text
                  style={{
                     color: Colors.headerTitle,
                     fontSize: 18,
                     fontWeight: "bold",
                  }}
               >
                  Done
               </Text>
            </TouchableOpacity>
            {/* <Modal
               animationType="fade"
               transparent={true}
               visible={isModalVisible}
               onRequestClose={() => {
                  setIsModalVisible(!isModalVisible);
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
                              Header
                           </Text>
                        </View>
                        <TouchableOpacity
                           activeOpacity={0.3}
                           onPress={() => setIsModalVisible(false)}
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
                        <TouchableOpacity
                           activeOpacity={0.5}
                           onPress={async () => {
                              setEnteredValue("");
                           }}
                           style={styles.button}
                        >
                           <Text
                              style={{
                                 color: Colors.textPrimary,
                                 fontWeight: "bold",
                              }}
                           >
                              Button Name
                           </Text>
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>
            </Modal> */}
         </View>
      </>
   );
};

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: Colors.backgroundColor,
   },
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
   button: { marginVertical: 5 },
});

export default customerListScreen;
