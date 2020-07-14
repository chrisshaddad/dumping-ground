require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const port = process.env.PORT;

app.get("/", (req, res) =>
  res.send("Soon to be graphql server, also used for mock login")
);

app.post("/users/login", (req, res) => {
  //should handle loging in here
  console.log("Pretending to login...");
  setTimeout(() => {
    res.send({
      success: true,
    })
    console.log("Pretended to login");
  }, 3200);
});

app.listen(port);
