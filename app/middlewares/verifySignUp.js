const express = require("express");
const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    User
      .findOne({
        // Cherche dans la BDD si il y ce username
        where: {username: req.body.username}
      })
      .then(user => {
        if (user) {
          // Si le username est utilisé, renvoie erreur 409
          res.status(409).send({
            message: "Désolé cet pseudo est déjà utilisé."
          });
          return;
        }
        User
          .findOne({
            where: {
              // Cherche dans la BDD si il y a cet email
              email: req.body.email
            }
          })
          .then(user => {
            if (user) {
              res.status(409).send({
                message: "Désolé cet email est déjà utilisé."
              });
              return;
            }
  
          next();
      });
    });
  };

  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  };

  module.exports = verifySignUp;