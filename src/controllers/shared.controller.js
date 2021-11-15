const { Category } = require("../database/models");

exports.getCategories = async (req, res, next) => {
  const categories = await Category.findAll();

  res.status(200).send({
    code: 200,
    status: true,
    data: categories,
  });
};
