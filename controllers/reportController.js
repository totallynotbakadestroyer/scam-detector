const Report = require("../models/ReportSchema");

exports.newReport = async (req, res) => {
  const report = new Report({
    creator: req.user.userId,
    ...req.body
  });
  try {
    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (e) {
    console.log(e);
    res.status(400).json({
      error: e.message
    });
  }
};

exports.deleteReport = async (req, res) => {
  const id = req.params.id;
  const report = await Report.findById(id);
  if (!report) {
    return res
      .status(400)
      .json({ error: "Report with provided id does not exist" });
  }
  if (report.status === "approved") {
    return res.status(403).json({
      error:
        "Due to platform principles only pending or rejected reports are deletable"
    });
  }
  try {
    await report.remove();
    res.status(204).end();
  } catch (e) {
    return req.status(400).json({
      error: e.message
    });
  }
};

exports.allUserReports = async (req, res) => {
  const userId = req.user.userId;
  try {
    const reports = await Report.find({ creator: userId });
    res.json(reports);
  } catch (e) {
    res.json({ error: e.message });
  }
};

exports.updateReport = async (req, res) => {
  const id = req.params.id;
  const updatedReport = req.body;
  const report = await Report.findById(id);
  if (!report) {
    return res
      .status(400)
      .json({ error: "Report with provided id does not exist" });
  }
  if (report.status !== "pending") {
    return res.status(403).json({
      error:
        "Due to platform principles you can update only pending reports."
    });
  }
  try {
    const result = await Report.findByIdAndUpdate(id, updatedReport, {
      new: true
    });
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
