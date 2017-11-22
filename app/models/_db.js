'use strict'

const Sequelize = require('sequelize');
require('dotenv').load();
var DB_NAME = process.env.DB_NAME;
var DB_USER = process.env.DB_USER;
var DB_PASSWORD = process.env.DB_PASSWORD;
var DB_HOST = process.env.DB_HOST;

// Create shared instance to be used across models
// let db = new Sequelize(config.databaseUrl, config.databaseOptions);
let db = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: 'mysql'
});

module.exports = db;