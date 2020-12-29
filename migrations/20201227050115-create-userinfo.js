'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Userinfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mail: {
        type: Sequelize.STRING
      },
      pass: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      calenddisplay: {
        type: Sequelize.BOOLEAN
      },
      selectart: {
        type: Sequelize.INTEGER
      },
      watchtime: {
        type: Sequelize.INTEGER
      },
      profileimg: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      profiletxt: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Userinfos');
  }
};