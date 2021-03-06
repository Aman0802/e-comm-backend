const { v4: uuidv4 } = require("uuid");
const { DatabaseError } = require("sequelize");
const jwt_decode = require("jwt-decode");
const axios = require("axios");

const {
  FAQs,
  Reviews,
  Cart,
  Products,
  Wishlist,
  Category,
  Orders,
} = require("../database/models");
const orders = require("../database/models/orders");

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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};

exports.deleteWishlistItem = async (req, res, next) => {
  const { productId } = req.query;
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
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

    console.log(isThere);
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
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
      throw new Error("Product does not exists.");
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};

exports.getCart = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);
  try {
    let cartItems = await Cart.findAll({ where: { userEmail: email } });
    console.log(cartItems);
    cartItems = await Promise.all(
      cartItems.map(async ({ productId, cartId, qty }) => {
        const productDetail = await axios.get(
          `http://localhost:3000/api/products/?productId=${productId}`
        );
        return {
          cartId,
          product: productDetail.data.data,
          qty,
        };
      })
    );
    return res.status(200).send({
      status: true,
      code: 200,
      data: cartItems,
    });
  } catch (err) {
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};

exports.deleteCart = async (req, res, next) => {
  const { productId } = req.query;
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
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};

exports.decreaseCartQty = async (req, res, next) => {
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

    if (isproductThere[0].qty === 1) {
      console.log("is this working")
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
    }

    let newQty = parseInt(isproductThere[0].qty);
    console.log(newQty)
    newQty -= 1;
    const susanoo = await Cart.update(
      {
        qty: newQty,
      },
      {
        where: {
          productId,
          userEmail: email,
        },
      }
    );

    return res.status(201).send({
      status: true,
      code: 201,
      message: "Item quantity decreased by 1",
    });
  } catch (err) {
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};

exports.addToCart = async (req, res, next) => {
  const { productId, newQty } = req.body;
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

    // console.log("update:", update);

    return res.status(200).send({
      status: true,
      code: 200,
      message: "Insertion successfull.",
      item: add,
    });
  } catch (err) {
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};

exports.getCategoryProducts = async (req, res, next) => {
  try {
    let categories = await Category.findAll();

    categories = await Promise.all(
      categories.map(async ({ categoryId, categoryName }) => {
        const productsDetails = await axios.get(
          `http://localhost:3000/api/products/?categoryId=${categoryId}`
        );
        // console.log("Product Details", productsDetails.data.data);
        let updatedProducts = await Promise.all(
          productsDetails.data.data.map(async (product) => {
            const reviews = await Reviews.findAll({
              where: {
                productId: product.productId,
              },
            });
            let sumOfRating = 0,
              count = 0;
            reviews.map((review) => {
              sumOfRating += review.stars;
              count++;
            });
            const rating = sumOfRating / count;
            return {
              ...product,
              rating,
            };
          })
        );
        return {
          categoryId,
          categoryName,
          products: updatedProducts,
        };
      })
    );

    console.log("yo");

    res.send({
      code: 200,
      status: true,
      data: categories,
    });
  } catch (err) {
    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};

exports.stripePayment = async (req, res, next) => {
  const token1 = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token1);

  //  This is Stripe's token
  const { amount, token } = req.body;

  try {
    const cartItems = await Cart.findAll({
      where: {
        userEmail: email,
      },
    });

    let total = 0;
    await Promise.all(
      cartItems.map(async (cartItem) => {
        const items = await Products.findAll({
          where: {
            productId: cartItem.productId,
          },
        });
        let amt = parseFloat(items[0].discountedPrice);
        console.log("qty" + cartItem.qty);
        total += amt * parseInt(cartItem.qty);
      })
    );
     total *= 100;
    if (total != amount) {
      throw new Error(
        "Amount to be paid is not equal to total price of products in the cart."
      );
    }

    stripe.charges.create(
      {
        amount: amount,
        currency: "INR",
        description: `Payement for user ${email}`,
        source: token.id,
      },
      async (err, charge) => {
        if (err) {
          console.log(err);
          const error = new Error(err);
          error.httpStatusCode = 400;
          next(error);
        } else {
          try {
            const orderId = uuidv4();
            // console.log("LMAO");
            await Promise.all(
              cartItems.map(async (cartItem) => {
                const adding = await Orders.create({
                  orderId,
                  productId: cartItem.productId,
                  qty: cartItem.qty,
                  userEmail: email,
                });
              })
            );

            const chibakuTensei = await Cart.destroy({
              where: {
                userEmail: email,
              },
            });

            res.json({
              success: true,
              status: "Payments Successfull!",
            });
          } catch (err) {
            if (err instanceof DatabaseError) {
              console.log(err);
              const error = new Error(err);
              error.httpStatusCode = 500;
              return next(error);
            } else {
              const error = new Error(err);
              error.httpStatusCode = 400;
              console.log(err);
              return next(error);
            }
          }
        }
      }
    );
  } catch (err) {

    if (err instanceof DatabaseError) {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    } else {
      const error = new Error(err);
      error.httpStatusCode = 400;
      return next(error);
    }
  }
};
