const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { jwtkey } = require("../keys");
const requireToken = require("../middleware/requireToken");
const router = express.Router();
const customer_detail = mongoose.model("customer_detail");
const shopkeeper_detail = mongoose.model("shopkeeper_detail");
const customer_list = mongoose.model("customer_list");
const shopkeeper_list = mongoose.model("shopkeeper_list");
const product = mongoose.model("product");
const productCategories = mongoose.model("productCategories");

router.post("/signIn", async (req, res) => {
   const { email } = req.body; // ==> const Name = req.body.email;
   if (!email) {
      return res.status(422).send({ error: "must provide email or password" });
   }
   const customer = await customer_detail.findOne({ email });

   if (!customer) {
      const shopkeeper = await shopkeeper_detail.findOne({ email });

      if (!shopkeeper) {
         return res.send({ registered: false });
      }

      const token = jwt.sign({ userId: shopkeeper._id }, jwtkey);

      return res.send({
         token,
         registered: true,
         isShopkeeper: true,
         shopName: shopkeeper.shop_name,
         shop_id: shopkeeper._id,
      });
   }

   const token = jwt.sign({ userId: customer._id }, jwtkey);
   res.send({ token, registered: true, isShopkeeper: false });
});

//shopkeeper's module api

router.post("/shopkeeperSignUp", async (req, res) => {
   const { email, name, shop_name } = req.body;
   // const signUp = async (email, res) => {
   try {
      const user = new shopkeeper_detail({ email, name, shop_name });
      await user.save();
      const token = jwt.sign({ userId: user._id }, jwtkey);
      res.send({ token });
   } catch (err) {
      return res.status(422).send(err.message);
   }
   // };
});

router.get("/fetchShopkeeperList", requireToken, async (req, res) => {
   const shopkeeper_id = req.user._id;
   try {
      const list = await shopkeeper_list.find({ shop_id: shopkeeper_id });
      console.log("shopkeeper list:", list);
      res.send(list);
   } catch (err) {
      return res.status(422).send(err.message);
   }
});

router.post("/updateShopkeeperList", requireToken, async (req, res) => {
   const { _id, products } = req.body;
   // console.log(products);
   try {
      const list = await shopkeeper_list.updateOne(
         { _id },
         { $set: { products } }
      );
      res.send({ error: false });
   } catch (err) {
      return res.status(422).send(err.message);
   }
});

router.post("/markDoneShopkeeperList", requireToken, async (req, res) => {
   const { _id } = req.body;
   // console.log(products);
   try {
      const list = await shopkeeper_list.updateOne(
         { _id },
         { $set: { is_done: true, date: new Date() } }
      );
      res.send({ error: false });
   } catch (err) {
      return res.status(422).send(err.message);
   }
});

router.post("/deleteShopkeeperList", requireToken, async (req, res) => {
   // const customer_id = req.user._id;
   const { _id } = req.body;
   try {
      const result = await shopkeeper_list.deleteOne({ _id });
      return res.send(result);
   } catch (err) {
      console.log(err.message);
      return res.send("error");
   }
});

//customer's module api

router.post("/customerSignUp", async (req, res) => {
   const { email, name } = req.body;
   // const signUp = async (email, res) => {
   try {
      const user = new customer_detail({ email, name });
      await user.save();
      const token = jwt.sign({ userId: user._id }, jwtkey);
      res.send({ token });
   } catch (err) {
      return res.status(422).send(err.message);
   }
   // };
});

// router.post("/upload", async (req, res) => {
//    const { email, imageUrlFront, imageUrlBack } = req.body;
//    if (!imageUrlFront || !imageUrlBack) {
//       return res.status(422).send({ error: "Upload Image" });
//    }
//    if (!email) {
//       return res.status(422).send({ error: "Authenticate First" });
//    }

//    try {
//       console.log("Try");
//       // await User.updateOne({ email }, { imageUrlFront }, { imageUrlBack });
//       const user = await User.findOne({ email: email });
//       user.imageUrlFront = imageUrlFront;
//       user.imageUrlBack = imageUrlBack;
//       console.log(user);
//       res.send({ uploaded: false });
//    } catch {
//       res.send({ uploaded: false });
//    }
// });

router.post("/createCustomerList", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   const { list_name } = req.body;
   // const signUp = async (email, res) => {
   try {
      const list = new customer_list({ list_name, customer_id });
      await list.save();
      res.send(list._id);
   } catch (err) {
      return res.status(422).send(err.message);
   }
   // };
});

router.post("/updateCustomerList", requireToken, async (req, res) => {
   const { _id, products } = req.body;
   // console.log(products);
   try {
      const list = await customer_list.findOneAndUpdate(
         { _id },
         { $push: { products } }
      );
      res.send(list._id);
   } catch (err) {
      return res.status(422).send(err.message);
   }
});

router.get("/fetchCustomerLists", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   try {
      const list = await customer_list.find({ customer_id });
      // console.log("list:", list);
      res.send(list);
   } catch (err) {
      return res.status(422).send(err.message);
   }
});

router.get("/fetchCustomerHistory", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   try {
      const list = await shopkeeper_list.find({ customer_id });
      // console.log("history list:", list);
      res.send(list);
   } catch (err) {
      return res.status(422).send(err.message);
   }
});

router.post("/fetchList", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   const { _id } = req.body;
   try {
      const list = await customer_list.findOne({ _id, customer_id });
      // console.log("single list:", list);
      res.send(list);
   } catch (err) {
      return res.status(422).send(err.message);
   }
}); // to fetch single list by list id

router.post("/deleteCustomerList", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   const { _id } = req.body;
   try {
      const result = await customer_list.deleteOne({ _id, customer_id });
      return res.send(result);
   } catch (err) {
      console.log(err.message);
      return res.send("error");
   }
});

router.post("/renameCustomerList", requireToken, async (req, res) => {
   const { _id, list_name } = req.body;
   const customer_id = req.user.id;
   // console.log(products);
   try {
      const list = await customer_list.updateOne(
         { _id, customer_id },
         { $set: { list_name } }
      );
      res.send({ error: false });
   } catch (err) {
      return res.status(422).send(err.message);
   }
});

router.post("/fetchProduct", async (req, res) => {
   const { ids } = req.body;
   try {
      const prod = await product
         .find({
            _id: { $in: ids },
         })
         .sort({ name: 1 });
      res.send(prod);
   } catch (err) {
      console.log(err.message);
   }
});

router.get("/fetchPopularProduct", async (req, res) => {
   try {
      const prod = await product.find({ popular: true });
      res.send(prod);
   } catch (err) {
      console.log(err.message);
   }
});

router.get("/fetchSavedProduct", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   try {
      const prod = await product.find({ customer_id });
      res.send(prod);
   } catch (err) {
      console.log(err.message);
   }
});

// router.get("/fetchCategoryProduct", requireToken, async (req, res) => {
//    const {}
//    try {
//       const prod = await product.find({ customer_id });
//       res.send(prod);
//    } catch (err) {
//       console.log(err.message);
//    }
// });

router.get("/fetchCategories", async (req, res) => {
   try {
      const prod = await productCategories.find();
      res.send(prod);
   } catch (err) {
      console.log(err.message);
   }
});

router.get("/fetchProducts", async (req, res) => {
   try {
      const prod = await product.find();
      console.log("products: ", prod);
      res.send(prod);
   } catch (err) {
      console.log(err.message);
   }
});

router.post("/deleteProduct", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   const { product_id, list_id } = req.body;
   try {
      const result = await customer_list.findOne({ _id: list_id, customer_id });
      const index = result.products.indexOf(
         result.products.find((data) => data.product_id === product_id)
      );
      if (index < 0) {
         return res.send("error");
      }
      result.products.splice(index, 1);
      await customer_list.replaceOne({ _id: list_id, customer_id }, result);
      return res.send({ deleted: true });
   } catch (err) {
      console.log(err.message);
      return res.send("error");
   }
});

router.post("/shareList", requireToken, async (req, res) => {
   const customer_id = req.user._id;
   const { shop_id, products, customer_name, list_name } = req.body;
   let shop_name = "";
   try {
      const user = await shopkeeper_detail.findOne({ _id: shop_id });
      // console.log(user);
      shop_name = user.shop_name;
   } catch (err) {
      console.log(err);
      return res.send("err");
   }

   try {
      const list = new shopkeeper_list({
         shop_id,
         shop_name,
         customer_id,
         products,
         customer_name,
         list_name,
      });
      await list.save();
      return res.send(list._id);
   } catch (err) {
      console.log("share list error: ", err.message);
      return res.send("error");
   }
});

router.get("/trial", async (req, res) => {
   try {
      const user = await customer_detail.findOne({
         email: "neelkanth@gmail.com",
      });
      console.log(user);
      res.send(user);
   } catch (err) {
      console.log(err);
      res.send("err");
   }
});

module.exports = router;
