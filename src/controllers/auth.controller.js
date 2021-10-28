const bcrypt = require("bcryptjs");

const { User } = require("../database/models");

exports.loginController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByPk(username);
    if (user) {
      // validate password
      const validPassword = await user.validatePassword(password);
      if (validPassword) {
        res.status(200).send({
          code: 200,
          status: true,
          message: "Logged in Successfully",
        });
      }
    } else {
      res.status(400).send({
        code: 400,
        status: true,
        message: "User not found!",
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.registerController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);
    await User.create({
      username,
      password: hashedPassword,
    });

    res.status(200).send({
      code: 200,
      status: true,
      message: "User created Successfully",
    });
  } catch (err) {
    console.log(err);
  }
};
