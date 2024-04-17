const mongoose = require('mongoose');
let Media = require("../models/mediaModel");
let User = require('../models/userModel');


const postMedia = async (req, res) => {
    try {
        const { id, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the media exists based on mediaId
        let existingMedia = await Media.findOne({ id });

        if (!existingMedia) {
            // Media doesn't exist, create a new media object
            const newMedia = await Media.create(req.body);

            // Associate the new media with the user
            await User.updateOne(
                { email },
                { $push: { movies: newMedia._id } },
                { upsert: false, new: true } // Combined options into a single object
            );
            res.status(201).json({
                message: "Bookmarked successfully",
            });
        } else {
            if (!user.movies.includes(existingMedia._id)) {
                // Associate the existing media with the user
                await User.updateOne(
                    { email },
                    { $push: { movies: existingMedia._id } },
                    { upsert: false, new: true } // Combined options into a single object
                );
                res.status(201).json({
                    message: "Bookmarked successfully!",
                });
            }else{
                res.status(201).json({
                    message: "Already Bookmarked!",
                });
            }
        }


    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Failed",
            message: error.message,
        });
    }
};



const deleteMedia = async (req, res) => {
    try {
        // Assuming req.params.id contains the ID of the media to be deleted
        const mediaId = req.params.id;

        // Delete the media by its ID
        const deletedMedia = await Media.findByIdAndDelete(mediaId);
        console.log(deleteMedia)

        if (!deletedMedia) {
            return res.status(404).json({ message: "Media not found" });
        }

        // Remove the media ID from the user's movies array
        await User.updateOne(
            { email: req.body.email },
            { $pull: { movies: deletedMedia._id } }
        );

        res.status(200).json({ message: "Media deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: "Failed", message: error.message });
    }
};




module.exports = { postMedia, deleteMedia };