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
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

//Users New
router.get("/", function(req, res) {
    res.render("users/new", {success: false, errors: req.session.errors});
    req.session.errors = null;
    //here is should display all the users, instead of new user form
});

//Users Create
router.post("/api/register", function(req, res, next){
    req.check("inputFirstName", "Nombre es inválido").notEmpty();
    req.check("inputLastName", "Apellido(s) es inválido").notEmpty();
    req.check("inputUsername", "Usuario es inválido").notEmpty();
    req.check("inputEmail", "Email inválido").isEmail();
    req.check("inputPassword", "Password es inválido").isLength({min: 4}).equals("inputPasswordConfirm");

    var errors = req.validationErrors();

    if(errors){
        req.session.errors = errors;
    }else{
        var today = new Date();
        var users={
            "firstName":req.body.inputFirstName,
            "lastName":req.body.inputLastName,
            "username":req.body.inputUsername,
            "email":req.body.inputEmail,
            "isAdmin":req.body.inputIsAdmin,
            "isActive":req.body.inputIsActive,
            "passwordHash":req.body.inputPassword,
            "createdOn":today,
            "modifiedOn":today
        }
    
        //check validity
    
        //convert checkbox values to integers
        if(users.isActive === "on") users.isActive = 1
        else users.isActive = 0;
        if(users.isAdmin === "on") users.isAdmin = 1
        else users.isAdmin = 0;
        connection.query('INSERT INTO users SET ?', users, function(error, results, fields){
            if(error){
                console.log("error occurred: " + error);
                res.send({
                    "code":400,
                    "failed":"error occurred"
                });
            }else{
                console.log("The solution is: ", results);
                res.send({
                    "code":200,
                    "success":"user:" + req.body.inputEmail + " registered successfully"
                });
            }
        });
    }
    res.redirect("/");
   
});

module.exports = router;