'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
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
  };
  Cart.init({
    cartId: { 
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      unique: true
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
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};