import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function scannerScreen() {
   const [hasPermission, setHasPermission] = useState(null);
   const [scanned, setScanned] = useState(false);

   useState(() => {
      (async () => {
         const { status } = await BarCodeScanner.requestPermissionsAsync();
         setHasPermission(status === "granted");
      })();
   }, []);

   const handleBarCodeScanned = ({ type, data }) => {
      setScanned(true);
      alert(data);
   };

   if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
   }
   if (hasPermission === false) {
      return <Text>No access to camera</Text>;
   }

   return (
      <View style={styles.container}>
         <Text style={styles.Text}> Scan QR Code of Shop</Text>
         <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={styles.absoluteFillObject}
         />
         {scanned && (
            <TouchableOpacity
               title={"Tap to Scan Again"}
               onPress={() => setScanned(false)}
               style={styles.button}
            />
         )}
      </View>
   );
}
const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#E8F0F2",
      alignItems: "center",
      justifyContent: "center",
   },
   Text: {
      textAlign: "center",
      fontSize: 18,
   },
   absoluteFillObject: {
      margin: 100,
      height: 350,
      width: 350,
   },
   button: {
      borderRadius: 15,
      color: "white",
      backgroundColor: "#E8F0F2",
   },
});
