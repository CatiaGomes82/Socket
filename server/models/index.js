'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const SequelizeSimpleCache = require('sequelize-simple-cache');

const basename = path.basename(__filename);
// const config = require('../config/config.js')[process.env.NODE_ENV || 'development'];
let db = {};

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve(__dirname, '../database/db.db')
});

// initialize cache
const useCache = process.env.NODE_ENV === 'production';
const cache = useCache ? new SequelizeSimpleCache({
  // Report: { ttl: false },
  // Page: { ttl: false },
  // Customer: { ttl: false } // cache forever
}, {
  debug: process.env.NODE_ENV !== 'production'
}) : undefined;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    const Model = useCache ? cache.init(model) : model;
    db[Model.name] = Model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;