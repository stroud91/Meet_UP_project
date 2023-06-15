'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Attendance extends Model {

    static associate(models) {

      Attendance.belongsTo(models.Event,
        { foreignKey: 'eventId' });

      Attendance.belongsTo(models.User,
        { foreignKey: 'userId' });


    }
  }
  Attendance.init({
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM({
        values: ['member', 'pending', 'waitlist', 'attending']
      })
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Attendance',
  });
  return Attendance;
};
