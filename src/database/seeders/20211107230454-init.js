"use strict";
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");

let categoryUUIDs = {
	laptops: uuidv4(),
	earphones: uuidv4(),
	mobile: uuidv4(),
	fridges: uuidv4(),
	tablets: uuidv4(),
	televisions: uuidv4(),
	mobileCovers: uuidv4(),
};

let productUUIDs = {
	sonyTv: uuidv4(),
	sonyEarphones: uuidv4(),
	pococ31: uuidv4(),
	xiomi11: uuidv4(),
	macbook: uuidv4(),
	redmi9A: uuidv4(),
	technoSpark: uuidv4(),
	iphone12: uuidv4(),
	asusZephyrus: uuidv4(),
	asusVivobook: uuidv4(),
	lg260l: uuidv4(),
	samsung580l: uuidv4(),
	fusion54g: uuidv4(),
	appleIpadPro: uuidv4(),
	appleIpadAir: uuidv4(),
	samsungFold3: uuidv4(),
	appleAirpodsPro: uuidv4(),
	appleAirpodsMax: uuidv4(),
	samsungBudsPro: uuidv4(),
	jblC115: uuidv4(),
	oneplusBulletsZ: uuidv4(),
	redmiSonicBass: uuidv4(),
	samsungTv: uuidv4(),
	narutoCover: uuidv4(),
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
				{
					categoryId: categoryUUIDs.fridges,
					categoryName: "Fridges",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					categoryId: categoryUUIDs.tablets,
					categoryName: "Tablets",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					categoryId: categoryUUIDs.televisions,
					categoryName: "Televisions",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					categoryId: categoryUUIDs.mobileCovers,
					categoryName: "Mobile Covers",
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
				{
					productId: productUUIDs.asusZephyrus,
					categoryId: categoryUUIDs.laptops,
					productName: "ASUS ROG Zephyrus G14",
					description: `14" (35.56 cms) FHD 120Hz, Ryzen 5 4600HS, GTX 1650Ti 4GB Graphics, Gaming Laptop (8GB/512GB SSD/Office 2019/Windows 10/Gray/Anime Matrix/1.7 Kg), GA401II-HE111TS`,
					originalPrice: 79990,
					discountedPrice: 89990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.asusVivobook,
					categoryId: categoryUUIDs.laptops,
					productName: "ASUS VivoBook 14 (2020)",
					description: `AMD Ryzen 3 3250U 35.56 cm (14-inch) FHD Thin and Light Laptop (4GB/256GB NVMe SSD/Integrated Graphics/Windows 10/MS Office 2019/Transparent Silver/1.6 kg)`,
					originalPrice: 43990,
					discountedPrice: 33990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.lg260l,
					categoryId: categoryUUIDs.fridges,
					productName: "LG 260L",
					description: `3 Star Smart Inverter Frost-Free Double Door Refrigerator (GL-S292RDSX, Dazzle Steel, Convertible)`,
					originalPrice: 34000,
					discountedPrice: 26990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.samsung580l,
					categoryId: categoryUUIDs.fridges,
					productName: "Samsung 580L",
					description: `Inverter Frost-Free French Door Side-by-Side Refrigerator (RF57A5032S9/TL, Refined Inox, Convertible)`,
					originalPrice: 87990,
					discountedPrice: 69990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.fusion54g,
					categoryId: categoryUUIDs.tablets,
					productName: "Fusion5 4G tablet",
					description: `4G Tablet (2GB RAM, 32GB Storage, Wi-Fi + 4G LTE + Voice Calling) (White, 10.1 Inch) 25.65 cm`,
					originalPrice: 15990,
					discountedPrice: 10990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.appleIpadPro,
					categoryId: categoryUUIDs.tablets,
					productName: "Apple iPad Pro",
					description: `Apple M1 chip (11-inch/27.96 cm, Wi-Fi + Cellular, 128GB) - Space Grey (3rd Generation)`,
					originalPrice: 85990,
					discountedPrice: 80990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.samsungFold3,
					categoryId: categoryUUIDs.mobile,
					productName: "Samsung Galaxy Z Fold3",
					description: `Main Display - 19.19cm (7'6") Infinity Flex Display with an Under Display Camera, Dynamic AMOLED 2X  with Adaptive Refresh Rate. Cover Display - 15.82cm (6.2”) Infinity-O Display, Switchable 60/120Hz
          Compatible with S Pen Fold Edition and S Pen Pro (Sold separately).
          5G Ready powered by Qualcomm Snapdragon 888 Octa-Core processor.
          IPX8 Rated for Water Resistance,  Corning Gorilla Glass Victus, Armor Aluminium frame
          Fingerprint Sensor (side) & Facial recognition. Dual Sim (1Nano Sim + 1 Nano Sim/eSIM)`,
					originalPrice: 171000,
					discountedPrice: 149990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.appleIpadAir,
					categoryId: categoryUUIDs.tablets,
					productName: "Apple iPad Air",
					description: `A14 Bionic chip (10.9-inch/27.69 cm, Wi-Fi, 256GB) - Rose Gold (4th Generation)`,
					originalPrice: 68990,
					discountedPrice: 63990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.appleAirpodsPro,
					categoryId: categoryUUIDs.earphones,
					productName: "Apple AirPods Pro",
					description: `Active noise cancellation for immersive sound,Transparency mode for hearing and connecting with the world around you,The wireless charging case delivers more than 24 hours of battery life`,
					originalPrice: 24330,
					discountedPrice: 20990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.appleAirpodsMax,
					categoryId: categoryUUIDs.earphones,
					productName: "Apple AirPods Max - Space Grey",
					description: `Apple-designed dynamic driver provides high-fidelity audio,Active Noise Cancellation blocks outside noise, so you can immerse yourself in music,Transparency mode for hearing and interacting with the world around you`,
					originalPrice: 49990,
					discountedPrice: 45990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.samsungBudsPro,
					categoryId: categoryUUIDs.earphones,
					productName: "Samsung Galaxy Buds Pro",
					description: `True wireless earbuds with Intelligent Active Noise Canceling (ANC) - seamlessly switch between noise canceling and fully adjustable ambient sound.Voice Detect instantly switches from ANC to Ambient sound when it hears your voice.2-way speakers with sound by AKG for balanced sound and wide frequency response. 11mm woofer for full bass, 6.5mm tweeter with low distortion for treble.Noise  free calls with three built-in microphones and the voice pickup unit.
          360 Audio for theater-like multichannel sound. Dolby HeadTracking support.IPX7 Water Resistance. Auto Switch to conveniently switch between Galaxy devices`,
					originalPrice: 14990,
					discountedPrice: 9999,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.jblC115,
					categoryId: categoryUUIDs.earphones,
					productName: "JBL C115",
					description: `TWS by Harman, True Wireless Earbuds with Mic, Jumbo 21 Hours Playtime with Quick Charge, True Bass, Dual Connect, Bluetooth 5.0, Type C & Voice Assistant Support for Mobile Phones (Black)`,
					originalPrice: 9999,
					discountedPrice: 3590,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.oneplusBulletsZ,
					categoryId: categoryUUIDs.earphones,
					productName: "OnePlus Bullets Wireless Z Bass Edition (Bold Black)",
					description: `The Bass Edition comes equipped with Bluetooth v5.0 and is fully compatible with all smartphones.`,
					originalPrice: 2599,
					discountedPrice: 1990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.redmiSonicBass,
					categoryId: categoryUUIDs.earphones,
					productName: "Redmi SonicBass",
					description: `SonicBass Wireless Earphones with Dual-Mic Noise Cancellation, IPX4 Splash Proof, Dual Pairing & 12 hrs of Playback Time (Black)`,
					originalPrice: 1599,
					discountedPrice: 1299,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.sonyTv,
					categoryId: categoryUUIDs.televisions,
					productName: "Sony Bravia 164 cm (65 inches)",
					description: `Resolution: 4K Ultra HD (3840 x 2160) | Refresh Rate: 60 hertz
          Connectivity: 4 HDMI ports to connect set top box, Blu Ray players, gaming console | 2 USB ports to connect hard drives and other USB devices,Sound : 20 Watts Output | X-Balanced Speaker| Bass Reflex speakers | Dolby Atmos | Ambient Optimization,Smart TV Features: Google TV | Voice Search | Google Play | Chromecast | Netflix | Prime Video | HDR Gaming | Additional Features: Apple Airplay | Apple Homekit |Alexa,Display: X1 | 4K HDR | Triluminos pro Display | 4K X-Reality Pro | Motionflow XR100`,
					originalPrice: 179990,
					discountedPrice: 111990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.samsungTv,
					categoryId: categoryUUIDs.televisions,
					productName: "Samsung 163 cm (65 inches) 4K Ultra HD Smart LED TV",
					description: `Resolution : 4K Ultra HD (3840 x 2160) | Refresh Rate : 60 Hertz
          Connectivity: 3 HDMI ports to connect set top box, Blu-ray speakers or a gaming console | 2 USB ports to connect hard drives or other USB devices | One Connect Box for all your connectivity needs
          Smart TV Features : Prime Video, Hotstar, Netflix, Zee5 and many more | PC Mode | Universal Guide | Web Browser | Screen Mirroring
          Sound: 20 Watts Output | Powerful Speakers with Dolby Digital Plus
          Display: HDR | Purcolor | HLG | Mega Contrast | Contrast Enhancer | UHD Dimming`,
					originalPrice: 145990,
					discountedPrice: 92990,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productId: productUUIDs.narutoCover,
					categoryId: categoryUUIDs.mobileCovers,
					productName:
						"Qaso Naruto Shippuden Doodle White Design Printed Slim Mobile Back Cover",
					description: `Qaso designs for iPhone 12 printed on matte finish surface results in high resolution designs printed in all 3 dimensions. Each mobile case is made from a shatterproof, superior quality polycarbonate durable impact resistant material that is reinforced for extra strength`,
					originalPrice: 350,
					discountedPrice: 200,
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
				{
					productImageId: uuidv4(),
					productId: productUUIDs.redmiSonicBass,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073824/wgvp4nnezaqrrq1yyibd.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.redmiSonicBass,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073870/kjlaspymzgtfr7ewjeyz.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.redmiSonicBass,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073894/mczffb4uxlu4oa5ga7eo.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.redmiSonicBass,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073908/fayogzqwjjqkryotqfp9.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073927/fvebswexcf78taeovab2.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073957/zkce2bjjwwvr85samuwg.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073977/ilpt1yk8nm1qt8gtcbuv.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637073986/eyarubq9h90xhw7brhml.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsung580l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074046/teplhdfs5oq1lxfh4u5q.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsung580l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074087/ypjvrbzfaqtlpmv3tfin.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsung580l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074105/q1bstfqlyy8uwahuzbew.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsung580l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074117/yyww20drqkskvlkrxkpa.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungBudsPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074140/ctt71imnngxfkwxmtkre.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungBudsPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074165/w9j9ogy2xurk2gsoazks.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungBudsPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074181/kod8em71elaadkqpmb5e.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsung580l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074195/ikfe7r8rlvx2mx1kpro1.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungFold3,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074218/gfflk7e0r5mn0bawuip1.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungFold3,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074243/iftjswmwjlm6ee0kpbuk.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungFold3,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074261/mrbhptcxq3olmcajbple.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.samsungFold3,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074276/ieyyywdcegyl2hwg85wb.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074297/vq8pnfnwhq9b3dbh9dfw.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074320/kbwiuricf5b9wpq9i4bh.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074332/epivljfilvjaneijevjs.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyTv,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074349/trs4wa53d2l1afbud2pe.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyEarphones,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074385/vwi2mqqhpy6medr1uuka.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyEarphones,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074417/h9gx5odqfsom872errmj.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyEarphones,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074429/nsf8hbtl3m7ndwoweb5s.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.sonyEarphones,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074440/vuuxkvdnppmmj7hnv3gb.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.technoSpark,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074462/k7jx54rlo36vie14ebtu.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.technoSpark,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074483/rchc8soyxhjohvh49tk0.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.technoSpark,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074495/ibd36kdpin7t6owp0jkx.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.technoSpark,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074512/lgxphsflhluepcrjdlxf.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.xiomi11,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074531/tahoiztxypzmrwv4avni.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.xiomi11,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074719/vb9c3tqm0imnmx5anfmv.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.xiomi11,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074737/tk9czumwzjhxat9vywho.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.xiomi11,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637074752/gaxoct4zwonzdllj82ls.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsMax,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092412/laa0sigwo4r3mja1v1wm.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsMax,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092424/gmpbu2kae6lae4cal7ur.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsMax,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092441/bzzl1vptwu0rdkr2w1zr.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsMax,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092457/xup7cxrwokafdy8pepvn.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092478/b94jc0fciwpoxmktjble.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092499/jxdtkmbmbvmorv9rgv4l.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092512/v7o7ylaxzvr5dfukyyhz.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleAirpodsPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092527/zubvpamf9r9xsw7wiewx.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadAir,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092545/irbnpytzuagpzxujozvo.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadAir,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092545/irbnpytzuagpzxujozvo.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadAir,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092580/hqgm6hepwrgr9mepovus.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadAir,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092599/e9xoj14xvs3nay637xf0.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092622/s38mwflsmhpb444nnq7x.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092642/k0felepoldmsfa3pvc2t.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092655/zwangj1inzfliyewlpwr.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.appleIpadPro,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092672/esme0vorqmesljhu5i9b.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.macbook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092729/a9bcwxavm5mrpkyxbygx.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.macbook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092745/jyidztwwvjzu9vjkazo6.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.macbook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092758/klsclf7hdhdwpvta16i7.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.macbook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092771/qvtfawuknwkrewzn3b9i.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.asusZephyrus,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092789/chsgtn31fg5rbgihqab2.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.asusZephyrus,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092807/t8k8sqno6yfyhihbdgrz.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.asusZephyrus,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092819/iquvikcqpkts91mk3txt.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.asusVivobook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092835/sd8wko6ppwjwbpxzy6kf.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.asusVivobook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092854/vqi9qkmeq1wjuciglo9t.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.asusVivobook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092866/psh86o5hocvyf6tieyzk.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.asusVivobook,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092866/psh86o5hocvyf6tieyzk.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.fusion54g,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637092991/xojgfjjg9ra2av2bqibn.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.fusion54g,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093028/cxocmfblmmcgn0hily4z.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.fusion54g,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093047/api4jy82ygwynrv9mlcq.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.fusion54g,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093078/ctkhfu9egsf62il36big.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.jblC115,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093101/m11czpsafjmw1nxcepjh.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.jblC115,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093325/fi5mriamgizi4badedhp.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.jblC115,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093341/t6anf9vvunbwghlab0ya.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.jblC115,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093359/qkavjubhsbl1iljcfqcy.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.lg260l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093380/homrapzeokmtykbi2hs8.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.lg260l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093400/kc5oxnnorvnovbyjy9ce.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.lg260l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093415/xrtp3na3udmhdeefbglv.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.lg260l,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093426/mofodngxbil2lpqlhqji.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.oneplusBulletsZ,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093446/nc3izmqfgkp4jbajbxe5.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.oneplusBulletsZ,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093468/neva3ih2qyq9aylwsyy8.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.oneplusBulletsZ,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093561/on7cwi098wcstcdoi6zi.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.oneplusBulletsZ,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093575/xxc5ai7woodx4ygigc8k.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.narutoCover,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093591/hc6nl4tt7z1oeubtsvkv.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.narutoCover,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093612/yxqufotjpwqlpgfxom6t.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.narutoCover,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093625/habhpyca78xhlqwdvpha.jpg",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					productImageId: uuidv4(),
					productId: productUUIDs.narutoCover,
					productImageUrl:
						"https://res.cloudinary.com/itachi-goat/image/upload/v1637093640/zhswf0ltls4knvd2bsif.jpg",
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
		await queryInterface.bulkDelete("Products", null, {});
		await queryInterface.bulkDelete("ProductImages", null, {});
		await queryInterface.bulkDelete("Reviews", null, {});
		await queryInterface.bulkDelete("FAQs", null, {});
	},
};
