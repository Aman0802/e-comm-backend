"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
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
      this.belongsTo(models.Product, {
        foreignKey: "productId",
      });
    }
  }
  Reviews.init(
    {
      reviewId: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      userEmail: {
        type: DataTypes.STRING,
        references: {
          model: "User",
          key: "email",
        },
      },
      stars: DataTypes.FLOAT,
      reviewContent: DataTypes.STRING,
      productId: {
        type: DataTypes.UUID,
        references: {
          model: "Products",
          key: "productId",
        },
      },
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};
