const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new country
const createCountry = async (req, res) => {
  try {
    const { countryCode, countryName, currencyCode, continent } = req.body;

    const newCountry = await prisma.country.create({
      data: {
        countryCode,
        countryName,
        currencyCode,
        continent,
      },
    });

    res.status(201).json(newCountry);
  } catch (error) {
    console.error("Error creating country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await prisma.country.findMany();
    res.status(200).json(countries);
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a country by ID
const getCountryById = async (req, res) => {
  try {
    const { id } = req.params;

    const country = await prisma.country.findUnique({
      where: { idCountry: parseInt(id) },
    });

    if (!country) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error("Error fetching country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a country
const updateCountry = async (req, res) => {
  try {
    const { id } = req.params;
    const { countryCode, countryName, currencyCode, continent } = req.body;

    const updatedCountry = await prisma.country.update({
      where: { idCountry: parseInt(id) },
      data: {
        countryCode,
        countryName,
        currencyCode,
        continent,
      },
    });

    res.status(200).json({message:"Country Name Updated successfully",updatedCountry});
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a country
const deleteCountry = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.country.delete({
      where: { idCountry: parseInt(id) },
    });

    res.status(200).json({ message: "Country deleted successfully" });
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = {
    createCountry,
    getAllCountries,
    getCountryById,
    updateCountry,
    deleteCountry
  };