

let dotenv=require('dotenv')
dotenv.config()
const express = require("express");
const app = express();
require("./src/config/config");

const port = process.env.PORT || 5000


app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));

