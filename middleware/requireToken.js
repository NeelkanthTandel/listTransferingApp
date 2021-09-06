const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const customerUser = mongoose.model("customer_detail");
const shopkeeperUser = mongoose.model("shopkeeper_detail");
const { jwtkey } = require("../keys");

module.exports = (req, res, next) => {
   console.log("in require token");
   const { authorization } = req.headers;
   //authorization === Bearer sfafsafa
   if (!authorization) {
      return res.status(401).send({ error: "you must be logged in" });
   }
   const token = authorization.replace("Bearer ", "");
   jwt.verify(token, jwtkey, async (err, payload) => {
      if (err) {
         return res.status(401).send({ error: "you must be logged in 2" });
      }
      const { userId } = payload;
      console.log(userId);
      const customer = await customerUser.findById(userId);
      // console.log(customer);
      if (!customer) {
         const shopkeeper = await shopkeeperUser.findById(userId);
         // console.log("shopkeeper:", shopkeeper);
         if (!shopkeeper) {
            return res.status(401).send({ error: "Account must be deleted" });
         }
         req.user = shopkeeper;
      } else req.user = customer;
      next();
   });
};
