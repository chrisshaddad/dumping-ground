require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

app.post("/users/login", (req, res) => {
  //should handle logging in here
  console.log("Pretending to login...");
  console.log("username: " + req.body.username);
  console.log("password: " + req.body.password);
  setTimeout(() => {
    res.send({
      success: true,
    })
    console.log("Pretended to login");
  }, 3200);
});

app.listen(port);
