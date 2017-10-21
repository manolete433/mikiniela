var express = require("express");
var index = require('./app/routes/index');
var userRoutes = require('./app/routes/users');
var login = require('./app/routes/loginroutes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require("method-override");
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
app.use(methodOverride("_method"));

app.use('/', index);
app.use('/users', userRoutes);

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("MK Server has started");
});