const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.SECRET

const User = require('../models/userModel');
let Media = require("../models/mediaModel");

const getUserByUsername = async (req, res) => {
  try {
    const { email } = req.params; // Assuming email is part of the request parameters

    // Find the user by email
    const user = await User.findOne({ email }).populate({ path: "movies", model: "Media" })
    let { movies } = user
    let tv = movies?.filter((m) => m.mediaType === "tv")
    let movie = movies?.filter((m) => m.mediaType === "movie")

    if (!user) {
      return res.status(404).json({
        status: "Failed",
        message: "User not found",
      });
    }

    // Return the user data in the response
    res.status(200).json({ tv, movie });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      message: "Internal server error",
      error: error.message,
    });
  }
};

const registerUser = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase()

    // Check if the username or email already exists in the database
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists, Sign in!' });
    }

    // Hash the password with bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance with hashed password
    const newUser = new User({
      email: email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: 'Registration successful, now you can login!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


let loginUser = async (req, res) => {
  try {
    let { email } = req.body;
    email = email.toLowerCase()
    const user = await User.findOne({ email: email })
    // const user = await User.findOne({ email: email }).populate({ path: "movies", model: "Media" })
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(201).json({ "token": token, "message": "Successufully logged in!", data: {useremail: user.email } });
    } else {
      res.status(401).send({ message: 'Invalid password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the route includes the user's ID as a parameter

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete related movies
    await Media.deleteMany({ _id: { $in: user.movies } });

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Failed to delete user' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};



module.exports = { registerUser, loginUser, getUserByUsername, deleteUser };
