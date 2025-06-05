const express = require("express");
const {
  createTrainingRecord,
  getAllTrainingRecords,
  getTrainingRecordById,
  updateTrainingRecord,
  deleteTrainingRecord,
} = require("../controllers/trainingController");

const router = express.Router();

router.post("/", createTrainingRecord);
router.get("/", getAllTrainingRecords);
router.get("/:id", getTrainingRecordById);
router.patch("/:id", updateTrainingRecord);
router.delete("/:id", deleteTrainingRecord);

module.exports = router;
