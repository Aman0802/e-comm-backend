const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const {
	Category,
	Products,
	FAQs,
	Reviews,
	ProductImage,
	Wishlist,
	Cart,
} = require("../database/models");

exports.getCategories = async (req, res, next) => {
	const categories = await Category.findAll();

	res.status(200).send({
		code: 200,
		status: true,
		data: categories,
	});
};

exports.addCategories = async (req, res, next) => {
	const { categoryName } = req.body;

	try {
		if (!categoryName) {
			throw new Error("Category name is empty.");
		}

		const categories = await Category.findAll({
			where: {
				categoryName,
			},
		});

		if (categories.length <= 0) {
			const response = await Category.create({
				categoryId: uuidv4(),
				categoryName,
			});
			return res.status(201).send({
				code: 201,
				status: true,
				data: {
					categoryId: response.categoryId,
				},
			});
		}

		return res.status(200).send({
			code: 200,
			status: true,
			data: {
				categoryId: categories[0].categoryId,
			},
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 400;
		return next(error);
	}
};

exports.addProducts = async (req, res, next) => {
	try {
		const {
			categoryId,
			productName,
			description,
			originalPrice,
			discountedPrice,
			productImages,
		} = req.body;

		if (
			!categoryId ||
			!productName ||
			!description ||
			!originalPrice ||
			!discountedPrice
		) {
			throw new Error("Fields are empty.");
		}

		if (!productImages) {
			throw new Error("PLease provide productImages array in body.");
		}

		const isCategory = await Category.findAll({
			where: {
				categoryId,
			},
		});
		if (isCategory.length <= 0) {
			throw new Error("The category does not exists.");
		}

		const isproductThere = await Products.findAll({
			where: {
				categoryId,
				productName,
			},
		});
		if (isproductThere.length > 0) {
			throw new Error(
				`Product with name: ${productName} already exists in category: ${categoryId}`
			);
		}

		const productId = uuidv4();

		const response = await Products.create({
			productId,
			categoryId,
			productName,
			description,
			originalPrice,
			discountedPrice,
		});

		if (productImages.length > 5) {
			throw new Error("Maximum number of images should not be more than 5.");
		}

		let lmaoDisShouldbeTrue = true;

		if (productImages.length > 1) {
			productImages.map(async (prodImage) => {
				try {
					if (prodImage === " ") {
						lmaoDisShouldbeTrue = false;
					} else {
						const chidori = await ProductImage.create({
							productImageId: uuidv4(),
							productId,
							productImageUrl: prodImage,
						});
					}
				} catch (err) {
					const error = new Error(err);
					error.httpStatusCode = 400;
					return next(error);
				}
			});
		} else {
			const chidoriii = await ProductImage.create({
				productId,
				productImageId: uuidv4(),
				productImageUrl:
					"https://www.insticc.org/node/TechnicalProgram/56e7352809eb881d8c5546a9bbf8406e.png",
			});
		}

		return res.status(201).send({
			code: 201,
			status: true,
			data: {
				productId: response.productId,
			},
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 400;
		return next(error);
	}
};

exports.deleteProduct = async (req, res, next) => {
	const { productId } = req.query;

	try {
		if (!productId) {
			throw new Error("Product ID is empty. (Like ur brain)");
		}

		const isproductThere = await Products.findAll({
			where: {
				productId,
			},
		});
		if (isproductThere.length <= 0) {
			throw new Error("Product does not exists.");
		}

		const shinraTensei = await FAQs.destroy({
			where: {
				productId,
			},
		});

		const edoTensei = await Reviews.destroy({
			where: {
				productId,
			},
		});

		const banshoTenin = await ProductImage.destroy({
			where: {
				productId,
			},
		});

		const kageBunshin = await Wishlist.destroy({
			where: {
				productId,
			},
		});

		const rasenShuriken = await Cart.destroy({
			where: {
				productId,
			},
		});

		const chibakuTensei = await Products.destroy({
			where: {
				productId,
			},
		});

		return res.status(201).send({
			status: true,
			code: 201,
			message: "Product successfully deleted.",
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 400;
		return next(error);
	}
};

exports.updateProduct = async (req, res, next) => {
	const { productId } = req.params;
	const {
		categoryId,
		productName,
		description,
		originalPrice,
		discountedPrice,
		newcategoryId,
	} = req.body;

	try {
		if (!categoryId && !productId) {
			throw new Error("Category ID or Product ID is empty");
		}

		if (!productName && !description && !originalPrice && !discountedPrice) {
			throw new Error("Product information is empty.");
		}

		const isCategory = await Category.findAll({
			where: {
				categoryId,
			},
		});
		if (isCategory.length <= 0) {
			throw new Error("Category does not exists.");
		}

		const isInCategory = await Products.findAll({
			where: {
				categoryId,
				productId,
			},
		});
		if (isInCategory.length <= 0) {
			throw new Error("The product does not exists in this category.");
		}

		const rinneRebirth = await Products.update(
			{
				// categoryId: newcategoryId,
				productName,
				description,
				originalPrice,
				discountedPrice,
			},
			{
				where: {
					productId,
				},
			}
		);

		return res.status(201).send({
			status: true,
			code: 201,
			message: "Product successfully updated.",
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 400;
		// console.log(error);
		return next(error);
	}
};

exports.getQuestions = async (req, res, next) => {
	const questions = await FAQs.findAll();
	return res.status(200).send({
		questions,
	});
};

exports.answerQuestion = async (req, res, next) => {
	const { faqId } = req.params;
	const { answer } = req.body;

	try {
		if (!faqId) {
			throw new Error("FAQ ID is empty.");
		}

		if (!answer) {
			throw new Error("Answer content is empty.");
		}

		const isThere = await FAQs.findAll({
			where: {
				faqId,
			},
		});
		if (isThere.length <= 0) {
			throw new Error("FAQ does not exists.");
		}

		const response = await FAQs.update(
			{
				answer,
				isAnswered: true,
			},
			{
				where: { faqId },
			}
		);
		return res.status(200).send({
			code: 200,
			status: true,
			data: {
				questionId: response.faqId,
				question: response.question,
				answer: response.answer,
			},
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 400;
		return next(error);
	}
};

exports.addProductImages = async (req, res, next) => {
	const { imgUrl, productId } = req.body;

	try {
		if (!productId || !imgUrl) {
			throw new Error("imgUrl and productId cannot be empty.");
		}

		const response = await ProductImage.create({
			productImageId: uuidv4(),
			productImageUrl: imgUrl,
			productId,
		});
		return res.status(201).send({
			code: 201,
			status: true,
			data: {
				productImageId: response.productImageId,
			},
		});
	} catch (err) {
		const error = new Error(err);
		error.httpStatusCode = 400;
		return next(error);
	}
};
