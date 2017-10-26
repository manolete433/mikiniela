var User = require("../models/user");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) return next();

    //use flash
    res.redirect("/login");
};

//have to create isAdmin

module.exports = middlewareObj;