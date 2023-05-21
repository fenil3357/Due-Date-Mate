const express = require("express");
const app = express();
const router = express.Router();
const { checkToken } = require("./src/middleware/token_validation")

require("dotenv").config();

var path = require("path");

const bodyParser = require("body-parser");
const cors = require("cors");

var https = require("https");
var fs = require("fs");

const connectDB = require('./config/db.config');

const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(checkToken)

const files = require("./route");
files(router);
app.use("/api", router);

const start = async () => {
  try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, console.log(`Server is listening on port ${port}...`))
  } catch (error) {
      console.log(error)
  }
}
start()