const mongoose = require("mongoose");
const customerUserSchema = new mongoose.Schema({
   email: {
      type: String,
      unique: true,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   history: [
      {
         list_id: String,
         shop_name: String,
         date: { type: Date, default: Date.now },
      },
   ],
});

const customerListSchema = new mongoose.Schema({
   list_name: {
      type: String,
      required: true,
   },
   customer_id: {
      type: String,
      required: true,
   },
   products: [
      {
         _id: false,
         product_id: {
            type: String,
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
         },
      },
   ],
});

const shopkeeperUserSchema = new mongoose.Schema({
   email: {
      type: String,
      unique: true,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   shop_name: {
      type: String,
      required: true,
   },
});

const shopkeeperListSchema = new mongoose.Schema({
   shop_id: {
      type: String,
      required: true,
   },
   shop_name: {
      type: String,
      required: true,
   },
   customer_id: {
      type: String,
      required: true,
   },
   customer_name: {
      type: String,
      required: true,
   },
   list_name: {
      type: String,
      required: true,
   },
   is_done: {
      //if true, need to fetch that list in history and else in homeScreen
      type: Boolean,
      default: false,
   },
   date: {
      type: Date,
   },
   products: [
      {
         _id: false,
         product_id: {
            type: String,
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
         },
         is_given: {
            type: Boolean,
            default: false,
         },
      },
   ],
});

const productSchema = new mongoose.Schema({
   name: String,
   popular: Boolean,
});

mongoose.model("customer_list", customerListSchema);
mongoose.model("shopkeeper_list", shopkeeperListSchema);
mongoose.model("shopkeeper_detail", shopkeeperUserSchema);
mongoose.model("customer_detail", customerUserSchema);
mongoose.model("product", productSchema);
