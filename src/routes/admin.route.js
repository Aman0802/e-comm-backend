const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

const passport = require("../utils/passport");
const jwt_decode = require("jwt-decode");

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

    try {
      if (!categoryName) {
        throw new Error("Category name is empty.");
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
    } catch(err) {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
);

router.post(
  "/products",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  async (req, res, next) => {
    try{
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
        throw new Error("Fields are empty.");
      }

      const isCategory = await Category.findAll({
        where: {
          categoryId
        }
      });
      if(isCategory.length <= 0){
        throw new Error("Category does not exists.");
      }

      const isproductThere = await Products.findAll({
        where: {
          categoryId,
          productName
        }
      });
      if(isproductThere.length > 0){
        throw new Error(`Product with name: ${productName} already exists in category: ${categoryId}`);
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
    } catch(err) {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
);

// "message": "SequelizeForeignKeyConstraintError: update or delete on table \"Products\" violates foreign key constraint \"Reviews_productId_fkey\" on table \"Reviews\""
router.delete("/products", passport.authenticate('jwt', { session: false } ), checkRole('admin'), async (req, res, next) => {
  const { productId } = req.body;

  try {
    if(!productId){
      throw new Error("Product ID is empty. (Like ur brain)");
    }

    const isproductThere = await Products.findAll({
      where: {
        productId
      }
    });
    if(isproductThere.length <= 0){
      throw new Error("Product does not exists.");
    }

    const chibakuTensei = await Products.destroy({
      where: {
        productId
      }
    });

    return res.status(201).send({
      status: true,
      code: 201,
      message: "Product successfully deleted."
    });

  } catch(err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }

});

router.put("/products/:productId", passport.authenticate('jwt', { session: false } ), checkRole('admin'), async (req, res, next) => {
  const { productId } = req.params;
  const { categoryId, productName, description, originalPrice, discountedPrice, newcategoryId } = req.body;
  
  try {
    if(!categoryId && !productId){
      throw new Error("Category ID or Product ID is empty");
    }

    if(!productName && !description && !originalPrice && !discountedPrice){
      throw new Error("Product information is empty.");
    }

    const isCategory = await Category.findAll({
      where: {
        categoryId
      }
    });
    if(isCategory.length <= 0){
      throw new Error("Category does not exists.");
    }
    
    const isInCategory = await Products.findAll({
      where: {
        categoryId,
        productId
      }
    });
    if(isInCategory.length <= 0){
      throw new Error("The product does not exists in this category.");
    }

    const rinneRebirth = await Products.update({
      // categoryId: newcategoryId,
      productName,
      description,
      originalPrice,
      discountedPrice
    }, {
      where: {
        productId
      }
    });

    return res.status(201).send({
      status: true,
      code: 201,
      message: "Product successfully updated."
    });

  } catch(err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    console.log(error);
    return next(error);
  }

});

// router.delete("/reviews/:reviewId", () => {}); THIS ROUTE IS WORKING FOR BOTH ROLES IN "user.route.js"

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
  "/questions/:faqId",
  passport.authenticate("jwt", { session: false }),
  checkRole("admin"),
  async (req, res, next) => {
    const { faqId } = req.params;
    const { answer } = req.body;

    try {
      if (!faqId) {
        throw new Error("FAQ ID is empty.");
      }

      if (!answer) {
        throw new Error("Answer content is empty.");
      }

      const isThere = await FAQs.findAll({
        where: {
          faqId
        }
      });
      if(isThere.length <= 0){
        throw new Error("FAQ does not exists.");
      }

      const response = await FAQs.update(
        {
          answer,
          isAnswered: true,
        },
        {
          where: { faqId },
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
    } catch(err) {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
);

module.exports = router;
