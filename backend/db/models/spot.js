'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
  
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {foreignKey: 'id', onDelete: 'CASCADE'}); 
      Spot.hasMany(models.SpotImage, {foreignKey: 'spotId'}); 
      Spot.hasMany(models.Booking, {foreignKey: 'spotId'}); 
      Spot.hasMany(models.Review, {foreignKey: 'spotId'}); 
      Spot.belongsToMany(models.User, {through: models.Booking, foreignKey: 'spotId', otherKey: 'userId', onDelete: 'CASCADE'});
      Spot.belongsToMany(models.User, {through: models.Review, foreignKey: 'spotId', otherKey: 'userId', onDelete: 'CASCADE'}); 
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      references: {model: 'Users', key: 'id'}, //optional
      onDelete: 'CASCADE'
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    city: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    state: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    country: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    lat: {
      type: DataTypes.DECIMAL(8, 8),
      allowNull: false, 
      validate: {
        isDecimal: true, 
        min: -90, 
        max: 90
      }
    }, 
    lng: {
      type: DataTypes.DECIMAL(8, 8),
      allowNull: false, 
      validate: {
        isDecimal: true, 
        min: -180, 
        max: 180
      }
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    price: {
      type: DataTypes.DECIMAL, 
      allowNull: false, 
      validate: {
        isInt: true, 
        min: 0, 
        max: 1000
      }
    }, 
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};