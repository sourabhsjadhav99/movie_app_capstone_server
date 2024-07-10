const mongoose = require("mongoose");

// Retrieving the MongoDB connection URL from environment variables
let url = process.env.MONGO_URL

// Connecting to the MongoDB database using the provided URL
mongoose
  .connect(url)
  .then(() => {   // If the connection is successful
    console.log("Connected to the database "); 
  })
  .catch((err) => { // If an error occurs
    console.log(`Error connecting to the database. n${err}`);
  });