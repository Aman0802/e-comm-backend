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
    }

    validatePassword = async (password) => {
      const isValid = await bcrypt.compare(password, this.password);
      return isValid;
    };
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        notNULL: true,
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
