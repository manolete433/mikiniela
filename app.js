var express = require("express");
var index = require('./app/routes/index');
var userRoutes = require('./app/routes/users');
var teamRoutes = require('./app/routes/teams');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').load();
var methodOverride = require("method-override");
var flash = require("connect-flash");

//Auth packages
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
// var MySQLStore = require('express-mysql-session')(session);
const User = require("./app/models/user");
var bcrypt = require("bcryptjs");

var app = express();

app.set('views', './app/views')
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/app/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(cookieParser());

//To Store Auth session in the DB
// var options = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// };

// var sessionStore = new MySQLStore(options);

app.use(methodOverride("_method"));
app.use(flash());

app.use(session({
    secret: 'ajskdflasdjfladf',
    resave: false,
    // store: sessionStore,
    saveUninitialized: false,
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    console.log("req.isAuthenticated() " + req.isAuthenticated());
    res.locals.isAuthenticated = req.isAuthenticated();
    //if user is loggedIn we should pass it to all the requests
    if (req.isAuthenticated()) res.locals.currentUser = req.user.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use('/', index);
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);

passport.use(new LocalStrategy({
        usernameField: "inputEmail",
        passwordField: "inputPassword"
    },
    function (email, password, done) {
        User.findOne({
            where: {
                email: email
            }
        }).then(foundUser => {
            if (!foundUser) {
                return done(null, false);
            } else {
                const hashedPassword = foundUser.password.toString();
                bcrypt.compare(password, hashedPassword, function (error, response) {
                    if (response === true) {
                        return done(null, {
                            user: foundUser
                        });
                    } else {
                        console.log(foundUser.username + " didn't enter the right password")
                        return done(null, false);
                    }
                });
            }
        }).catch((error) => {
            console.log(error.message);
            // res.status(500).send(error);
        });
    }
));

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("MK Server has started");
});