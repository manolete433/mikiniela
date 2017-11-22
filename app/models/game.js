const Sequelize = require('sequelize')
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
},
{

})

module.exports = Game