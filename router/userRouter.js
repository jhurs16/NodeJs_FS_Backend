const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const {saveUser, findUser} = require("../db/db")
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
router.post("/register", (req,res,next) => {
    //  findUser\
    findUser({email: req.body.email})
    .then(user => {
        if(user){
            return res.status(409).json({message: "User already exist! try logging in"})
        }
        else{
            const user = new User();
            user._id = new mongoose.Types.ObjectId();
            const newUser = Object.assign(user, req.body)
            bcrypt.hash(newUser.password, 10, (err, hash) => {
                // Store hash in your password DB.
                if(err){
                    return res.status(501).json({
                        message: "Error: " + err.message,

                    })
                } else {
                    newUser.password = hash;
                    // save the user
                    saveUser(newUser).then(
                        user => {
                            return res.status(201).json({
                                message: "Successfull registration",
                                user: user
                            })
                        }
                    ).catch(
                        err => {
                            message: err.message
                        }
                    )
                    
                }
            });
        }
    })
    .catch(err => {

    })
    // if the user exist return response email exists
    // else encrypt the password
    // set the paswd with encrypted pass then save
    // saveUser(newUser);
});
router.post("/login", (req,res) => {

});
module.exports = router; 