const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  exportData,
  importData,
  importMultipleData,
  getTables,
} = require("../controllers/data-controller");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "text/csv" || file.originalname.endsWith(".csv")) {
      cb(null, true);
    } else {
      cb(new Error("Only CSV files are allowed"), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Routes
router.get("/tables", getTables); // Get available tables
router.get("/export", exportData); // Export data (single table or all)
router.post("/import", upload.single("file"), importData); // Import data to specific table
router.post("/import/bulk", upload.array("files", 20), importMultipleData); // Bulk import multiple files

module.exports = router;
