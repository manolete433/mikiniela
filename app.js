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
var sequelize = new Sequelize("mikiniela", "root", "Emesene@321", {
    dialect: 'mysql'
});

const User = sequelize.define('user', {
    // slug:{
    //     type: Sequelize.STRING,
    //     primaryKey: true
    // },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync().then(function () {
        logging: console.log
        // User.create({
        //     firstName: "Cache",
        //     lastName: "Rios",
        //     username: "Cachetes",
        //     email: "cachetes@cachetes",
        //     isAdmin: 1,
        //     isActive: 1,
        //     password: "Cachetes" 
        // }).then(function(){
        //     User.findById(1).then(function(user){
        //         console.log(user.dataValues);
        //     });
        // });
    })
    .catch(function (error) {
        console.log(error);
    });
// sequelize

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