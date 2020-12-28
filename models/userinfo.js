'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Userinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Userinfo.init({
    mail: DataTypes.STRING,
    pass: DataTypes.STRING,
    username: {
      type:DataTypes.STRING,
      defaultValue: "ななしさん"
    },
    calenddisplay: DataTypes.BOOLEAN,
    selectart: DataTypes.INTEGER,
    watchtime: DataTypes.INTEGER,
    profileimg: DataTypes.STRING,
    icon: DataTypes.STRING,
    profiletxt: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Userinfo',
  });
  return Userinfo;
};