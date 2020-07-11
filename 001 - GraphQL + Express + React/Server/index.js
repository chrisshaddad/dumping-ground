require('dotenv').config();

const express = require('express')
const app = express()
const port = process.env.PORT

app.get("/", (req, res) => res.send("Soon to be graphql server"))

app.listen(port)