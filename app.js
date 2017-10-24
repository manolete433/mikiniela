var express = require("express");
var index = require('./app/routes/index');
var userRoutes = require('./app/routes/users');
var login = require('./app/routes/loginroutes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('dotenv').load();
var methodOverride = require("method-override");

//Auth packages
var session = require("express-session");
var passport = require ("passport");
var MySQLStore = require('express-mysql-session')(session);

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
  
app.use('/', index);
app.use('/users', userRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("MK Server has started");
});