'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //Polomorphic Relationship
      Image.belongsTo(models.Group, {
        foreignKey: 'imageableId',
        constraints: false,
        as: 'group'
      });
      Image.belongsTo(models.Event, {
        foreignKey: 'imageableId',
        constraints: false,
        as: 'event'
      });
    }
  }
  Image.init({
    imageURL: DataTypes.STRING,
    imageableId: DataTypes.INTEGER,
    imageableType: DataTypes.STRING,
    preview: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
