'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arttable extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Arttable.init({
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    scale: DataTypes.INTEGER,
    sawdate: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    onaired: {
      type:DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    created: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    ftxt: {
      type:DataTypes.STRING,
      defaultValue: "とても面白い！！"
    },
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Arttable',
  });
  return Arttable;
};