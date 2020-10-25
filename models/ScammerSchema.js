const mongoose = require("mongoose");

const ScammerSchema = mongoose.Schema({
  _id: { type: String, required: true },
  status: { type: String, enum: ["Scammer", "Warning"] },
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report" }],
});

module.exports = mongoose.model("Scammer", ScammerSchema);
