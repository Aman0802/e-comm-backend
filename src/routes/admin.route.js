const { v4: uuidv4 } = require("uuid");

const { Category, Products, FAQs } = require("../database/models");

const router = require("express").Router();

// const {} = require("../controllers/admin.controller");

router.get('/categories', async (req, res, next) => {
  const categories = await Category.findAll();
  
  res.status(200).send({
    code: 200,
    status: true,
    data: categories
  });
});

router.post("/categories", async (req, res, next) => {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).send({
      code: 400,
      status: false,
      message: "Fill all the fields",
    });
  }

  const categories = await Category.findAll({
    where: {
      categoryName,
    },
  });

  if (categories.length <= 0) {
    const response = await Category.create({
      categoryId: uuidv4(),
      categoryName,
    });
    return res.status(201).send({
      code: 201,
      status: true,
      data: {
        categoryId: response.categoryId,
      },
    });
  }
  
  return res.status(200).send({
    code: 200,
    status: true,
    data: {
      categoryId: categories[0].categoryId
    },
  });
});

router.post("/products", async (req, res, next) => {
  const {
    categoryId,
    productName,
    description,
    originalPrice,
    discountedPrice,
  } = req.body;

  if (
    !categoryId ||
    !productName ||
    !description ||
    !originalPrice ||
    !discountedPrice
  ) {
    return res.status(400).send({
      code: 400,
      status: false,
      message: "Fill all the fields",
    });
  }
  const response = await Products.create({
    productId: uuidv4(),
    categoryId,
    productName,
    description,
    originalPrice,
    discountedPrice,
  });
  return res.status(201).send({
    code: 201,
    status: true,
    data: {
      productId: response.productId,
    },
  });
});

router.delete("/products/:productId", () => {});

router.put("/products/:productId", () => {});

router.delete("/reviews/:reviewId", () => {});

router.post("/answer-question/:questionId", async (req, res, next) => {
  const { questionId } = req.query;
  const { answer } = req.body;
  
  if(!answer){
    return res.status(400).send({
      status: false,
      code: 400,
      message: "Please provide an answer."
    });
  }

  const question = await FAQs.findAll({
    where: {
      questionId,
    },
  });

  if (question.isAnswered){
    return res.status(201).send({
      status: true,
      code: 201,
      data: quesion[0]
    });
  }

  question.answer = answer;
  const response = await question.save();
  return res.status(200).send({
    code: 201,
    status: true,
    data: {
      response
    },
  });
});

module.exports = router;
