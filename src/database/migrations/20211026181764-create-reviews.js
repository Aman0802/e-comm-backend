"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Reviews", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      reviewId: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      userEmail: {
        type: Sequelize.TEXT,
        references: {
          model: "Users",
          key: "email",
        },
      },
      stars: {
        type: Sequelize.FLOAT,
      },
      reviewContent: {
        type: Sequelize.STRING,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Reviews");
  },
};
