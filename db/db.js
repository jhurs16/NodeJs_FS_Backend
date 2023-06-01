const mongoose = require('mongoose');
const User = require("../models/userModel")
require("dotenv").config();

const connect = async () => {
    await mongoose.connect(process.env.mongo);
}

const disconnect = async() =>{
    await mongoose.connection.close();
}

const findUser = async (obj) => {
    User.findOne(obj);
};

const saveUser = async (newUser) => {
    return await newUser.save()
};
module.exports = {connect, disconnect, findUser, saveUser}