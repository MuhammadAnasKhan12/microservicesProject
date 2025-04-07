require("dotenv").config()
require("./Config/db")
const express = require("express");
const cors = require("cors");
PORT = 3003 

const app = express();
app.use(express.json());
app.use(cors());
const {Router} = require("./routes")


app.use("/api",Router)



app.listen(PORT, () => {
    console.log(`Payment Service listening at http://localhost:${PORT}`);
  });