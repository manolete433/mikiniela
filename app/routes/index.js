var express = require("express");
var router = express.Router();
var passport = require("passport");
var middleware = require("../middleware");

//root route
router.get("/", function (req, res, next) {
    res.render("landing");
});

//show login form
router.get("/login", function (req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/users");
    } else {
        res.render("login");
    }
});

router.post("/login", passport.authenticate('local', {
    successRedirect: '/users',
    failureRedirect: 'back'
}), function (req, res) {});

//show logout form
router.get("/logout", middleware.isLoggedIn, function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/login");
});

module.exports = router;