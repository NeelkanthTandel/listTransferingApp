import React from "react";
import {
   StyleSheet,
   Text,
   View,
   TouchableOpacity,
   TextInput,
} from "react-native";

const chooseTypeScreen = (props) => {
   return (
      <View style={styles.screen}>
         <View
            style={{
               borderBottomColor: "black",
               borderBottomWidth: 1,
               width: "100%",
               paddingVertical: 10,
               //  paddingTop: 150,
            }}
         >
            <Text style={styles.Text}>Last Step</Text>
         </View>
         <Text style={styles.TypeText}>Choose Account Type</Text>

         <TouchableOpacity style={styles.customerButton}>
            <Text style={styles.ButtonText}>Customer</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.shopkeeperButton} onPress={inputName}>
            <Text style={styles.ButtonText}>Shopkeeper</Text>
         </TouchableOpacity>
      </View>
   );
};
const inputName = () => {
   <View>
      <TouchableOpacity style={styles.InputName}>
         <TextInput>Shop Name</TextInput>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Finish}>
         <Text>Finish</Text>
      </TouchableOpacity>
   </View>;
};

const styles = StyleSheet.create({
   screen: {
      padding: 1,
      flex: 1,
      backgroundColor: "#e8f0f2",
      alignItems: "center",
      // justifyContent: "center",
   },
   Text: {
      fontSize: 18,
      textAlign: "center",
   },
   TypeText: {
      paddingTop: 50,
      fontSize: 23,
      textAlign: "center",
      paddingBottom: 20,
   },
   customerButton: {
      // paddingBottom: 60,
      height: 150,
      width: 130,
      borderRadius: 15,
      backgroundColor: "#a2dbf4",
      alignSelf: "center",
      justifyContent: "space-between",
   },
   shopkeeperButton: {
      // padditingTop:10,
      height: 150,
      width: 130,
      borderRadius: 15,
      backgroundColor: "#a2dbf4",
      alignSelf: "center",
      justifyContent: "space-between",
   },
   InputName: {
      height: 50,
      width: 250,
      borderRadius: 15,
      backgroundColor: "#a2dbf4",
   },
   ButtonText: {
      paddingTop: 110,
      fontSize: 18,
      textAlign: "center",
   },
   InputName: {
      height: 30,
      width: 300,
      borderRadius: 15,
      backgroundColor: "#a2dbf4",
   },
   Finish: {
      height: 30,
      width: 300,
      borderRadius: 15,
      backgroundColor: "#a2dbf4",
   },
});

export default chooseTypeScreen;
