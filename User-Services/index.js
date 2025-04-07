require("dotenv").config()
require("./Config/db")
const cors = require("cors");

const express = require("express");
const app = express();
PORT = 3001;
app.use(express.json())
app.use(cors());
const {Router} = require("./routes/index")

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
  ];

  app.use("/api",Router)

  

  app.listen(PORT, () => {
    console.log(`User Service listening at http://localhost:${PORT}`);
  });




