import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
   StyleSheet,
   Text,
   View,
   ScrollView,
   ToastAndroid,
   TouchableOpacity,
   Button,
   Alert,
   Dimensions,
} from "react-native";

import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import QRCode from "react-native-qrcode-svg";
import Colors from "../../theme/colors";

const screenWidth = Dimensions.get("screen").width;

export default function qrGeneratorScreen() {
   const [svg, setSvg] = useState();
   const [imageSaved, setImageSaved] = useState();

   const saveImage = async () => {
      if (svg != null && !imageSaved) {
         await MediaLibrary.requestPermissionsAsync(MediaLibrary.CameraRoll);
         svg.toDataURL((data) => {
            console.log("base64:", data);
            console.log("inner:", FileSystem.cacheDirectory);
            FileSystem.writeAsStringAsync(
               FileSystem.cacheDirectory + "/shopQrCode.png",
               data,
               { encoding: FileSystem.EncodingType.Base64 }
            )
               .then((success) => {
                  console.log("inner:", FileSystem.cacheDirectory);
                  return MediaLibrary.saveToLibraryAsync(
                     FileSystem.cacheDirectory + "/shopQrCode.png"
                  );
               })
               .then(() => {
                  setImageSaved(true);
                  ToastAndroid.show("Saved to gallery !!", ToastAndroid.SHORT);
               })
               .catch((err) => console.log(err));
         });
      } else if (imageSaved) {
         ToastAndroid.show("Already Saved!", ToastAndroid.SHORT);
      }
   };

   return (
      <>
         <View style={styles.screen}>
            <Text style={styles.note}>
               Note: This QR will not be changed, and can be used forever once
               printed
            </Text>
            <View style={styles.qr}>
               <QRCode
                  value="Neelkanth Tandel"
                  size={screenWidth - 100}
                  getRef={(c) => setSvg(c)}
               />
            </View>
         </View>
         <TouchableOpacity onPress={saveImage} style={styles.saveButton}>
            <Text style={styles.saveText}>Save Image</Text>
         </TouchableOpacity>
      </>
   );
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      backgroundColor: Colors.backgroundColor,
      alignItems: "center",
      paddingTop: 30,
      paddingHorizontal: 20,
   },
   note: {
      fontSize: 16,
      textAlign: "center",
   },
   qr: {
      marginTop: 20,
   },
   saveButton: {
      width: "100%",
      backgroundColor: Colors.headerBgColor,
      justifyContent: "center",
      alignItems: "center",
      // position: "absolute",
      bottom: 0,
      paddingVertical: 15,
   },
   saveText: {
      fontSize: 16,
      fontWeight: "bold",
      color: Colors.headerTitle,
   },
});
