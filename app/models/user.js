var Sequelize = require("sequelize");
const db = require('./db');
var bcrypt = require("bcryptjs");


const User = db.define('user', {
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
}, {
    hooks: {
        beforeValidate: function () {
            console.log("BeforeValidate FROM MODELS/USER");
        },
        afterValidate: function (user) {
            user.password = bcrypt.hashSync(user.password, 10);
        },
        beforeCreate: function () {
            console.log("BeforeCreate");
        },
        afterCreate: function (res) {
            console.log("AfterCreate: Created User with email + ", res.dataValues.email);
        }
    }
});

//STUFF TO DO AFTER DB WAS CREATED
// db.sync().then(function () {
//     console.log("Hello from sequelize.sync inside MODELS/USER")
//     logging: console.log
//     // DO SOMETHING AFTER CREATING THE DB
//     // User.create({
//     //     firstName: "Cache",
//     //     lastName: "Rios",
//     //     username: "Cachetes",
//     //     email: "cachetes@cachetes.com",
//     //     isAdmin: 1,
//     //     isActive: 1,
//     //     password: "Cachetes"
//     // })
//     // .then(function () {
//     // });
// })
// .catch(function (error) {
//     console.log(error);
// });

module.exports = User;