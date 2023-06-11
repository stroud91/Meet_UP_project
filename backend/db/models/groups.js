'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {
      
      Group.belongsTo(models.User, {
        foreignKey: 'organizerId', as: "Organizer"
      })
      Group.hasMany(models.Venue, {
        foreignKey: 'groupId',
        onDelete: "CASCADE", hooks: true
      })

    }
  }
  Group.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 60]
      }
    },
    about: {
      type: DataTypes.TEXT,
      validate: {
        len: [50, 10000]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    organizerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('Online', 'In person')
    },
    private: {
      type: DataTypes.BOOLEAN
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Group',
  });
  return Group;
};
