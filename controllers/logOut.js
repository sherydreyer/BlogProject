"use strict";

// Destroys all session data and redirects the user to the home page
module.exports = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
}