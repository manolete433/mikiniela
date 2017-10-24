var express = require("express");
var router = express.Router();
var passport = require("passport");

//root route
router.get("/", function(req, res, next){
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.render("landing");
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
    // res.render("login", {message: "asdfasdfasdf"});
});


function authenticationMiddleware () {  
	return (req, res, next) => {
		console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

	    if (req.isAuthenticated()) return next();
	    res.redirect('/login')
	}
};

module.exports = router;