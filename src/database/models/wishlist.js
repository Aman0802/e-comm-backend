"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Wishlist.init(
    {
      wishlistId: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      productId: {
        type: DataTypes.UUID,
        references: {
          model: "Products",
          key: "productId",
        },
      },
      qty: {
        type: DataTypes.INTEGER
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
      modelName: "Wishlist",
    }
  );
  return Wishlist;
};
