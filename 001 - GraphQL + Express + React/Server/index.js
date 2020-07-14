require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

app.get("/", (req, res) =>
  res.send("Soon to be graphql server, also used for mock login")
);

app.post("/users/login", (req, res) => console.log("login was called"));

app.listen(port);
