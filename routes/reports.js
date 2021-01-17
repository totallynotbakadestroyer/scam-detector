const express = require('express');
const router = express.Router();

const reportController = require("../controllers/reportController");

router.get("/reports", reportController.allUserReports);
router.post("/reports", reportController.newReport);
router.delete("/reports", reportController.deleteReport);
router.put("/reports", reportController.updateReport);

module.exports = router;
