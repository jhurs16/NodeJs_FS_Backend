require("dotenv").config();
const { findUser, saveUser } = require("../db/db");
const bcrypt = require('bcrypt');
const errorTemplate = require("../template_list/errorTemplate");
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose');
exports.registerUser = async (req, res) => {
  console.log('Registering');
  try {
    const user = await findUser({ email: req.body.email });
    // if the user exist
    if (user) {
      // throw error
      throw new Error('User exist, try logging in');
    } else {
      // map our req.body to our user model
      const user = new User();
      user._id = new mongoose.Types.ObjectId();
      const newUser = Object.assign(user, req.body);
      // encrypt the password
      const hash = await bcrypt.hash(newUser.password, 10);
      // set the password with the encrypted password
      newUser.password = hash;
      // save the user to the database
      const savedUser = await saveUser(newUser);
      return res.status(201).json({
        message: 'Successful Registration',
        result: savedUser,
      });
    }
  } catch (e) {
    return errorTemplate(res, e, e.message);
  }
};
exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const loggedUser = await findUser({ email });
  
      if (!loggedUser) {
        throw new Error('Authentication Failed: Unable to find user');
      } else {
        console.log('Password from request:', password);
        console.log('Hashed password from database:', loggedUser.password);
        
        const result = await bcrypt.compare(password, loggedUser.password);
        console.log('bcrypt.compare() result:', result);
  
        if (result) {
          const token = jwt.sign({ user: loggedUser }, process.env.jwt_secret);
          return res.status(201).json({
            result: loggedUser,
            logged: true,
            token: token,
            message: 'Login Successful',
          });
        } else {
          throw new Error('Authentication failed: Email or password does not match');
        }
      }
    } catch (e) {
      return errorTemplate(res, e, e.message);
    }
  };
  