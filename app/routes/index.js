var express = require("express");
var router = express.Router();

//root route
router.get("/", function(req, res, next){
    res.render("landing");
});

//show login form
router.get("/login", function(req, res) {
    res.render("login");
    // res.render("login", {message: "asdfasdfasdf"});
});

module.exports = router;