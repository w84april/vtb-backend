'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('User', {
      id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        primaryKey: true,
        defaultValue: Sequelize.DataTypes.UUIDV1,
      },
      firstName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      publicKey: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: false,
      },
      privateKey: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        defaultValue: false,
      },
      role: {
        type: Sequelize.DataTypes.ENUM('user', 'admin'),
        allowNull: false,
        defaultValue: 'user',
      },
      items: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false,
        defaultValue: []
      },
      helmet: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      armor: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      firstWeapon: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      secondWeapon: {
        type: Sequelize.INTEGER,
        allowNull: true,
        validate: {
          notEmpty: false,
        },
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('User');
  },
};
