'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Group, {
        through: models.Membership,
        foreignKey: "userId"
      });

      User.belongsToMany(models.Event, {
        through: models.Attendance,
        foreignKey: "userId"
      });

      User.hasMany(models.Group, {
        foreignKey: "organizerId"
      });

      User.hasMany(models.Membership, {
        foreignKey: "userId",
        as: "Membership"
      });

      User.hasMany(models.Attendance, {
        foreignKey: "userId",
        as: "Attendance"
      });
     }
  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        notEmpty: true
      },
      lastName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        notEmpty: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        organizer: {
          attributes: ['id', 'firstName', 'lastName']
        },
        userMembership: {
          attributes: ['id', 'firstName', 'lastName']
        },
        userAttendance: {
          attributes: ['id', 'firstName', 'lastName']
        }
      }
    }
  );
  return User;
};
