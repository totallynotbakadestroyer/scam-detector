const mongoose = require("mongoose");

const ScammerSchema = mongoose.Schema({
  _id: {type: String, required: true},
  status: { enum: ['Scammer', 'Warning'] },
});

ScammerSchema
  .virtual('url')
  .get(function () {
    return 'https://vk.com/id' + this._id;
  });

module.exports = mongoose.model('Scammer', ScammerSchema);
