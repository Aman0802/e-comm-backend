"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

let categoryUUIDs = {
  laptops: uuidv4(),
  earphones: uuidv4(),
  mobile: uuidv4(),
};

let productUUIDs = {
  sonyEarphones: uuidv4(),
  pococ31: uuidv4(),
  xiomi11: uuidv4(),
  macbook: uuidv4(),
  redmi9A: uuidv4(),
  technoSpark: uuidv4(),
  iphone12: uuidv4(),
};

let goodReview = {
  stars: 4.5,
  reviewContent: "The product is good!!",
};

let averageReview = {
  stars: 3,
  reviewContent: "The product is useful but better products are available",
};

let badReview = {
  stars: 1,
  reviewContent: "Literally any other product than this is best!!",
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "aman.khubani@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "om@gmail.com",
          password: await bcrypt.hash("12345", 10),
          role: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Categories",
      [
        {
          categoryId: categoryUUIDs.mobile,
          categoryName: "Mobile",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: categoryUUIDs.laptops,
          categoryName: "Laptops",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          categoryId: categoryUUIDs.earphones,
          categoryName: "Earphones",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Products",
      [
        {
          productId: productUUIDs.pococ31,
          categoryId: categoryUUIDs.mobile,
          productName: "Poco C31",
          description:
            "4 GB RAM | 64 GB ROM | Expandable Upto 512 GB ,16.59 cm (6.53 inch) HD+ Display,13MP + 2MP + 2MP | 5MP Front Camera,5000 mAh Lithium-ion Polymer Battery,MediaTek Helio G35 Processor",
          originalPrice: 11999,
          discountedPrice: 9499,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: productUUIDs.xiomi11,
          categoryId: categoryUUIDs.mobile,
          productName: "Xiaomi 11 Lite NE 5G",
          description:
            "Processor: 5G enabled Qualcomm Snapdragon 778G with Kryo 670 Octa-core; 6nm process; Up to 2.4GHz clock speed; Liquidcool technology, Support for 12 5G bands , Camera: 64 MP Triple Rear camera with 8MP Ultra-wide and 5MP Super macro | 20 MP Front camera ,Display: 90Hz high refresh rate, 10-bit FHD+ OLED Dot display, 16.6 centimeters (6.55 inch), Dolby Vision support,Elegant design that is just 6.81mm slim and 158gms light, Memory, Storage & SIM, 6GB LPDDR4X RAM | 128GB UFS 2.2 storage",
          originalPrice: 31999,
          discountedPrice: 26499,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: productUUIDs.sonyEarphones,
          categoryId: categoryUUIDs.earphones,
          productName:
            "SONY WH-H910N Active noise cancellation enabled Bluetooth Headset  (Black, On the Ear)",
          description:
            "Bring home this pair of Sony headphones and enjoy a pleasurable listening experience with features such as Noise Cancellation, Quick Attention Mode, and Quick Charging. The 25-mm drivers reproduce a range of frequencies that range from low thumping bass beats to soaring vocals effortlessly.",
          originalPrice: 24990,
          discountedPrice: 17590,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: productUUIDs.redmi9A,
          categoryId: categoryUUIDs.mobile,
          productName: "Redmi 9A",
          description:
            "13MP rear camera with AI portrait, AI scene recognition, HDR, pro mode | 5MP front camera 16.58 centimeters (6.53 inch) HD+ multi-touch capacitive touchscreen with 1600 x 720 pixels resolution, 268 ppi pixel density and 20:9 aspect ratio Memory, Storage & SIM: 3GB RAM, 32GB internal memory expandable up to 512GB | Dual SIM (nano+nano) + Dedicated SD card slot Android v10 operating system with upto 2.0GHz clock speed Mediatek Helio G25 octa core processor 5000mAH lithium-polymer large battery with 10W wired charger in-box 1 year manufacturer warranty for device and 6 months manufacturer warranty for in-box accessories including batteries from the date of purchase",
          originalPrice: 8499,
          discountedPrice: 7999,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: productUUIDs.technoSpark,
          categoryId: categoryUUIDs.mobile,
          productName: "Tecno Spark 7T",
          description:
            "48MP AI Dual Rear Camera | 8MP Selfie Camera with Dual Front Flash,6000mAh Powerful Battery | 36 days standby,6.52HD+IPS display | 90.3% screen to body ratio,Helio G35 Gaming Processor, 720*1600 Resolution,3-in-1 SIM slot/ Fingerprint Sensor/ latest Android 11",
          originalPrice: 10999,
          discountedPrice: 8999,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: productUUIDs.macbook,
          categoryId: categoryUUIDs.laptops,
          productName: "APPLE Macbook Pro M1 Pro Chip",
          description:
            " 10-core CPU and 16-core GPU M1 Pro - 16 GB/1 TB SSD/Mac OS Monterey MK193HN/A  16.2 inch, Space Grey, 2.1 kg,16.2 inch Liquid Retina XDR display, Native resolution at 254 pixels per inch, Up to 1,000 nits sustained brightness, 1,600 nits peak brightness, 10,00,000:1 contrast ratio",
          originalPrice: 259900,
          discountedPrice: 249900,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productId: productUUIDs.iphone12,
          categoryId: categoryUUIDs.mobile,
          productName: "Apple iPhone 12 Pro",
          description:
            "6.1-inch (15.5 cm diagonal) Super Retina XDR display,Ceramic Shield, tougher than any smartphone glass,A14 Bionic chip, the fastest chip ever in a smartphone,Pro camera system with 12MP Ultra Wide, Wide and Telephoto cameras; 4x optical zoom range; Night mode, Deep Fusion, Smart HDR 3, Apple ProRAW, 4K Dolby Vision HDR recording,LiDAR Scanner for improved AR experiences, Night mode portraits,12MP TrueDepth front camera with Night mode, 4K Dolby Vision HDR recording,Industry-leading IP68 water resistance",
          originalPrice: 149900,
          discountedPrice: 114900,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "ProductImages",
      [
        {
          productImageId: uuidv4(),
          productId: productUUIDs.pococ31,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528635/ikr5wxrtjuscgqkg1k49.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.iphone12,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528828/gll67raxqiwfaysizjjh.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.redmi9A,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528734/xexphd0zzckvaaertlwu.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.redmi9A,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528700/jxg4c5hr6gjrfijjboto.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.xiomi11,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528346/tbtuvyaq3qjocpyvyq87.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.technoSpark,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528493/eajy2olfbmlq3pm6h11u.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.macbook,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528872/hcmptrcuwqvog2r85sbf.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.sonyEarphones,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528948/f5ffvmajvxughab0echp.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.macbook,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528898/ykixkz3tleo8lag0uhci.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.iphone12,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528789/yxjc6tiu6gbcpdd5noww.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.pococ31,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528606/anold3mcmevn4xuvpsld.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.technoSpark,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528581/jr5rgns8v8p2yvaotvo9.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.sonyEarphones,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528965/vbvqjbfpspd6cugntaco.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.technoSpark,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528543/ve7ub20hmlam2gmknoxi.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.macbook,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528912/ioikhypqqsjouhyb0uln.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.pococ31,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528649/azlglhayvlcsb4zywmk6.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.xiomi11,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528407/qn8t3cekrp4iyyevhelk.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.macbook,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528885/iykjyfqy0xu69z96f7f1.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.sonyEarphones,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528979/qdjbbtxtvox6s2wbjxzd.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.iphone12,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528811/zcvtre5xyeitpvv9mdmt.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.technoSpark,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528562/mgf28vxl4lrgsjhkkzno.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.xiomi11,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528438/kpgvx5mj7piihi5dfe22.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.iphone12,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528841/t9n3dn3aop1szcx6swvl.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.pococ31,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528662/ewdksfbprfmfthzsnzzj.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.sonyEarphones,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528992/varrcaii55gbfvopeqb0.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.xiomi11,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528463/stdm2pb22uop9zgm1zzq.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          productImageId: uuidv4(),
          productId: productUUIDs.redmi9A,
          productImageUrl:
            "https://res.cloudinary.com/itachi-goat/image/upload/v1636528718/p16ljnrs3jvdj9vzsauk.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      "Reviews",
      [
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.pococ31,
          stars: goodReview.stars,
          reviewContent: goodReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.pococ31,
          stars: averageReview.stars,
          reviewContent: averageReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.pococ31,
          stars: badReview.stars,
          reviewContent: badReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.xiomi11,
          stars: goodReview.stars,
          reviewContent: goodReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.xiomi11,
          stars: averageReview.stars,
          reviewContent: averageReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.xiomi11,
          stars: badReview.stars,
          reviewContent: badReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.sonyEarphones,
          stars: goodReview.stars,
          reviewContent: goodReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.sonyEarphones,
          stars: averageReview.stars,
          reviewContent: averageReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.sonyEarphones,
          stars: badReview.stars,
          reviewContent: badReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.redmi9A,
          stars: goodReview.stars,
          reviewContent: goodReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.redmi9A,
          stars: averageReview.stars,
          reviewContent: averageReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.redmi9A,
          stars: badReview.stars,
          reviewContent: badReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.technoSpark,
          stars: goodReview.stars,
          reviewContent: goodReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.technoSpark,
          stars: averageReview.stars,
          reviewContent: averageReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.technoSpark,
          stars: badReview.stars,
          reviewContent: badReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.macbook,
          stars: goodReview.stars,
          reviewContent: goodReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.macbook,
          stars: averageReview.stars,
          reviewContent: averageReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.macbook,
          stars: badReview.stars,
          reviewContent: badReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.iphone12,
          stars: goodReview.stars,
          reviewContent: goodReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.iphone12,
          stars: averageReview.stars,
          reviewContent: averageReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          reviewId: uuidv4(),
          userEmail: "aman.khubani@gmail.com",
          productId: productUUIDs.iphone12,
          stars: badReview.stars,
          reviewContent: badReview.reviewContent,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    await queryInterface.bulkInsert(
      "FAQs",
      [
        {
          faqId: uuidv4(),
          question: "Is the product worth its cost?",
          productId: productUUIDs.pococ31,
          answer: "YES, totally worth it!",
          userEmail: "aman.khubani@gmail.com",
          isAnswered: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
