const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
const { mogoUrl } = require("./keys");

require("./models/User");
const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes");
app.use(bodyParser.json());

app.use(authRoutes);

mongoose.connect(mogoUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   // useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
   console.log("connected to mongo yeahh");
});

mongoose.connection.on("error", (err) => {
   console.log("this is error", err);
});

app.get("/", requireToken, (req, res) => {
   console.log("get/");
   res.send({ email: req.user._id });
   // res.send("Hello");
});

app.listen(PORT, '0.0.0.0', () => {
   console.log("server running " + PORT);
});
