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
  },
  weekId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  }
});

Game.belongsTo(Week, {
  as: 'week',
  foreignKey: 'weekId',
  targetKey: 'id'
});

module.exports = Game