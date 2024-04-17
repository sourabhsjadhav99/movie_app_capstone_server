// const mongoose = require('mongoose');
// const mediaSchema = mongoose.Schema({
//     mediaId: { type: String, unique:true },
//     mediaType: { type: String, require:true },

// });

// module.exports = mongoose.model("Media", mediaSchema);


// Import Mongoose
const mongoose = require('mongoose');

// Define a schema for the movie data
const mediaSchema = new mongoose.Schema({
    adult: { type: Boolean },
    backdrop_path: { type: String },
    genre_ids: [{ type: Number }],
    id: { type: Number },
    original_language: { type: String },
    original_title: { type: String },
    overview: { type: String },
    popularity: { type: Number },
    poster_path: { type: String },
    release_date: { type: Date },
    title: { type: String },
    video: { type: Boolean },
    vote_average: { type: Number },
    vote_count: { type: Number },
    mediaType: { type: String },
    status: { type: String },
    runtime: { type: Number },
    tagline: { type: String },
    director: { type: Array },
    writer: { type: Array },
    cast: { type: Array },
});

// Create a Mongoose model for the movie data
module.exports = mongoose.model('Media', mediaSchema);
