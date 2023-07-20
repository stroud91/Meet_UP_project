'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {

    static associate(models) {
      Group.belongsToMany(models.User, {
        through: models.Membership,
        foreignKey: "groupId"
      });

      Group.hasMany(models.Membership, {
        foreignKey: "groupId",
        as: "groupMemberIds"
      });

      Group.belongsTo(models.User, {
        foreignKey: "organizerId",
        allowNull: false,
        as: "Organizer"
      });

      Group.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'group'
        },
        as: 'GroupImages'
      });

      Group.hasMany(models.Venue, {
        foreignKey: "groupId"
      });

      Group.hasMany(models.Event, {
        foreignKey: 'groupId'
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
    scopes: {
      eventRoutes: {
        attributes: ['id', 'name', 'city', 'state']
      },
      eventIdRoutes: {
        attributes: ['id', 'name', 'private', 'city', 'state']
      },
      updateImageRoutes: {
        attributes: ['name', 'about', 'type', 'private', 'city', 'state']
      }
    }
  });
  return Group;
};
