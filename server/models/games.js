'use strict';

module.exports = (sequelize, DataTypes) => {
  var Game = sequelize.define('Game', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      name: {
        singular: 'game',
        plural: 'games',
      }
    });

  // relationships
  Game.associate = function(models) {
    models.Game.hasMany(models.Story, { as: 'Stories', onDelete: 'cascade' });
    models.Game.hasMany(models.User, { as: 'Users' });
    models.Game.hasOne(models.User, { as: 'AdminUser' });
  };

  return Game;
}

