const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:true },
  password: { type: String, required: true },
  movies: [{ type: Schema.Types.ObjectId, ref: 'Media' }] 
});

module.exports = mongoose.model('User', userSchema);
