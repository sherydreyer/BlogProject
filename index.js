"use strict";

const express = require('express');
const app = new express();
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const expressSession = require('express-session');
const flash = require('connect-flash');

//* Controllers
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logOutController = require('./controllers/logOut');

// Custom Middleware
const validateMiddleware = require("./middleware/validationMiddleware");
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthMiddleware = require('./middleware/redirectIfAuthMiddleware');

// Connecting to the database
const mongoose = require('mongoose');
mongoose.connect(
    'mongodb://127.0.0.1:27017/my_database',
    { useNewUrlParser: true }
);

//* Conditional display for New Post, Login and New User links
global.loggedIn = null;

// Telling Express to use EJS as templating engine
app.set('view engine', 'ejs');

// Looking for static assets in "public" directory
app.use(express.static('public'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded());

// Registering the package in Express
app.use(fileUpload());

// Registering the express-session
app.use(expressSession({
    secret: 'keyboard cat' //signs and encrypts
}));

app.use(flash());

// Validates new posts through "validationMiddleware.js"
app.use('/posts/store', validateMiddleware);

//*
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId
    next()
});

//* Controller routes
app.get('/', homeController);
app.get('/post/:id', getPostController);
app.get('/posts/new', authMiddleware, newPostController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectIfAuthMiddleware, newUserController);
app.post('/users/register', redirectIfAuthMiddleware, storeUserController);
app.get('/auth/login', redirectIfAuthMiddleware, loginController);
app.post('/users/login', redirectIfAuthMiddleware, loginUserController);
app.get('/auth/logout', logOutController);
app.use((req, res) => res.render('notFound')); // If none of the above routes are found, this line will render the 404 error page

app.listen(4000, () => {
    console.log('App listening on port 4000')
})