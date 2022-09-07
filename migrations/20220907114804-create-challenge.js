'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Challenges', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      brief: {
        type: Sequelize.TEXT
      },
      budget: {
        type: Sequelize.STRING
      },
      userId:  {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
            key: "id",
          },
          onUpdate: "cascade",
          onDelete: "cascade",
        },
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
    await queryInterface.dropTable('Challenges');
  }
};