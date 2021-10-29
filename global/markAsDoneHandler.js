import { ToastAndroid } from "react-native";
import { API_URL } from "../keys";

const markAsDoneHandler = async (customerName, _id, token) => {
   try {
      const response = await fetch(`${API_URL}/markDoneShopkeeperList`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
         },
         body: JSON.stringify({
            _id: _id,
         }),
      });
      const data = await response.json();
      console.log("mark done: ", data);
      if (!data.error) {
         console.log("Marked Done: ", _id);
         ToastAndroid.show("Done with " + customerName, ToastAndroid.SHORT);
      }
   } catch (err) {
      console.log("Mark Done: ", err);
   }
};
export default markAsDoneHandler;
