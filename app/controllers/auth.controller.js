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
        let token = jwt.sign({ id: user.id }, "azerty123" , {
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

  exports.signin = (req, res) => {
    User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then(user => {
        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
  
        let passwordIsValid = bcrypt.compare(
          req.body.password,
          user.password
        );
  
        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
          });
        }
  
        let token = jwt.sign({ id: user.id }, "azerty123", {
          expiresIn: 86400 // 24 hours
        });
  
       
  
          res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            accessToken: token
          });
  
      })
      .catch(err => {
        res.status(500).send({ message: err.message });
      });
  };