const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new city
const createCity = async (req, res) => {
  try {
    const { countryId, city, status } = req.body;

    const newCity = await prisma.city.create({
      data: {
          country: { connect: { idCountry: countryId } },
        city: city
      },
    });

    res.status(201).json(newCity);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all cities
const getAllCities = async (req, res) => {
  console.log("GET ALL CITIES API CALLED")
  try {
    const cities = await prisma.city.findMany({
      include: {
        country: true, // Include country details
      },
    });
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller method get Cities by country ID
const getCitiesByCountryId = async (req, res) => {
    console.log("GET ALL CITIES BY COUNTRY ID API CALLED")

  const {countryId} = req.params;  // Use query param and convert to number
  console.log("---country id ", countryId)
  if (!countryId) {
    return res.status(400).json({ error: "countryId query param is required and must be a number" });
  }

  try {
    const cities = await prisma.city.findMany({
      where: { countryId: parseInt(countryId) },
      include: { country: true },
    });

    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a city by ID
const getCityById = async (req, res) => {
  try {
    const { id } = req.params;

    const city = await prisma.city.findUnique({
      where: { id: parseInt(id) },
    });

    if (!city) {
      return res.status(404).json({ error: "City not found" });
    }

    res.status(200).json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a city
const updateCity = async (req, res) => {
  try {
    const { id } = req.params;
    const { country, city, status } = req.body;

    const updatedCity = await prisma.city.update({
      where: { id: parseInt(id) },
      data: {
        country,
        city,
        status,
      },
    });

    res.status(200).json(updatedCity);
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a city
const deleteCity = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.city.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
  getCitiesByCountryId,
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity
};