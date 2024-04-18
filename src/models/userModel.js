const mongoose = require('mongoose');
const { Schema } = require('mongoose');

// Define a schema for the user data
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Media' }] 
});


// Create a Mongoose model for the user data
module.exports = mongoose.model('User', userSchema);
