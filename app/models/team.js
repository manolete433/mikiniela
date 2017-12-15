const Sequelize = require('sequelize')
const Game = require('./game');
const db = require('./_db')

const Team = db.define('team', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  imageURL: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    defaultValue: 1
  }
}, {
  tableName: 'teams',
  name: {
    singular: 'team',
    plural: 'teams'
  },
});

Game.belongsTo(Team, {
  as: 'homeTeam',
  foreignKey: 'homeTeamId',
  targetKey: 'id'
});
Game.belongsTo(Team, {
  as: 'awayTeam',
  foreignKey: 'awayTeamId',
  targetKey: 'id'
});

module.exports = Team