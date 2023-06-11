'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {


    static associate(models) {


      Venue.belongsTo(models.Group,{
        foreignKey:'groupId'
      })
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull:false,

    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    lat: {
      type: DataTypes.DECIMAL
    },
    long: {
      type: DataTypes.DECIMAL
    },
    createdAt: {
      type:DataTypes.DATE
    },
    updatedAt: {
      type:DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Venue',
  });
  return Venue;
};
