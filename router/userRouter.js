const express = require('express');
const router = express.Router();
const {saveUser} = require("../models/userModel")

router.post("/register", (req,res,next) => {
    //  findUser
    // if the user exist return response email exists
    // else encrypt the password
    // set the paswd with encrypted pass then save
    // saveUser(newUser);
});
router.post("/login", (req,res) => {

});
module.exports = router; 