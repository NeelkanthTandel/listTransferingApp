import { API_URL } from "../keys";
import { ToastAndroid } from "react-native";

const shareList = async (
   shop_id,
   token,
   products,
   customer_name,
   list_name
) => {
   console.log("shop id:", shop_id);
   console.log("Token:", products);
   try {
      const response = await fetch(`${API_URL}/shareList`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
         },
         body: JSON.stringify({
            shop_id,
            products,
            customer_name, //need to be changed
            list_name,
         }),
      });
      const data = await response.json();
      console.log("share: ", data);
      if (data) {
         ToastAndroid.show("List shared successfully", ToastAndroid.SHORT);
      }
   } catch (err) {
      console.log("share list error: ", err.message);
   }
};

export default shareList;
