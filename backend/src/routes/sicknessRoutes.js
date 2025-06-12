const express = require("express");
const {
  createSicknessRecord,
  getAllSicknessRecords,
  getSicknessRecordById,
  updateSicknessRecord,
  deleteSicknessRecord,
} = require("../controllers/sicknessController");

const router = express.Router();

router.post("/", createSicknessRecord);
router.get("/", getAllSicknessRecords);
router.get("/:id", getSicknessRecordById);
router.patch("/:id", updateSicknessRecord);
router.delete("/:id", deleteSicknessRecord);

module.exports = router;
