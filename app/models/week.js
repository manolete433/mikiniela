const Sequelize = require('sequelize')
const Game = require('./game');
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
  }
});

// Game.belongsTo(Week, {
//   as: 'week',
//   foreignKey: 'weekId',
//   targetKey: 'id'
// });

// Week.belongsTo(Game, {
//   //Alias to be used in our routes
//   as: 'game',
//   //Foreign key in our target (parent) DB
//   foreignKey: 'gameId',
//   //Column in our source table
//   targetKey: 'id'
// });

// //CONTINUE HEEEEEERE TO MAKE THE RELATION
// Game.belongsTo(Week, {
//   //Alias to be used in our routes
//   as: 'week',
//   //Foreign key in our target (parent) DB
//   foreignKey: 'weekId',
//   //Column in our source table
//   targetKey: 'id'
// });

module.exports = Week