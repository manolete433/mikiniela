var express = require("express");
var router = express.Router();
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
        }))
        res.redirect("/users");
    }).catch((error) => {
        //we can use flash to show the error!!!
        console.log(error);
        res.status(500).send(error);
    });
});

//Users Show
router.get("/:id", function (req, res) {
    //find the user with provided ID
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
        res.status(500).send(error);
    });
});

module.exports = router;