"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      categoryId: {
        type: Sequelize.UUID,
        references: {
          model: "Categories",
          key: "categoryId",
        },
      },
      productId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      productName: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      originalPrice: {
        type: Sequelize.FLOAT,
      },
      discountedPrice: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("Products");
  },
};
