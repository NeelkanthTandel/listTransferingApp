import React, { useState, useEffect } from "react";
import {
   StyleSheet,
   View,
   Text,
   TouchableOpacity,
   ToastAndroid,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import Colors from "../../theme/colors";
import MyList from "./MyList";
import PlusButton from "../../components/PlusButton";
import { Ionicons } from "@expo/vector-icons";

const homeScreen = (props) => {
   const [selected, setSelected] = useState(false);
   const [isSelectAll, setIsSelectAll] = useState(-1);
   const isFocused = useIsFocused();
   useEffect(() => {
      console.log(props.route.params?.isDone);
      if (props.route.params?.isDone && isFocused) {
         console.log("Done");
         ToastAndroid.show(
            "Done with " + props.route.params.listName,
            ToastAndroid.SHORT
         );
         props.navigation.setParams({ isDone: false, listName: "" });
      }
   }, [isFocused]);
   useEffect(() => {
      if (selected) {
         props.navigation.setOptions({
            title: "",
            headerStyle: {
               backgroundColor: Colors.secondary,
            },
            headerLeft: () => (
               <TouchableOpacity onPress={() => setIsSelectAll(0)}>
                  <Ionicons
                     name="close-sharp"
                     size={23}
                     color={Colors.headerTitle}
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
            headerStyle: {
               backgroundColor: Colors.headerBgColor,
            },
            headerLeft: () => (
               <TouchableOpacity
                  onPress={() => props.navigation.toggleDrawer()}
               >
                  <Ionicons
                     name="ios-menu"
                     size={25}
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
         <Text style={styles.title}>My List</Text>
         <Text
            style={{
               fontSize: 12,
               color: Colors.textSecondary,
               marginBottom: 20,
            }}
         >
            Tap on list to open
         </Text>

         <MyList
            style={styles.myList}
            setSelected={setSelected}
            setIsSelectAll={setIsSelectAll}
            selected={selected}
            isSelectAll={isSelectAll}
            title="List 1"
            navigation={props.navigation}
         />
         <MyList
            style={styles.myList}
            setSelected={setSelected}
            setIsSelectAll={setIsSelectAll}
            selected={selected}
            isSelectAll={isSelectAll}
            title="List 2"
            navigation={props.navigation}
         />
         <MyList
            style={styles.myList}
            setSelected={setSelected}
            setIsSelectAll={setIsSelectAll}
            selected={selected}
            isSelectAll={isSelectAll}
            title="List 3"
            navigation={props.navigation}
         />
         <MyList
            style={styles.myList}
            setSelected={setSelected}
            setIsSelectAll={setIsSelectAll}
            selected={selected}
            isSelectAll={isSelectAll}
            title="List 2"
            navigation={props.navigation}
         />
         <PlusButton
            onPress={
               () => {}
               // props.navigation.navigate("addProducts", {
               //    currentList,
               //    list_id: props.route.params._id,
               //    token: props.route.params.token,
               // })
            }
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
   },
   myList: {
      marginBottom: 20,
      // backgroundColor: Colors.selected,
   },
});

export default homeScreen;
