const express = require('express')
require('dotenv').config();
const cors = require("cors")
require('./db/config')
const app = express()
app.use(express.json())
app.use(cors({
  credentials: true,
  origin: "",
  allowedHeaders: ["Content-Type", "Authorization", "other-header"]
}));

const user = require('./_routes/user');
const product = require('./_routes/product');

app.use("/api/user", user);
app.use("/api", product);

app.listen(5000)
