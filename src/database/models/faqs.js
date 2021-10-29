"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FAQs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Products, {
        foreignKey: "productId",
      });
      this.belongsTo(models.User, {
        foreignKey: "userEmail",
      });
    }
  }
  FAQs.init(
    {
      question: DataTypes.STRING,
      answer: DataTypes.STRING,
      isAnswered: DataTypes.BOOLEAN,
      faqID: {
        type: DataTypes.UUID,
        primaryKey: true,
        unique: true,
        notNull: true,
      },
      productID: {
        type: DataTypes.UUID,
        references: {
          model: "Product",
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
      modelName: "FAQs",
    }
  );
  return FAQs;
};
