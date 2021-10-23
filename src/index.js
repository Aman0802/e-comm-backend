const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();

// Routes
app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/register', require('./routes/register'));

// Port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));