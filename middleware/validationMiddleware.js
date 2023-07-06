"use strict";

//* Applies validation to all new posts
module.exports = (req, res, next) => {
    if (req.files == null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}