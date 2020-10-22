const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = function (req, res, next) {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        res.status(409).json({
          message: "User with such email already exists.",
        });
      } else {
        const user = new User({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        });
        user
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).send();
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: err,
            });
          });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.login = function (req, res, next) {
  User.findOne({ email: req.body.email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({
          message: "Wrong email/password.",
        });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err) {
            res.status(500).json({
              error: err,
            });
          } else {
            if (!result)
              return res.status(401).json({ message: "Wrong email/password." });
            else {
              let token = jwt.sign(
                { userId: user._id },
                process.env.SECRET_KEY,
                { expiresIn: 86400 }
              );
              res.header("Authorization", "Bearer " + token);
              res.status(200).send();
            }
          }
        });
      }
    });
};
