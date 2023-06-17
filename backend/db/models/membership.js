'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Membership extends Model {

    static associate(models) {

      Membership.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      Membership.belongsTo(models.Group, {
        foreignKey: 'groupId',
      });

    }
  }
  Membership.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    status: {
      type: DataTypes.ENUM('co-host', 'member', 'pending'),
      allowNull : false
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Membership',
  });
  return Membership;
};
