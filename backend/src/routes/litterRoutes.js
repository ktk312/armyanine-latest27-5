const express = require("express");
const router = express.Router();
const litterController = require("../controllers/litterController");

// Create a new litter
router.post("/", litterController.createLitter);

// Get all litters
router.get("/", litterController.getAllLitters);

// Get a single litter by ID
router.get("/:id", litterController.getLitterById);

// Update a litter
router.patch("/:id", litterController.updateLitter);

// Delete a litter
router.delete("/:id", litterController.deleteLitter);


router.get('/search/inspection', litterController.filterInspectionRequest);

module.exports = router;
