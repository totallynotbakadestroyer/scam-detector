const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.signUp = function (req, res, next) {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length > 0) {
        res.status(409).json({
          message: "User with such email already exists.",
        });
      } else {
        bcrypt.hash(req.body.password, saltRounds, (err, hashedPassword) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              email: req.body.email,
              username: req.body.username,
              password: hashedPassword,
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
        });
      }
    });
};
