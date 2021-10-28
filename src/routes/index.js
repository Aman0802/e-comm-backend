const router = require("express").Router();

const authRoutes = require("./auth.route");
// const adminRoutes = require("./admin.route");
// const userRoutes = require("./user.route");

router.use("/auth", authRoutes);
// router.use("/admin", adminRoutes);
// router.use("/user", userRoutes);

// Getting Products accessible to both user and admin
router.get("/products", () => {});

router.get("/products?productId=:productId", () => {});

router.get("/products?categoryId=:categoryId", () => {});

module.exports = router;
