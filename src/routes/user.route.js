const passport = require("passport");

const { checkRole } = require("../utils/checkRole");

const {
	getWishlist,
	deleteWishlistItem,
	addToWishlist,
	getReviews,
	deleteReviews,
	addReviews,
	getFAQs,
	deleteFAQs,
	addFAQs,
	getCart,
	deleteCart,
	addToCart,
	getCategoryProducts,
	decreaseCartQty,
	stripePayment,
} = require("../controllers/user.controller");

const router = require("express").Router();

router.get(
	"/wishlist",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	getWishlist
);

router.delete(
	"/wishlist",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	deleteWishlistItem
);

router.post(
	"/wishlist",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	addToWishlist
);

router.get(
	"/reviews/:productId",
	passport.authenticate("jwt", { session: false }),
	getReviews
);

router.delete(
	"/reviews",
	passport.authenticate("jwt", { session: false }),
	checkRole("user", "role"),
	deleteReviews
);

router.post(
	"/reviews/:productId",
	passport.authenticate("jwt", { session: false }),
	addReviews
);

router.get(
	"/faqs/:productId",
	passport.authenticate("jwt", { session: false }),
	getFAQs
);

router.delete(
	"/faqs",
	passport.authenticate("jwt", { session: false }),
	checkRole("user", "admin"),
	deleteFAQs
);

router.post(
	"/faqs/:productId",
	passport.authenticate("jwt", { session: false }),
	addFAQs
);

router.get(
	"/cart",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	getCart
);

router.delete(
	"/cart",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	deleteCart
);

router.post(
	"/decreaseQtyfromCart",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	decreaseCartQty
);

router.post(
	"/cart",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	addToCart
);

router.get(
	"/category-products",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"),
	getCategoryProducts
);

router.post("/stripe/payment",
	passport.authenticate("jwt", { session: false }),
	checkRole("user"), stripePayment);

module.exports = router;
