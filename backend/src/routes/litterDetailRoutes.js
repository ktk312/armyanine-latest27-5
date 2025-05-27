const express = require("express");
const router = express.Router();
const litterDetailController = require("../controllers/litterDetailController");

// Create a new litter detail
router.post("/", litterDetailController.createLitterDetail);

// Get all litter details
router.get("/", litterDetailController.getAllLitterDetails);

// Get a single litter detail by ID
router.get("/:id", litterDetailController.getLitterDetailById);

// Update a litter detail
router.patch("/:id", litterDetailController.updateLitterDetail);

// Delete a litter detail
router.delete("/:id", litterDetailController.deleteLitterDetail);

router.get("/list/with-puppies", litterDetailController.getLittersWithPuppies);

router.get("/search/registration", litterDetailController.filterLitters);

module.exports = router;
