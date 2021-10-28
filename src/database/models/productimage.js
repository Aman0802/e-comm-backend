"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Ima need these n̶u̶d̶e̶s̶  images to link to products to start the relationship ;)
    }
  }
  ProductImage.init(
    {
      productImageId: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      productImageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ProductImage",
    }
  );
  return ProductImage;
};
