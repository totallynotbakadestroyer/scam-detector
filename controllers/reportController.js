const Report = require("../models/ReportSchema");

exports.newReport = function (req, res, next) {
  const report = new Report({
    creator: req.user.userId,
    review: req.body.review,
    website: req.body.website,
    type: req.body.type,
    link: req.body.link,
  });
  report
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).send();
    })
    .catch((err) => {
      res.status(400).json({
        message: err.message,
      });
    });
};
