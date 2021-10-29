const { v4: uuidv4 } = require('uuid');

const { FAQs, Reviews } = require('../database/models');

const router = require("express").Router();

// const {} = require("../controllers/user.controller");

router.post("/add-to-cart/:productId", () => {});

router.post("/add-to-wishlist/:productId", () => {});

router.get("/reviews", () => {});

router.post("/reviews/:productId", () => {});

router.post("/ask-question/", async (req, res, next) => {
    const { productId } = req.query;
    const { question } = req.body;
    const userEmail = "om@gmail.com";

    // const questions = await FAQs.findAll({
    //     where: {
    //         productId,
    //     },
    // });

    const insert = await FAQs.create({
        question,
        isAnswered: false,
        faqId: uuidv4(),
        productId,
        userEmail
    });

    return res.status(200).send({
        status: true,
        code: 200,
        data: {
            Question: insert.question,
            faqId: insert.faqId,
            productId: insert.productId
        },
    });

});

module.exports = router;
