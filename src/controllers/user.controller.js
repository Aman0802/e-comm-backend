const { v4: uuidv4 } = require("uuid");

const jwt_decode = require("jwt-decode");
const axios = require("axios");

const {
  FAQs,
  Reviews,
  Cart,
  Products,
  Wishlist,
  Category,
} = require("../database/models");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.getWishlist = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  var { email } = jwt_decode(token);
  try {
    // throw new Error('lmao fix dis');
    let wishlist = await Wishlist.findAll({
      where: {
        userEmail: email,
      },
    });
    wishlist = await Promise.all(
      wishlist.map(async ({ productId, wishlistId }) => {
        const productDetail = await axios.get(
          `http://localhost:3000/api/products/?productId=${productId}`
        );
        return {
          wishlistId,
          product: productDetail.data.data,
          // email: userEmail,
        };
      })
    );
    res.send({
      status: true,
      code: 200,
      data: wishlist,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};

exports.deleteWishlistItem = async (req, res, next) => {
  const { productId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);

  try {
    if (!productId) {
      throw new Error("Product Id is empty.");
    }

    const isproductThere = await Wishlist.findAll({ where: { productId } });
    if (isproductThere.length <= 0) {
      throw new Error("Specified product is not in your wishlist.");
    }

    const chibakuTensei = await Wishlist.destroy({
      where: {
        userEmail: email,
        productId,
      },
    });

    return res.status(201).send({
      status: true,
      code: 201,
      message: "Item removed succesfully.",
      data: chibakuTensei,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.addToWishlist = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);
  const { productId } = req.body;

  try {
    if (!productId) {
      throw new Error("No product id provided.");
    }

    const isproductThere = await Products.findAll({ where: { productId } });
    if (isproductThere.length <= 0) {
      throw new Error("Specified product does not exist.");
    }

    const isThere = await Wishlist.findAll({
      where: { userEmail: email, productId },
    });
    if (isThere.length > 0) {
      let newQty = parseInt(isThere[0].qty);
      newQty += 1;
      const update = await Wishlist.update(
        {
          qty: newQty,
        },
        {
          where: { userEmail: email, productId },
        }
      );
      return res.status(200).send({
        status: true,
        code: 200,
        update,
      });
    }

    // console.log("email", email);
    // console.log("productId", productId);
    await Wishlist.create({
      wishlistId: uuidv4(),
      userEmail: email,
      productId,
      qty: 1,
    });
    res.send({
      code: 201,
      status: true,
      message: "Added to Wishlist Successfully!",
    });
  } catch (err) {
    // console.log('houston we have a problem.');
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.getReviews = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const isproductThere = await Products.findAll({ where: { productId } });
    if (isproductThere.length <= 0) {
      throw new Error("Specified product does not exist.");
    }

    const reviews = await Reviews.findAll({
      where: {
        productId,
      },
    });
    return res.status(200).send({
      status: true,
      code: 200,
      data: reviews,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.deleteReviews = async (req, res, next) => {
  const { reviewId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);

  try {
    if (!reviewId) {
      throw new Error("Review ID is empty.");
    }

    const isThere = await Reviews.findAll({
      where: {
        userEmail: email,
        reviewId,
      },
    });

    if (isThere.length <= 0) {
      throw new Error("Review does not exists.");
    }

    const chibakuTensei = await Reviews.destroy({
      where: {
        userEmail: email,
        reviewId,
      },
    });

    return res.status(201).send({
      status: true,
      code: 201,
      message: "Review deleted successfully.",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.addReviews = async (req, res, next) => {
  const { productId } = req.params;
  const { stars, reviewContent } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);

  try {
    if (!productId || !stars || !reviewContent) {
      throw new Error("Product id, stars or review content is empty!");
    }

    const isProduct = await Products.findAll({ where: { productId } });
    if (isProduct.length <= 0) {
      throw new Error("Product does not exists.");
    }

    const review = await Reviews.findAll({
      where: {
        productId,
        userEmail: email,
      },
    });

    if (review.length <= 0) {
      const response = await Reviews.create({
        reviewId: uuidv4(),
        userEmail: email,
        stars,
        reviewContent,
        productId,
      });

      return res.status(200).send({
        status: true,
        code: 200,
        message: "Inserted Successfully",
        data: {
          reviewId: response.reviewId,
        },
      });
    }

    // return res.status(201).send({
    //   status: true,
    //   code: 201,
    //   message: "Review already exists!",
    //   review: review[0],
    // });

    throw new Error("Review already exists!");
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.getFAQs = async (req, res, next) => {
  const { productId } = req.params;
  try {
    if (!productId) {
      throw new Error("Product ID is not provided.");
    }

    const isProduct = await Products.findAll({ where: { productId } });
    if (isProduct.length <= 0) {
      throw new Error("Product does not exists.");
    }

    const faqs = await FAQs.findAll({
      where: {
        productId,
        isAnswered: true,
      },
    });
    return res.status(200).send({
      status: true,
      code: 200,
      data: faqs,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.deleteFAQs = async (req, res, next) => {
  const { faqId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);

  try {
    if (!faqId) {
      throw new Error("FAQ ID is empty.");
    }

    const isThere = await FAQs.findAll({
      where: {
        faqId,
        userEmail: email,
      },
    });

    if (isThere.length <= 0) {
      throw new Error("FAQ does not exists.");
    }

    const chibakuTensei = await FAQs.destroy({
      where: {
        faqId,
        userEmail: email,
      },
    });

    return res.status(201).send({
      status: true,
      code: 201,
      message: "FAQ successfully deleted.",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.addFAQs = async (req, res, next) => {
  const { productId } = req.params;
  const { question } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);

  try {
    if (!productId || !question) {
      throw new Error("Product ID or question is empty.");
    }

    const isProduct = await Products.findAll({ where: { productId } });
    if (isProduct.length <= 0) {
      return res.status(400).send({
        message: "Product does not exists.",
      });
    }

    await FAQs.create({
      question,
      isAnswered: false,
      faqId: uuidv4(),
      productId,
      userEmail: email,
    });

    return res.status(200).send({
      status: true,
      code: 200,
      message: "Question added successfully",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);
  try {
    let cartItems = await Cart.findAll({ where: { userEmail: email } });
    cartItems = await Promise.all(
      cartItems.map(async ({ productId, cartId }) => {
        const productDetail = await axios.get(
          `http://localhost:3000/api/products/?productId=${productId}`
        );
        return {
          cartId,
          product: productDetail.data.data,
          // email: userEmail,
        };
      })
    );
    return res.status(200).send({
      status: true,
      code: 200,
      data: cartItems,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteCart = async (req, res, next) => {
  const { productId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);

  try {
    if (!productId) {
      throw new Error("Product ID is empy.");
    }

    const isproductThere = await Cart.findAll({
      where: {
        userEmail: email,
        productId,
      },
    });

    if (isproductThere.length <= 0) {
      throw new Error("Product does not exist in cart.");
    }

    const chibakuTensei = await Cart.destroy({
      where: {
        userEmail: email,
        productId,
      },
    });

    return res.status(201).send({
      status: true,
      code: 201,
      message: "Item successfully removed from cart.",
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  const { productId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);

  try {
    if (!email || !productId) {
      return res.status(400).send({
        status: false,
        code: 400,
        message: "Product ID is empty :(",
      });
    }

    const isproductThere = await Products.findAll({
      where: {
        productId,
      },
    });

    if (isproductThere.length <= 0) {
      throw new Error("Product does not exists.");
    }

    const isThere = await Cart.findAll({
      where: {
        userEmail: email,
        productId,
      },
    });
    if (isThere.length > 0) {
      let newQty = parseInt(isThere[0].qty);
      newQty += 1;
      console.log(newQty);
      const update = await Cart.update(
        {
          qty: newQty,
        },
        {
          where: { userEmail: email, productId },
        }
      );

      return res.status(200).send({
        status: true,
        code: 200,
        update,
      });
    }

    const add = await Cart.create({
      cartId: uuidv4(),
      productId,
      qty: 1,
      userEmail: email,
    });

    console.log("update:", update);

    return res.status(200).send({
      status: true,
      code: 200,
      data: update,
      message: "Insertion successfull.",
      item: add,
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 400;
    return next(error);
  }
};

exports.getCategoryProducts = async (req, res, next) => {
  try {
    let categories = await Category.findAll();
    console.log("categories: ", categories);

    categories = await Promise.all(
      categories.map(async ({ categoryId, categoryName }) => {
        const productsDetails = await axios.get(
          `http://localhost:3000/api/products/?categoryId=${categoryId}`
        );
        return {
          categoryId,
          categoryName,
          products: productsDetails,
        };
      })
    );

    res.send({
      code: 200,
      status: true,
      data: categories,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.payment = async (req, res, next) => {
  const { product } = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: product.amount * 100,
        },
        quantity: product.quantity,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:4200/success",
    cancel_url: "http://localhost:4200/cancel",
  });

  res.json({ id: session.id });
};
