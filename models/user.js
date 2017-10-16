var Sequelize = require("sequelize");
var bcrypt = require("bcryptjs");
require('dotenv').load();
var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_HOST = process.env.DB_HOST;

var sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
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
        type: Sequelize.TINYINT,
        defaultValue: 0
    },
    isActive: {
        type: Sequelize.TINYINT,
        defaultValue: 1
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    hooks: {
        beforeValidate: function () {
            console.log("BeforeValidate FROM MODELS/USER");
        },
        afterValidate: function (user) {
            user.password = bcrypt.hashSync(user.password, 8);
        },
        beforeCreate: function () {
            console.log("BeforeCreate");
        },
        afterCreate: function (res) {
            console.log("AfterCreate: Created User with email + ", res.dataValues.email);
        }
    }
});

sequelize.sync().then(function () {
    console.log("Hello from sequelize.sync inside MODELS/USER")
    logging: console.log
    // DO SOMETHING AFTER CREATING THE DB
    // User.create({
    //     firstName: "Cache",
    //     lastName: "Rios",
    //     username: "Cachetes",
    //     email: "cachetes@cachetes.com",
    //     isAdmin: 1,
    //     isActive: 1,
    //     password: "Cachetes"
    // })
    // .then(function () {
    // });
})
.catch(function (error) {
    console.log(error);
});

module.exports = User;