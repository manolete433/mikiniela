const Sequelize = require('sequelize')
const Week = require('./week')
const db = require('./_db')

const Game = db.define('game', {
  homeTeamId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  awayTeamId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  gameDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
});

//CONTINUE HEEEEEERE
Week.belongsTo(Game, {
  //Alias to be used in our routes
  as: 'game',
  //Foreign key in our target (parent) DB
  foreignKey: 'gameId',
  //Column in our source table
  targetKey: 'id'
});

module.exports = Game