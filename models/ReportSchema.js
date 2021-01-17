const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  review: { type: String, required: true },
  website: { type: String, enum: ["vk.com"], required: true },
  type: { type: String, enum: ["user", "group"], required: true },
  link: { type: String, required: true },
  status: {
    type: String,
    enum: ["approved", "pending", "rejected"],
    default: "pending",
    required: true,
  },
  description: String,
  proofs: {type: String, required: true},
  scammer: { type: mongoose.Schema.Types.ObjectId, ref: "Scammer" },
});

module.exports = mongoose.model("Report", ReportSchema);
