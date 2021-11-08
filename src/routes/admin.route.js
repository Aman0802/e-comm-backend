const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

const passport = require("../utils/passport");

const { checkRole } = require("../utils/checkRole");
const { Category, Products, FAQs } = require("../database/models");

// const {} = require("../controllers/admin.controller");

router.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  async (req, res, next) => {
    const categories = await Category.findAll();

    res.status(200).send({
      code: 200,
      status: true,
      data: categories,
    });
  }
);

router.post(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  async (req, res, next) => {
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
        categoryId: categories[0].categoryId,
      },
    });
  }
);

router.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  async (req, res, next) => {
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
  }
);

router.delete("/products/:productId", () => {});

router.put("/products/:productId", () => {});

router.delete("/reviews/:reviewId", () => {});

router.get(
  "/questions",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  async (req, res, next) => {
    const questions = await FAQs.findAll();
    return res.status(200).send({
      questions,
    });
  }
);

router.post(
  "/questions/:questionId",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  async (req, res, next) => {
    const { questionId } = req.params;
    const { answer } = req.body;

    if (!questionId) {
      return res.status(400).send({
        message: "Please provide a question ID.",
      });
    }

    if (!answer) {
      return res.status(400).send({
        status: false,
        code: 400,
        message: "Please provide an answer.",
      });
    }

    const response = await FAQs.update(
      {
        answer,
        isAnswered: true,
      },
      {
        where: { faqId: questionId },
      }
    );
    return res.status(200).send({
      code: 200,
      status: true,
      data: {
        questionId: response.faqId,
        question: response.question,
        answer: response.answer,
      },
    });
  }
);

module.exports = router;
