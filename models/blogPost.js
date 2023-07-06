"use strict";

// Defining the first model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
    },
    body: {
        type: String,
        required: [true, "The body of the blog cannot be empty"]
    },
    username: String,
    datePosted: {
        type: Date,
        default: new Date()
    },
    image: String
});

// Accessing the database
const blogPost = mongoose.model('blogPost', blogPostSchema);

// Exporting so other files have access to this file
module.exports = blogPost;

