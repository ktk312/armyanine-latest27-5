const express = require("express");
const {
  createProphylaxisRecord,
  getAllProphylaxisRecords,
  getProphylaxisRecordById,
  updateProphylaxisRecord,
  deleteProphylaxisRecord,
} = require("../controllers/prophylaxisController");

const router = express.Router();

router.post("/", createProphylaxisRecord);
router.get("/", getAllProphylaxisRecords);
router.get("/:id", getProphylaxisRecordById);
router.patch("/:id", updateProphylaxisRecord);
router.delete("/:id", deleteProphylaxisRecord);

module.exports = router;
