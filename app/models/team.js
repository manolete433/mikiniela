var Sequelize = require("sequelize");
const db = require('./db');

const Team = db.define('team', {
    // slug:{
    //     type: Sequelize.STRING,
    //     primaryKey: true
    // },
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING,
        unique: true,
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
}, {
    hooks: {
        beforeValidate: function () {
            // console.log("BeforeValidate FROM MODELS/USER");
        },
        afterValidate: function (user) {
            // user.password = bcrypt.hashSync(user.password, 10);
        },
        beforeCreate: function () {
            // console.log("BeforeCreate");
        },
        afterCreate: function (res) {
            // console.log("AfterCreate: Created User with email + ", res.dataValues.email);
        }
    }
});

module.exports = Team;