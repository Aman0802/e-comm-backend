const router = require("express").Router();

const passport = require("../utils/passport");
const { checkRole } = require("../utils/checkRole");

const {
	getCategories,
	addCategories,
	addProducts,
	deleteProduct,
	updateProduct,
	getQuestions,
	answerQuestion,
	addProductImages,
} = require("../controllers/admin.controller");

router.get(
	"/categories",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	getCategories
);

router.post(
	"/categories",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	addCategories
);

router.post(
	"/products",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	addProducts
);

router.delete(
	"/products",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	deleteProduct
);

router.put(
	"/products/:productId",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	updateProduct
);

// router.delete("/reviews/:reviewId", () => {}); THIS ROUTE IS WORKING FOR BOTH ROLES IN "user.route.js"

router.get(
	"/questions",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	getQuestions
);

router.post(
	"/questions/:faqId",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	answerQuestion
);

router.post(
	"/product-images",
	passport.authenticate("jwt", { session: false }),
	checkRole("admin"),
	addProductImages
);

module.exports = router;
