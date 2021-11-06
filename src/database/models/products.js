'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    categoryID: DataTypes.UUID,
    productID: {
      type: DataTypes.UUID,
      primaryKey: true,
      notNull: true,
      unique: true
    },
    productName: DataTypes.STRING,
    description: DataTypes.STRING,
    originalPrice: DataTypes.FLOAT,
    discountedPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};