"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Orders extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.belongsTo(models.User, {
				foreignKey: "userEmail",
			});
			this.belongsTo(models.Products, {
				foreignKey: "productId",
			});
		}
	}
	Orders.init(
		{
			orderId: {
				type: DataTypes.UUID,
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
			productId: {
				type: DataTypes.UUID,
				primaryKey: true,
				references: {
					model: "Products",
					key: "productId",
				},
			},
			userEmail: {
				type: DataTypes.STRING,
				references: {
					model: "User",
					key: "email",
				},
			},
		},
		{
			sequelize,
			modelName: "Orders",
		}
	);
	return Orders;
};
