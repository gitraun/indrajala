const profile = require('../models/profileSchema');
const user = require('../models/userSchema');
const mongoose = require('mongoose');

exports.getProfile = async (req, res)=>{
    try {
        const userId = req.payload;
        // console.log(userId);
        const userProfile = await profile.findOne({userId: userId});
        if(!userProfile){
            return res.status(404).json("Profile not found");
        }
        res.status(200).json(userProfile);
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.payload;
        const update = {};

        // Check for fields in the request body and add them to the update object if present
        if (req.body?.address) {
            update.address = req.body.address;
        }
        if (req.body?.briefDescription) {
            update.briefDescription = req.body.briefDescription;
        }
        if (req.body?.detailedDescription) {
            update.detailedDescription = req.body.detailedDescription;
        }
        if (req.body?.favouriteItems) {
            const existingProfile = await profile.findOne({ userId: userId });
            if (existingProfile) {
                const updatedFavouriteItems = [
                    ...existingProfile.favouriteItems,
                    ...req.body.favouriteItems
                ];
                update.favouriteItems = updatedFavouriteItems;
            }
        }

        // Check if there's anything to update
        if (Object.keys(update).length === 0) {
            return res.status(400).json("No data to update");
        }

        // Perform a single update operation
        const userProfile = await profile.findOneAndUpdate(
            { userId: userId },
            update,
            { new: true }
        );

        if (!userProfile) {
            return res.status(404).json("Profile not found");
        }

        res.status(200).json("Profile updated successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}

exports.deleteUserProfile = async (req, res) => {
    try {
       const userId = req.payload;
       const userProfile = await profile.findOneAndDelete({userId: userId});
       if(!userProfile){
           return res.status(404).json("Profile not found");
       }
       const currentUser = await user.findOneAndDelete({_id: userId});
       if(!currentUser){
           return res.status(404).json("User not found");
       }
       res.status(200).json("Profile deleted successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
}




