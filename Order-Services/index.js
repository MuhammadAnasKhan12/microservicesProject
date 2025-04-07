require("dotenv").config()
require("./config/db")
const express = require("express");
const app = express();
PORT = 3002
const cors = require("cors");
app.use(express.json());

const {Router} = require("./routes/index")

const orders = [
    { id: 1, userId: 1, total: 100 },
    { id: 2, userId: 2, total: 200 }
  ];

app.use("/api",Router)


app.listen(PORT, () => {
    console.log(`Order Service listening at http://localhost:${PORT}`);
  });
