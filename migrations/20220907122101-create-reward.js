'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Rewards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tier: {
        type: Sequelize.INTEGER
      },
      target: {
        type: Sequelize.INTEGER
      },
      reward: {
        type: Sequelize.STRING
      },
      challengeId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Challenges",
            key: 'id'
          },
          onUpdate: 'cascade',
          onDelete: 'cascade'
        }
      },
      maxSub: {
        type: Sequelize.INTEGER
      },
      subCount: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Rewards');
  }
};