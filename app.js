var express = require("express");
var index = require('./routes/index');
var userRoutes = require('./routes/users');
var login = require('./routes/loginroutes');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var Sequelize = require("sequelize");
// var expressValidator = require('express-validator');
// var expressSession = require('express-session');
// var validator = require("validator");
require('dotenv').load();
var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var bcrypt = require("bcryptjs");
var app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// app.use(expressValidator());
app.use(cookieParser());
app.use(flash());
// app.use(expressSession({secret: 'max', saveUninitialized: false, resave: false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//Using sequelize
// var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
//     dialect: 'mysql'
// });

// const User = sequelize.define('user', {
//     // slug:{
//     //     type: Sequelize.STRING,
//     //     primaryKey: true
//     // },
//     firstName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     lastName: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     username: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true
//         }
//     },
//     isAdmin: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: 0
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//         defaultValue: 1
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {
//     hooks: {
//         beforeValidate: function () {
//             console.log("BeforeValidate");
//         },
//         afterValidate: function (user) {
//             user.password = bcrypt.hashSync(user.password, 8);
//         },
//         beforeCreate: function () {
//             console.log("BeforeCreate");
//         },
//         afterCreate: function (res) {
//             console.log("AfterCreate: Created User with email + ", res.dataValues.email);
//         }
//     }
// });

// sequelize.sync().then(function () {
//         logging: console.log
//         // DO SOMETHING AFTER CREATING THE DB
//         // User.create({
//         //     firstName: "Cache",
//         //     lastName: "Rios",
//         //     username: "Cachetes",
//         //     email: "cachetes@cachetes.com",
//         //     isAdmin: 1,
//         //     isActive: 1,
//         //     password: "Cachetes"
//         // })
//         // .then(function () {
//         // });
//     })
//     .catch(function (error) {
//         console.log(error);
//     });
// // sequelize

var router = express.Router();
// test route
router.get('/', function (req, res) {
    res.json({
        message: 'welcome to our upload module apis'
    });
});

app.use('/', index);
app.use('/api', router);
app.use('/users', userRoutes);

//route to handle user registration
// router.post('/register',register.register); //registration
router.post('/login', login.login) //login

app.listen(process.env.PORT || 3000, process.env.IP, function () {
    console.log("MK Server has started");
});