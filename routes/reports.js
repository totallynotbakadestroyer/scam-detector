const express = require('express');
const router = express.Router();

const reportController = require("../controllers/reportController");

router.get("/reports", reportController.allUserReports);
router.post("/reports", reportController.newReport);
router.delete("/reports/:id", reportController.deleteReport);
router.put("/reports/:id", reportController.updateReport);

module.exports = router;
