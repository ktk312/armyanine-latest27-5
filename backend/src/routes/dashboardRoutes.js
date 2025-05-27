const express = require("express");
const dashboardController = require("../controllers/dashboardController");

const router = express.Router();
router.get("/state", dashboardController.dogStats);
router.get("/monthly/whelping", dashboardController.monthlyWhelpingState);
module.exports = router;
