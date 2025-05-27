const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new breed
const createBreed = async (req, res) => {
  try {
    const { groupId, breed, friendlyUrl, description, image, breedStandard, redirect, status } = req.body;
    const newBreed = await prisma.breed.create({
      data: {
        groupId,
        breed,
        friendlyUrl,
        description,
        image,
        breedStandard,
        redirect,
        status,
      },
    });

    res.status(201).json(newBreed);
  } catch (error) {
    console.error("Error creating breed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all breeds
const getAllBreeds = async (req, res) => {
  try {
    const breeds = await prisma.breed.findMany();
    res.status(200).json(breeds);
  } catch (error) {
    console.error("Error fetching breeds:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a breed by ID
const getBreedById = async (req, res) => {
  try {
    const { id } = req.params;

    const breed = await prisma.breed.findUnique({
      where: { id: parseInt(id) },
    });

    if (!breed) {
      return res.status(404).json({ error: "Breed not found" });
    }

    res.status(200).json(breed);
  } catch (error) {
    console.error("Error fetching breed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a breed
const updateBreed = async (req, res) => {
  try {
    const { id } = req.params;
    const { groupId, breed, friendlyUrl, description, image, breedStandard, redirect, status } = req.body;

    const updatedBreed = await prisma.breed.update({
      where: { id: parseInt(id) },
      data: {
        groupId,
        breed,
        friendlyUrl,
        description,
        image,
        breedStandard,
        redirect,
        status,
      },
    });

    res.status(200).json(updatedBreed);
  } catch (error) {
    console.error("Error updating breed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a breed
const deleteBreed = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.breed.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Breed deleted successfully" });
  } catch (error) {
    console.error("Error deleting breed:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createBreed,
  getAllBreeds,
  getBreedById,
  updateBreed,
  deleteBreed
};
