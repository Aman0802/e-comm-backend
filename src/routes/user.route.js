const { v4: uuidv4 } = require("uuid");
const passport = require("passport");
const jwt_decode = require("jwt-decode");
const axios = require("axios");

const { checkRole } = require('../utils/checkRole');

const { Wishlist } = require("../database/models");
const { FAQs, Reviews, Cart, Products } = require("../database/models");

const router = require("express").Router();

router.get("/wishlist", passport.authenticate('jwt', { session: false }), checkRole('user'), async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  var { email } = jwt_decode(token);
  console.log(email);
  try {
    let wishlist = await Wishlist.findAll({
      where: {
        userEmail: email,
      },
    });
    let qty = wishlist[0].dataValues.qty;
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
    // console.log(wishlist[0]);
    res.send({
      status: true,
      code: 200,
      data: wishlist,
      qty
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/wishlist", passport.authenticate('jwt', { session: false }), checkRole('user'), async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);
  const { productId } = req.body;
  try {

    const isThere = await Wishlist.findAll({ where: { userEmail: email, productId}});
    if(isThere.length > 0) {
      let newQty = parseInt(isThere[0].qty);
      newQty += 1;
      const update = await Wishlist.update({
        qty: newQty
      }, 
      {
        where: { userEmail: email, productId}
      });
      
      return res.status(200).send({
        status: true,
        code: 200,
        update
      });
    }

    console.log("email", email);
    console.log("productId", productId);
    await Wishlist.create({
      wishlistId: uuidv4(),
      userEmail: email,
      productId,
      qty: 1
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
    const token = req.headers.authorization.split(" ")[1];
    const { email } = jwt_decode(token);

    const isProduct = await Products.findAll({ where: {productId } } );
    if(isProduct.length <= 0){
      return res.status(400).send({
        message: "Product does not exists."
      });
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
    const token = req.headers.authorization.split(" ")[1];
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

    const isProduct = await Products.findAll({ where: {productId } } );
    if(isProduct.length <= 0){
      return res.status(400).send({
        message: "Product does not exists."
      });
    }

    const insert = await FAQs.create({
      question,
      isAnswered: false,
      faqId: uuidv4(),
      productId,
      userEmail: email,
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

router.get('/cart', passport.authenticate('jwt', { session: false }), checkRole("user"), async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);
  const cartItems = await Cart.findAll({ where: { userEmail: email }});
  return res.status(200).send({
    status: true,
    code: 200,
    cartItems
  });
});

router.post('/cart', passport.authenticate('jwt', { session: false }), checkRole("user"), async (req, res, next) => {
  const { productId } = req.body;
  const token = req.headers.authorization.split(" ")[1];
  const { email } = jwt_decode(token);
  
  if(!email || !productId) {
    return res.status(400).send({
      status: false,
      code: 400,
      message: "Product ID or user email is empty :("
    });
  }

  const isThere = await Cart.findAll({ where: { userEmail: email, productId}});
  if(isThere.length > 0) {
    let newQty = parseInt(isThere[0].qty);
    newQty += 1;
    console.log(newQty);
    const update = await Cart.update({
      qty: newQty
    }, 
    {
      where: { userEmail: email, productId}
    });

    return res.status(200).send({
      status: true,
      code: 200,
      update
    });
  }

  const add = await Cart.create({
    cartId: uuidv4(),
    productId,
    qty: 1,
    userEmail: email
  });

  return res.status(200).send({
    status: true,
    code: 200,
    message: "Insertion successfull.",
    item: add
  })
});

module.exports = router;
