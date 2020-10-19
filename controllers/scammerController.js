const Scammer = require("../models/ScammerSchema");

exports.scammerStatus = function (req, res, next) {
  Scammer.findById(req.params.id).exec(function (err, scammer) {
    if (err) {
      return next(err);
    }
    res.send(scammer);
  });
};
