const express = require("express");

// Importing dotenv to load environment variables from a .env file
let dotenv=require('dotenv')
dotenv.config()

// Including configuration files and enabling CORS
let cors = require("cors")
require("./src/config/config");

const app = express();
app.use(express.json());

app.use(cors())
const port = process.env.PORT || 5000
let userRoute= require("./src/routes/userRoute")
let mediaRoute= require("./src/routes/mediaRoute")


// Setting up routes for user and media endpoints
app.use("/api/user", userRoute)
app.use("/api/media", mediaRoute)

app.listen(port, () => console.log(`App listening on http://localhost:${port}!`));



