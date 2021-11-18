const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config();

// Importing Routes
const routes = require("./routes");

// Disable cross origin resource sharing when development was done.
app.use(
	cors({
		origin: true,
		credentials: true,
	})
);

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

// Routes
app.use("/api", routes);

// Error handling middleware
app.use((error, req, res, next) => {
	return res.status(error.httpStatusCode).send({
		code: error.httpStatusCode,
		message: error.message,
	});
});

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
