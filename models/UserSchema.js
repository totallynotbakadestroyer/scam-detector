const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  isBanned: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: false },
  role: { type: String, enum: ["Admin", "User"], default: "User" },
});

UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.hash(user.password, saltRounds, function (err, hashedPassword) {
    if (err) {
      return next(err);
    }
    user.password = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("User", UserSchema);
