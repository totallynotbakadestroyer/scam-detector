const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, minLength: 6 },
  isBanned: { type: Boolean, default: false },
  isActivated: { type: Boolean, default: false },
  role: { type: String, enum: ['Admin', 'User'], default: 'User' }
});

module.exports = mongoose.model("User", UserSchema);
