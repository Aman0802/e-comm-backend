const router = require("express").Router();

const { Products, ProductImage } = require("../database/models");

const authRoutes = require("./auth.route");
const adminRoutes = require("./admin.route");
const userRoutes = require("./user.route");

router.use("/auth", authRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);

// Getting Products accessible to both user and admin
router.get("/products", async (req, res, next) => {
  try {
    const { productId, categoryId } = req.query;
    let products;
    if (!productId && !categoryId) {
      products = await Products.findAll();
    } else if (productId) {
      products = await Products.findByPk(productId);
    } else if (categoryId) {
      products = await Products.findAll({
        where: {
          categoryId,
        },
      });
    }

    if (products) {
      if (Array.isArray(products)) {
        products = await Promise.all(
          products?.map(async (product) => {
            const productImages = await ProductImage.findAll({
              where: {
                productId: product.productId,
              },
            });
            console.log(productImages);
            return {
              ...product.dataValues,
              productImages,
            };
          })
        );
      } else {
        // console.log(products);
        const productImages = await ProductImage.findAll({
          where: {
            productId: products.productId,
          },
        });
        products = {
          ...products.dataValues,
          productImages,
        };
      }

      // products.map((product) => {
      //   console.log(product);
      // });

      return res.send({
        status: true,
        code: 200,
        data: products,
      });
    } else {
      res.send(400).send({
        status: true,
        code: 400,
        message: "No Products to Show in the inventory!",
      });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
