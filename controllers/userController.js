const mongoose = require('mongoose');
const user = require('../models/userSchema');
const profile = require('../models/profileSchema');
const jwt = require('jsonwebtoken');

exports.register = async(req, res)=>{
    try {
        const {name, email, password, phoneNumber} = req.body;
        const newUser = new user({
            name: name,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            photo: req.file.filename
        });
        await newUser.save();
        const newProfile = new profile({
            userId: newUser._id
        });
        await newProfile.save();
        res.status(201).json("New User Created");
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.login = async(req, res)=>{
    try {
        const {username, password} = req.body;
        const currentUser = await user.findOne({email: username});
        if (!currentUser) {
            return res.status(404).json("User not found");
        }
        const isMatch = await currentUser.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json("Invalid Password");
        }
        const token = jwt.sign({userId: currentUser._id}, process.env.JWT_SECRET);
        res.status(200).json({token: token});
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
}