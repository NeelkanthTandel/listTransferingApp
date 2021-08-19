import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import Colors from "../../theme/colors";
import AvailableCustomer from "../../components/AvailableCustomer";
import { Ionicons } from "@expo/vector-icons";

const home = (props) => {
   const [selected, setSelected] = useState(false);
   const [isSelectAll, setIsSelectAll] = useState(-1);
   useEffect(() => {
      if (selected) {
         props.navigation.setOptions({
            title: "",
            headerLeft: () => (
               <TouchableOpacity onPress={() => setIsSelectAll(0)}>
                  <Ionicons
                     name="close-sharp"
                     size={23}
                     color={Colors.headerTitle}
                     style={{ marginLeft: 15 }}
                  />
               </TouchableOpacity>
            ),
            headerRight: () => (
               <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity onPress={() => {}}>
                     <Text
                        style={{
                           fontSize: 16,
                           color: Colors.headerTitle,
                           marginRight: 20,
                        }}
                     >
                        Delete
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setIsSelectAll(1)}>
                     <Text
                        style={{
                           fontSize: 16,
                           color: Colors.headerTitle,
                           marginRight: 20,
                        }}
                     >
                        Select All
                     </Text>
                  </TouchableOpacity>
               </View>
            ),
         });
      } else {
         props.navigation.setOptions({
            title: "App Name",
            headerLeft: () => (
               <TouchableOpacity
                  onPress={() => props.navigation.toggleDrawer()}
               >
                  <Ionicons
                     name="ios-menu"
                     size={23}
                     color={Colors.headerTitle}
                     style={{ marginRight: 15 }}
                  />
               </TouchableOpacity>
            ),
            headerRight: () => {},
         });
      }
   }, [selected]);
   return (
      <View style={styles.screen}>
         <Text style={styles.title}>Available Customer</Text>

         <AvailableCustomer
            style={styles.availableCustomer}
            setSelected={setSelected}
            setIsSelectAll={setIsSelectAll}
            selected={selected}
            isSelectAll={isSelectAll}
            title="Customer 1"
         />
         <AvailableCustomer
            style={styles.availableCustomer}
            setSelected={setSelected}
            setIsSelectAll={setIsSelectAll}
            selected={selected}
            isSelectAll={isSelectAll}
            title="Customer 2"
         />
         <AvailableCustomer
            style={styles.availableCustomer}
            setSelected={setSelected}
            setIsSelectAll={setIsSelectAll}
            selected={selected}
            isSelectAll={isSelectAll}
            title="Customer 3"
         />
      </View>
   );
};

// home.navigationOptions = (navigationData)

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      paddingVertical: 30,
      paddingHorizontal: 20,
      backgroundColor: Colors.backgroundColor,
   },
   title: {
      fontSize: 18,
      color: Colors.textPrimary,
      fontWeight: "bold",
      marginBottom: 30,
   },
   availableCustomer: {
      marginBottom: 20,
      // backgroundColor: Colors.selected,
   },
});

export default home;
