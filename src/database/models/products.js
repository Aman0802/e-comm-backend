"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });
      this.hasMany(models.Reviews, {
        foreignKey: "productId",
      });
      this.hasMany(models.ProductImage, {
        foreignKey: "productId",
      });
      this.hasMany(models.FAQs, {
        foreignKey: "productId",
      });
      this.hasMany(models.Cart, {
        foreignKey: "productId"
      });
    }
  }
  Products.init(
    {
      categoryId: {
        type: DataTypes.UUID,
        references: {
          model: "Category",
          key: "categoryId",
        },
      },
      productId: {
        type: DataTypes.UUID,
        primaryKey: true,
        notNull: true,
        unique: true,
      },
      productName: DataTypes.STRING,
      description: DataTypes.STRING,
      originalPrice: DataTypes.FLOAT,
      discountedPrice: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
