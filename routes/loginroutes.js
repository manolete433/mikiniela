var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Emesene@321',
    database: 'mikiniela'
});
connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected ... nn");
    } else {
        console.log("Error connecting database ... nn");
    }
});

exports.register = function(req, res) {
    //console.log("req", req.body);
    var today = new Date();
    var users={
        "firstName":req.body.firstName,
        "lastName":req.body.lastName,
        "nickname":req.body.nickname,
        "email":req.body.email,
        "isAdmin":req.body.isAdmin,
        "isActive":req.body.isActive,
        "passwordHash":req.body.passwordHash,
        "createdOn":today,
        "modifiedOn":today
    }
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
}

exports.login = function(req,res){
    var email= req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if([0].password == password){
          res.send({
            "code":200,
            "success":"login sucessfull"
              });
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
              });
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits" + req.body.firstName
            });
      }
    }
    });
  }
