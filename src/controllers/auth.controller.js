const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");
const passport = require('passport');

const { User } = require("../database/models");

exports.loginController = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findByPk(username);
    if (user) {
      // validate password
      const validPassword = await user.validatePassword(password);
      if (validPassword) {

        const token = await jwt.sign({
          email: user.email,
          role: user.role
        }, 
          process.env.USER_JWT_SECRET
        );

        res.status(200).send({
          code: 200,
          status: true,
          message: "Logged in Successfully",
          data: {
            accessToken: token
          }
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
  const { userEmail, password, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);
    await User.create({
      email: userEmail,
      password: hashedPassword,
      role
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
