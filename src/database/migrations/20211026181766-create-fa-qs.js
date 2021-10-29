"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("FAQs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      faqId: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        unique: true,
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      question: {
        type: Sequelize.STRING,
      },
      answer: {
        type: Sequelize.STRING,
      },

      userEmail: {
        type: Sequelize.TEXT,
        references: {
          model: "Users",
          key: "email",
        },
      },
      isAnswered: {
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable("FAQs");
  },
};
