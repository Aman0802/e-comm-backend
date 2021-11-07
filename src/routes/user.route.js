const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const jwt_decode = require("jwt-decode");
const axios = require("axios");
const { Wishlist } = require("../database/models");

const { FAQs, Reviews } = require("../database/models");

const router = require("express").Router();

router.get("/wishlist", async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  var { email } = jwt_decode(token);
  console.log(email);
  try {
    let wishlist = await Wishlist.findAll({
      where: {
        userEmail: email,
      },
    });
    // console.log(wishlist);
    wishlist = await Promise.all(
      wishlist.map(async ({ productId, wishlistId, userEmail }) => {
        const productDetail = await axios.get(
          `http://localhost:3000/api/products/?productId=${productId}`
        );
        return {
          wishlistId,
          product: productDetail.data.data,
          email: userEmail,
        };
      })
    );
    res.send({
      status: true,
      code: 200,
      data: wishlist,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/add-to-cart/:productId", () => {});

router.post("/wishlist", async (req, res, next) => {
  console.log("yooooooooo");
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);
  const { productId } = req.body;
  try {
    console.log("email", email);
    console.log("productId", productId);
    await Wishlist.create({
      wishlistId: uuidv4(),
      userEmail: email,
      productId,
    });
    res.send({
      code: 201,
      status: true,
      message: "Added to Wishlist Successfully!",
    });
  } catch (err) {
    console.log(err);
  }
});

router.get(
  "/reviews",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const reviews = await Reviews.findAll();
    return res.status(200).send({
      status: true,
      code: 200,
      reviews,
    });
  }
);

router.post(
  "/reviews/:productId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { productId } = req.params;
    const { stars, reviewContent } = req.body;
    const { email } = jwt_decode(token);

    const review = await Reviews.findAll({
      where: {
        productId,
        userEmail: email,
      },
    });

    if (review.length <= 0) {
      const response = await Reviews.create({
        reviewId: uuidv4(),
        userEmail,
        stars,
        reviewContent,
        productId,
      });

      return res.status(200).send({
        status: true,
        code: 200,
        productId,
        reviewId: response.reviewId,
        stars: response.stars,
        review: response.reviewContent,
      });
    }

    return res.status(201).send({
      status: true,
      code: 201,
      message: "Review already exists!",
      review: review[0],
    });
  }
);

router.post(
  "/ask-question/:productId",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    const { productId } = req.params;
    const { question } = req.body;
    const { email } = jwt_decode(token);

    // const questions = await FAQs.findAll({
    //     where: {
    //         productId,
    //     },
    // });
    if (!productId || !question) {
      return res.status(400).send({
        message: "Please enter a product ID or a question.",
      });
    }

    const insert = await FAQs.create({
      question,
      isAnswered: false,
      faqId: uuidv4(),
      productId,
      userEmail,
    });

    return res.status(200).send({
      status: true,
      code: 200,
      data: {
        Question: insert.question,
        faqId: insert.faqId,
        productId: insert.productId,
      },
    });
  }
);

module.exports = router;
