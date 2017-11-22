const Sequelize = require('sequelize')
const db = require('./_db')
var bcrypt = require('bcryptjs');

const User = db.define('user', {
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
    afterValidate: function (user) {
      user.password = bcrypt.hashSync(user.password, 10);
    }
  },
  tableName: 'users',
  name: {
    singular: 'user',
    plural: 'users'
  },
});

module.exports = User