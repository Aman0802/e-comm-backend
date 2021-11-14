"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("Orders", {
			id: {
				allowNull: false,
				autoIncrement: true,
				type: Sequelize.INTEGER,
			},
			orderId: {
				type: Sequelize.UUID,
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			productId: {
				type: Sequelize.UUID,
				primaryKey: true,
				references: {
					model: "Products",
					key: "productId",
				},
			},
			userEmail: {
				type: Sequelize.TEXT,
				references: {
					model: "Users",
					key: "email",
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
		await queryInterface.dropTable("Orders");
	},
};
