var express = require("express");
var router = express.Router();
var passport = require("passport");
const User = require("../models/user");
var middleware = require("../middleware");

//Users Index
router.get("/", middleware.isLoggedIn, function (req, res, next) {
    User.findAll({
        order: [
            ['createdAt', 'ASC']
        ]
    }).then((users) => {
        res.render("users/index", {
            users: users
        });
    }).catch((error) => {
        res.status(500).send(error);
    })
});

//Users New
router.get("/new", middleware.isLoggedIn, function (req, res, next) {
    res.render("users/new");
});

//Users Create
router.post("/", middleware.isLoggedIn, function (req, res, next) {
    User.create({
        firstName: req.body.inputFirstName,
        lastName: req.body.inputLastName,
        username: req.body.inputUsername,
        email: req.body.inputEmail,
        isAdmin: req.body.inputIsAdmin === "on",
        isActive: req.body.inputIsActive === "on",
        password: req.body.inputPassword
    }).then(createdUser => {
        console.log(createdUser.get({
            plain: true
        }));
        req.flash("success", "User " + createdUser.username  + " was successfully created!");
        console.log("/Users Create " + createdUser.id);
        res.redirect("/users");
    }).catch((error) => {
        //we can use flash to show the error!!!
        req.flash("error", "Are you sure the username or the email are not linked to an existing user? " + error.message );
        console.log(error);
        res.status(500);
        res.redirect("/users");
        // res.status(500).send(error);
    });
});

passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});

//Users Show
router.get("/:id", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id).then((foundUser) => {
        if (!foundUser) {
            console.log("User with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            res.status(200).render("users/show", {
                user: foundUser
            });
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

// Users Edit
router.get("/:id/edit", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id).then((foundUser) => {
        if (!foundUser) {
            console.log("User with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!!");
        } else {
            res.status(200).render("users/edit", {
                user: foundUser
            });
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

//Users Update
router.put("/:id", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id).then((userToUpdate) => {
        if (!userToUpdate) {
            console.log("User with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! User not found");
        } else {
            userToUpdate.firstName = req.body.inputFirstName;
            userToUpdate.lastName = req.body.inputLastName;
            userToUpdate.username = req.body.inputUsername;
            userToUpdate.email = req.body.inputEmail;
            userToUpdate.isAdmin = req.body.inputIsAdmin === "on";
            userToUpdate.isActive = req.body.inputIsActive === "on";
            userToUpdate.save();
            res.status(200);
            res.redirect("/users");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        req.flash("error", error);
        res.status(500).send(error);
    });
});

//Users Destroy (deactivate)
router.delete("/:id", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id).then((userToUpdate) => {
        if (!userToUpdate) {
            console.log("User with ID: " + req.body.id + " not found.");
            res.status(404).send("404!!!! User not found");
        } else {
            userToUpdate.isAdmin = req.body.inputIsAdmin === "off";
            userToUpdate.isActive = req.body.inputIsActive === "off";
            userToUpdate.save();
            res.status(200);
            res.redirect("/users");
        }
    }).catch((error) => {
        //we can use flash to show the error!!!
        res.status(500).send(error);
    });
});

module.exports = router;