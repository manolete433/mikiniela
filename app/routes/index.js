var express = require("express");
var router = express.Router();
var passport = require("passport");

//root route
router.get("/", function (req, res, next) {
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render("landing");
});

//show login form
router.get("/login", function (req, res) {
    res.render("login");
    // res.render("login", {message: "asdfasdfasdf"});
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: 'back'
}));

//show logout form
router.get("/logout", function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
    // res.render("login", {message: "asdfasdfasdf"});
});

module.exports = router;