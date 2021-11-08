"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "aman.khubani@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "om@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          categoryId: uuidv4(),
          categoryName: "Mobile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
