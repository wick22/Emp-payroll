const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 3000;
const postrouter = require("./routes/postroute");
const emprouter = require("./routes/emproute");
const cors = require("cors");
app.use(cors());
app.use(bodyparser.json());
app.use("/admins", postrouter);
app.use("/employees", emprouter);
app.listen(port, () => {
  console.log("Serving!!");
});
