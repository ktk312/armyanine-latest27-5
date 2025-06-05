const express = require("express");
const {
  createDewormingRecord,
  getAllDewormingRecords,
  getDewormingRecordById,
  updateDewormingRecord,
  deleteDewormingRecord,
} = require("../controllers/dewormingController");

const router = express.Router();

router.post("/", createDewormingRecord);
router.get("/", getAllDewormingRecords);
router.get("/:id", getDewormingRecordById);
router.patch("/:id", updateDewormingRecord);
router.delete("/:id", deleteDewormingRecord);

module.exports = router;
