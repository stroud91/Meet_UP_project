'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {

    static associate(models) {
      Event.belongsTo(models.Venue, {
        foreignKey: "venueId",
        allowNull: true
      });

      Event.belongsTo(models.Group, {
        foreignKey: "groupId"
      });

      Event.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'event'
        },
        as: 'images'
      });
      
      Event.belongsToMany(models.User, {
        through: models.Attendance,
        foreignKey: "eventId"
      });
    }
  }
  Event.init({
    venueId: {
      type:DataTypes.INTEGER,
      allowNull:true,

    },
    groupId: {
      type:DataTypes.INTEGER,
      allowNull:false,

    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.ENUM("Online", "In person")
    },
    capacity: {
      type:DataTypes.INTEGER
    },
    price: {
      type:DataTypes.DECIMAL(10,2)
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
