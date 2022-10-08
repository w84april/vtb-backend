'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
        'User_Event',
        {
          createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
          },
          done: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
            defaultValue: false
          },
          approve: {
            type: Sequelize.ENUM('pending', 'rejected', 'accepted'),
            allowNull: false,
            validate: {
              notEmpty: true,
            },
            defaultValue: 'pending'
          },
          UserId: {
            type: Sequelize.UUID,
            privateKey: true
          },
          EventId: {
            type: Sequelize.UUID,
            primaryKey: true
          }
        }
    )
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('User_Event');
  }
};
