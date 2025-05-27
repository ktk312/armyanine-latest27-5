const express = require("express");
const router = express.Router();
const breedController = require("../controllers/breedController");

// Create a new breed
router.post("/", breedController.createBreed);

// Get all breeds
router.get("/", breedController.getAllBreeds);

// Get a single breed by ID
router.get("/:id", breedController.getBreedById);

// Update a breed
router.put("/:id", breedController.updateBreed);

// Delete a breed
router.delete("/:id", breedController.deleteBreed);

module.exports = router;
