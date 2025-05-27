const express = require("express");
const { lineBreeding } = require("../controllers/linebreedingController");
const router = express.Router();

// Create a new dog
router.post("/breeding/:id", lineBreeding);



module.exports = router;
