const { response } = require('express');
const { v4: uuidv4 } = require('uuid');

const { FAQs, Reviews } = require('../database/models');

const router = require("express").Router();

// const {} = require("../controllers/user.controller");

router.post("/add-to-cart/:productId", () => {});

router.post("/add-to-wishlist/:productId", () => {});

router.get("/reviews", async (req, res, next) => {
    const reviews = await Reviews.findAll();
    return res.status(200).send({
        status: true,
        code: 200,
        reviews
    });
});

router.post("/reviews/:productId", async (req, res, next) => {
    const { productId } = req.params;
    const { stars, reviewContent } = req.body;
    const userEmail = "om@gmail.com";

    const review = await Reviews.findAll({
        where: {
            productId,
            userEmail
        },
    });

    if(review.length <= 0){
        const response = await Reviews.create({
            reviewId: uuidv4(),
            userEmail,
            stars,
            reviewContent,
            productId
        });
        
        return res.status(200).send({
            status: true,
            code: 200,
            productId,
            reviewId: response.reviewId,
            stars: response.stars,
            review: response.reviewContent
        });
    }

    return res.status(201).send({
        status: true,
        code: 201,
        message: "Review already exists!",
        review: review[0]
    })
});

router.post("/ask-question/:productId", async (req, res, next) => {
    const { productId } = req.params;
    const { question } = req.body;
    const userEmail = "om@gmail.com";

    // const questions = await FAQs.findAll({
    //     where: {
    //         productId,
    //     },
    // });
    if (!productId || !question){
       return res.status(400).send({
           message: "Please enter a product ID or a question."
       }); 
    }

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
