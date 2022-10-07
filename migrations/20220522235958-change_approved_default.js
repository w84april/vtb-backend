'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Achievement', 'approved', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: 3,
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.changeColumn('Achievement', 'approved', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: 2,
    });
  },
};
