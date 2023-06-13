'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Venue extends Model {


    static associate(models) {


      Venue.hasMany(models.Event, {
        foreignKey: "venueId",
        allowNull: true
      });

      Venue.belongsTo(models.Group, {
        foreignKey: "groupId"
      });
    }
  }
  Venue.init({
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    lat: {
      type: DataTypes.DECIMAL(9, 7),
      allowNull: false
    },
    long: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: false
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
    scopes: {
      eventRoutes: {
        attributes: ['id', 'city', 'state']
      },
      eventIdRoutes: {
        attributes: ['id', 'address', 'city', 'state', 'lat', 'long']
      },
      allVenuesRoutes: {
        attributes: ['id', 'groupId', 'address', 'city', 'state', 'lat', 'long']
      }
    }
  });
  return Venue;
};
