const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/userModel');
const { loginUser, registerUser } = require('../services/userService');

router.post("/register", registerUser);
router.post("/login", loginUser);
    // email password
 

module.exports = router; 