const User = require("../models/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res) => {
  try {
    const existingAccount = await User.findOne({ email: req.body.email });
    if (existingAccount) {
      return res.status(409).json({
        message: "User with such email already exists."
      });
    } else {
      const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      });
      await user.save();
      res.status(201).end();
    }
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

exports.signIn = async (req, res) => {
  if (!req.body.email || !req.body.password) return res.status(400).send();
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({
        error: "Wrong email/password."
      });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res.status(401).json({ message: "Wrong email/password." });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: 86400
    });
    res.header("Authorization", `Bearer ${token}`);
    res.status(200).json({ username: user.username });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
