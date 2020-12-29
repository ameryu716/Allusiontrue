'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
      return queryInterface.addColumn('Arttables', 'user_id', Sequelize.INTEGER);
  },

  down: async (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('Arttables', 'user_id');
  }
};