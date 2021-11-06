const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

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

app.use(bodyParser.urlencoded({ extended: false }));

// Middlewares
app.use(express.json());

// Routes
app.use("/api", routes);

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
