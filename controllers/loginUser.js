"use strict";

// Improting bcrypt package an users model
const bcrypt = require('bcrypt');
const User = require('../models/users');

module.exports = (req, res) => {
    const { username, password } = req.body; //*
    User.findOne({ username: username }, (error, user) => { //** 
        if (user) {
            bcrypt.compare(password, user.password, (error, same) => { //*** 
                if (same) {
                    req.session.userId = user._id; // Implements user sessions
                    res.redirect('/');
                }
                else {
                    res.redirect('/auth/login');
                }
            })
        }
        else {
            res.redirect('/auth/login');
        }
    })
}

// *Extracting the username and password from the user login with req.body

/**Using findOne to find a user with the inputted username,
if such a user exists, we compare the passwords, 
if not the user is redirected to the home page*/

/***bcrypt.compare compares the entered password with the hashed user
password retrieved from the database, if the passwords match the
user is redirected to the home page, if not they are redirected 
to the login page */