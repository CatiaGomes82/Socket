
const { v4: uuidv4 } = require('uuid');

'use strict';

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    Id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true,
      defaultValue: require("sequelize").UUIDV4
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  },
    {
      name: {
        singular: 'user',
        plural: 'users',
      }
    });

  User.beforeCreate(function (user) {
    return user.Id = uuidv4();
  });

  // relationships
  User.associate = function (models) {
    models.User.belongsTo(models.Points);
    models.User.belongsTo(models.Game);
  };

  return User;
}