'use strict';

module.exports = (sequelize, DataTypes) => {
  var Story = sequelize.define('Story', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      unique: true
    },
    Name: {
      type: DataTypes.STRING
    },
    TotalPoints: {
      type: DataTypes.INTEGER
    },
    Order: {
      type: DataTypes.INTEGER
    },
  },
    {
      name: {
        singular: 'story',
        plural: 'stories',
      }
    });

  // relationships
  Story.associate = function (models) {
    models.Story.hasMany(models.Points, { onDelete: 'cascade' });
    models.Story.belongsTo(models.Game);
  };

  return Story;
}