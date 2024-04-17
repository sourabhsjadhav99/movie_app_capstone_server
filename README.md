### Media Management API
This API provides endpoints for managing media items such as movies and TV shows, as well as user authentication and registration functionalities.

### Technologies Used
Node.js
Express.js
MongoDB
Mongoose
JSON Web Tokens (JWT) for authentication
bcrypt for password hashing
dotenv for environment variables
cors for cross-origin resource sharing
Getting Started
Clone the repository:


### git clone https://github.com/sourabhsjadhav99/movie_app_capstone_server.git

### Install dependencies:
cd media-management-api
npm install

### Set up environment variables:
Create a .env file in the root directory and add the following variables:
PORT=5000
MONGO_URL=mongodb://localhost:27017/your-database-name
SECRET=your_jwt_secret_key

### Start the server:
npm start

### API Endpoints
User Routes
POST /user/register: Register a new user.
POST /user/login: Log in an existing user.
GET /user/getuser/:email: Get user details by email.
DELETE /user/delete/:id: Delete a user by ID.

### Media Routes
POST /media/addmedia: Add a new media item (movie or TV show).
DELETE /media/delete/:id: Delete a media item by ID.

### Authentication
Middleware jwtAuth is used to authenticate API requests using JSON Web Tokens.

### Models
User Model
email: String (required, unique)
password: String (required)
movies: Array of MongoDB ObjectIDs referencing Media model

### Media Model
adult: Boolean
backdrop_path: String
genre_ids: Array of Numbers
id: Number
original_language: String
original_title: String
overview: String
popularity: Number
poster_path: String
release_date: Date
title: String
video: Boolean
vote_average: Number
vote_count: Number
mediaType: String
status: String
runtime: Number
tagline: String
director: Array of Strings
writer: Array of Strings
cast: Array of Strings

### Database Setup
Ensure MongoDB is installed and running on your system.
Update the MONGO_URL variable in the .env file with your MongoDB connection string.