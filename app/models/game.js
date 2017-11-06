var Sequelize = require("sequelize");
const Team = require("./team");
const db = require('./db');

const Game = db.define('game', {
    // slug:{
    //     type: Sequelize.STRING,
    //     primaryKey: true
    // },
    homeTeam: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    awayTeam: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    homeScore: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    awayScore: {
        type: Sequelize.INTEGER,
        defaultValue: null
    },
    gameDate:{
        type: Sequelize.DATEONLY,
        allowNull: false
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

Game.hasMany(Team, {foreignKey: "id", sourceKey: "homeTeam"});
Game.hasMany(Team, {foreignKey: "id", sourceKey: "awayteam"});

module.exports = Game;  