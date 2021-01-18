'use strict';

module.exports = (sequelize, DataTypes) => {
  var Points = sequelize.define('Points', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    Value: {
      type: DataTypes.INTEGER
    }
  });

  // relationships
  Points.associate = function(models) {
    models.Points.belongsTo(models.Story);
    models.Points.hasOne(models.User);
  };

  return Points;
}

