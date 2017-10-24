var express = require("express");
var router = express.Router();
var passport = require("passport");
const User = require("../models/user");

//Users Index
router.get("/", function (req, res, next) {
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
router.get("/new", function (req, res, next) {
    // res.render("users/new", {success: req.session.success, errors: req.session.errors});
    res.render("users/new");
    // req.session.errors = null;
    //here is should display all the users, instead of new user form
});

//Users Create
router.post("/", function (req, res, next) {
    User.create({
        firstName: req.body.inputFirstName,
        lastName: req.body.inputLastName,
        username: req.body.inputUsername,
        email: req.body.inputEmail,
        isAdmin: req.body.inputIsAdmin === "on",
        isActive: req.body.inputIsActive === "on",
        password: req.body.inputPassword
    }).then(user => {
        console.log(user.get({
            plain: true
        }));
        //when user was created we have to log him/her in
        console.log(user.id);
        req.login(user.id, function (error) {
            res.redirect("/");
        });
    }).catch((error) => {
        //we can use flash to show the error!!!
        console.log(error);
        res.status(500).send(error);
    });
});

passport.serializeUser(function (user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
});

//Users Show
router.get("/:id", function (req, res) {
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
router.get("/:id/edit", function (req, res) {
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
router.put("/:id", function (req, res) {
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
        res.status(500).send(error);
    });
});

//Users Destroy (deactivate)
router.delete("/:id", function (req, res) {
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