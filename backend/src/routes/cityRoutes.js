const express = require("express");
const router = express.Router();
const cityController = require("../controllers/cityController");

// Create a new city
router.post("/", cityController.createCity);

// Get all cities
router.get("/", cityController.getAllCities);

// Get all cities by country ID
router.get("/get/dropdown/:countryId", cityController.getCitiesByCountryId);
// Get a single city by ID
router.get("/:id", cityController.getCityById);

// Update a city
router.patch("/:id", cityController.updateCity);

// Delete a city
router.delete("/:id", cityController.deleteCity);

module.exports = router;
