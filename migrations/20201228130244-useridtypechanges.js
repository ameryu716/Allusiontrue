'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Arttables', 'user_id', {
        type: Sequelize.STRING,
      });
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Arttables', 'user_id', {
        type: Sequelize.INTEGER,
      });
  }
};