"use strict";
const bcrypt = require("bcryptjs");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			this.hasMany(models.Reviews, {
				foreignKey: "userEmail",
			});
			this.hasMany(models.FAQs, {
				foreignKey: "userEmail",
			});
			this.hasMany(models.Cart, {
				foreignKey: "userEmail",
			});
			this.hasMany(models.Orders, {
				foreignKey: "userEmail",
			});
		}

		validatePassword = async (password) => {
			const isValid = await bcrypt.compare(password, this.password);
			return isValid;
		};
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				primaryKey: true,
				unique: true,
				notNull: true,
			},
			password: DataTypes.STRING,
			role: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
