"use strict";

// Renders register.ejs
module.exports = (req, res) => {
    var username = ""
    var password = ""
    const data = req.flash('data')[0];
    if(typeof data != "undefined") {
        username = data.username
        password = data.password
    }
    console.log(username, password);
    console.log(data);
    res.render('register', {
        errors: req.flash('validationErrors'), // Retrieves errors from the session
        username: username,
        password: password
    })
}