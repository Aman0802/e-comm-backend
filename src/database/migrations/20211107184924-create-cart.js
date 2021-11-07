'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      cartId: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false
      },
      productId: {
        type: Sequelize.UUID,
        references: {
          model: "Products",
          key: "productId",
        }
      },
      qty: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      userEmail: {
        type: Sequelize.TEXT,
        references: {
          model: "Users",
          key: "email",
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Carts');
  }
};