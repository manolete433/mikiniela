const Sequelize = require('sequelize')
const db = require('./_db')

const Week = db.define('week', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      min: 0,
    }
  },
  startDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  endDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1
  },
  gameId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  }
});

module.exports = Week