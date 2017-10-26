var express = require("express");
var index = require('./app/routes/index');
var userRoutes = require('./app/routes/users');
var login = require('./app/routes/loginroutes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').load();
var methodOverride = require("method-override");

//show the username instead of LOGIN

//Auth packages
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
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
var options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

var sessionStore = new MySQLStore(options);

app.use(methodOverride("_method"));

app.use(session({
    secret: 'ajskdflasdjfladf',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use('/', index); 
app.use('/users', userRoutes);

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findAll({
            where: {
                username: username
            }
        }).then(foundUser => {
            if (foundUser.length === 0) {
                return done(null, false);
            } else {
                const hashedPassword = foundUser[0].password.toString();
                bcrypt.compare(password, hashedPassword, function (error, response) {
                    if (response === true) {
                        console.log(foundUser[0].id);
                        return done(null, {
                            user: foundUser[0]
                        });
                    } else {
                        console.log(foundUser[0].username + " didn't enter the right password")
                        return done(null, false);
                    }
                });
            }
        }).catch((error) => {
            //we can use flash to show the error!!!
            res.status(500).send(error);
        });
    }
));

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("MK Server has started");
});