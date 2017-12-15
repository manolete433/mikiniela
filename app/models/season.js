//THIS COULD BE ADDED IN A FUTURE!!!!
const Sequelize = require('sequelize')
const db = require('./_db')

const Season = db.define('season', {
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
  }
});

module.exports = Season