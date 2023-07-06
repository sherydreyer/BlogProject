"use strict";

const blogPost = require('../models/blogPost.js');

module.exports = async (req, res) => {
    const blogposts = await blogPost.find({})
    console.log(req.session);
    res.render('index', {
        blogposts
    });
}