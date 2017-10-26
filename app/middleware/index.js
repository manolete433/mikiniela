var User = require("../models/user");

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()) return next();
    //use flash
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
};
//have to create isAdmin

module.exports = middlewareObj;