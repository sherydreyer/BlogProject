"use strict";

// module.exports = (req, res) => {
//     // Checks for a session id before allowing the user to create a blog post
//     if (req.session.userId) {
//         return res.render("create");
//     }
//     res.redirect('/auth/login');
// }

module.exports = (req, res) => {
    var title = ""
    var description = ""
    const data = req.flash('data')[0];
    if (typeof data != "undefined") {
        title = data.title
        description = data.body
    }
    console.log("title*********", title, description);
    console.log("data==>", req.flash('data'));
    console.log("req.flash.validationErrors", req.flash('validationErrors'));
    res.render('create', {
        errors: req.flash('validationErrors'), // Retrieves errors from the session
        title: title,
        body: description
    })
}