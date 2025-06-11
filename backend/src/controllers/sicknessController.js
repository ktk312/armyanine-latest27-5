const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
const createSicknessRecord = async (req, res) => {
  try {
    const { date, diseases, treatment, dogId } = req.body;

    const record = await prisma.sicknessRecord.create({
      data: {
        date: new Date(date),
        diseases,
        treatment,
        dogId,
      },
    });

    res.status(201).json(record);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: "Failed to create sickness record", details: error });
  }
};

// Get All
const getAllSicknessRecords = async (req, res) => {
  try {
    const records = await prisma.sicknessRecord.findMany();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sickness records" });
  }
};

// Get by ID
const getSicknessRecordById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const record = await prisma.sicknessRecord.findUnique({ where: { id } });

    if (!record) return res.status(404).json({ error: "Record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// Update
const updateSicknessRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { date, diseases, treatment } = req.body;

    const updated = await prisma.sicknessRecord.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
        diseases,
        treatment,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update record" });
  }
};

// Delete
const deleteSicknessRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.sicknessRecord.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};

module.exports = {
  createSicknessRecord,
  getAllSicknessRecords,
  getSicknessRecordById,
  updateSicknessRecord,
  deleteSicknessRecord,
};
