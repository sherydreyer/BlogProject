"use strict";

// Users registration schema
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator'); // Helps resolve duplicate database entries
// Importing the bcrypt package
const bcrypt = require('bcrypt');

// Added user validation to the Schema
const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
});

userSchema.plugin(uniqueValidator);

// Lets us change user data before saving it to the database
userSchema.pre('save', function (next) {
    // Gets the user being saved, while Mongoose makes the userSchema available via "this"
    const user = this;
    /* bcrypt.hash takes the first argument "user.password" and hashes the password, 
    the second argument specifies how many times to has the password, the third
    argument is called when the hashing is completed*/
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash // This replaces the the original password with the encrypted version
        next()
    });
})

const User = mongoose.model('User', userSchema);

module.exports = User;