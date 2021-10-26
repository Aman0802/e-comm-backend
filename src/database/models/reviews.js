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
    }
  }
  Reviews.init(
    {
      reviewId: {
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        allowNull: false,
      },
      userEmail: DataTypes.STRING,
      stars: DataTypes.FLOAT,
      reviewContent: DataTypes.STRING,
      productId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Reviews;
};
