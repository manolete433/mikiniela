var express = require("express");
var router = express.Router();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Emesene@321',
    database: 'mikiniela'

    // host: process.env.DB_HOST,
    // user: process.env.DB_USER,
    // password: process.env.DB_PASSWORD,
    // database: process.env.DB_HOST
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected inside routes/users.js ... nn");
    } else {
        console.log("Error connecting database inside routes/users.js ... nn");
    }
});

//Users Index
router.get("/", function (req, res, next) {
    connection.query('SELECT * FROM USERS', function (error, results, fields) {
        if (error) {
            console.log("error occurred while trying to get all the users from the DB. " + error + new Date());
        } else {
            res.render("users/index", {
                users: results
            });
        }
    });
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
    // req.check("inputFirstName", "Name is invalid").notEmpty();
    // req.check("inputLastName", "Last Name is invalid").notEmpty();
    // req.check("inputUsername", "Username is invalid").notEmpty();
    // req.check("inputEmail", "Email is invalid").isEmail();
    // req.check("inputPassword", "Password is invalid").isLength({min: 4});
    // req.check("inputPasswordConfirm", "Password didn't match").equals("inputPassword");

    // if(errors){
    //     req.session.errors = errors;
    //     req.session.success = false;
    //     res.redirect('back');
    // }else{
    // }
    // req.session.success = true;
    var today = new Date();

    var users = {
        "firstName": req.body.inputFirstName,
        "lastName": req.body.inputLastName,
        "username": req.body.inputUsername,
        "email": req.body.inputEmail,
        "isAdmin": req.body.inputIsAdmin,
        "isActive": req.body.inputIsActive,
        "password": req.body.inputPassword
    }

    //convert checkbox values to integers
    if (users.isActive === "on") users.isActive = 1
    else users.isActive = 0;
    if (users.isAdmin === "on") users.isAdmin = 1
    else users.isAdmin = 0;

    connection.query('INSERT INTO users SET ?', users, function (error, results, fields) {
        if (error) {
            console.log("User with email: " + users.email + " could not be inserted. " + new Date());
            console.log("error occurred: " + error);
            // res.send({
            //     "code":400,
            //     "failed":"error occurred"
            // });
            res.redirect("back");
        } else {
            console.log("User with email: " + users.email + " inserted. " + new Date());
            res.redirect("/users");
        }
    });
});

module.exports = router;