const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.signup = async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const data = {
        username,
        email,
        password: await bcrypt.hash(password, 10)
      };
      
      //saving the user
      const user = await User.create(data);
   
      //if user details is captured
      //generate token with the user's id and the secretKey in the env file
      // set cookie with the token generated
      if (user) {
        let token = jwt.sign({ id: user.id }, config.auth.secret, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });
   
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send users details
        return res.status(201).send(user);
      } else {
        return res.status(409).send("Details are not correct");
      }
    } catch (error) {
      console.log(error);
    }
  }