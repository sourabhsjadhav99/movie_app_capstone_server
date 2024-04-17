

let dotenv=require('dotenv')
dotenv.config()
const express = require("express");
let cors = require("cors")
const app = express();
require("./src/config/config");
app.use(cors())
const port = process.env.PORT || 5000
let userRoute= require("./src/routes/userRoute")



app.use("/user", userRoute)


app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));

