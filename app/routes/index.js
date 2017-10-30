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

//post login
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (error, user, info) {
        if (error) {
            req.flash("error", error)
            return next(error);
        }
        // Redirect if it fails
        if (!user) {
            req.flash("error", "Email or password didn't match our records");
            return res.redirect('/login');
        }
        req.logIn(user, function (error) {
            if (error) {
                return next(error);
            }
            req.flash("success", "Welcome Back, " + user.user.username + "!");
            return res.redirect('/users');
        });
    })(req, res, next);
});

//show logout form
router.get("/logout", middleware.isLoggedIn, function (req, res) {
    req.logout();
    // req.session.destroy();
    req.flash("success", "Logged out");
    res.redirect("/login");
});

module.exports = router;