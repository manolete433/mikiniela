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

router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/api/register", function(req, res){
    var today = new Date();
    var users={
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "username":req.body.username,
        "email":req.body.email,
        "isAdmin":req.body.isAdmin,
        "isActive":req.body.isActive,
        "passwordHash":req.body.password,
        "createdOn":today,
        "modifiedOn":today
    }
    
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
                "success":"user:" + req.body.email + " registered successfully"
            });
        }
    });
});

// exports.register = function(req, res) {
//     //console.log("req", req.body);
//     var today = new Date();
//     var users={
//         "firstName":req.body.firstName,
//         "lastName":req.body.lastName,
//         "nickname":req.body.nickname,
//         "email":req.body.email,
//         "isAdmin":req.body.isAdmin,
//         "isActive":req.body.isActive,
//         "passwordHash":req.body.passwordHash,
//         "createdOn":today,
//         "modifiedOn":today
//     }
//     connection.query('INSERT INTO users SET ?', users, function(error, results, fields){
//         if(error){
//             console.log("error occurred: " + error);
//             res.send({
//                 "code":400,
//                 "failed":"error occurred"
//             });
//         }else{
//             console.log("The solution is: ", results);
//             res.send({
//                 "code":200,
//                 "success":"user:" + req.body.email + " registered successfully"
//             });
//         }
//     });
// }

module.exports = router;