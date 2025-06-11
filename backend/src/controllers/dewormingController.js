const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
const createDewormingRecord = async (req, res) => {
  try {
    const { date, drug, sign, dogId } = req.body;

    const record = await prisma.dewormingRecord.create({
      data: {
        date: new Date(date),
        drug,
        sign,
        dogId,
      },
    });

    res.status(201).json(record);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: "Failed to create deworming record", details: error });
  }
};

// Get All
const getAllDewormingRecords = async (req, res) => {
  try {
    const records = await prisma.dewormingRecord.findMany();
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch deworming records" });
  }
};

// Get by ID
const getDewormingRecordById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const record = await prisma.dewormingRecord.findUnique({ where: { id } });

    if (!record) return res.status(404).json({ error: "Record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// Update
const updateDewormingRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { date, drug, sign } = req.body;

    const updated = await prisma.dewormingRecord.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
        drug,
        sign,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update record" });
  }
};

// Delete
const deleteDewormingRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.dewormingRecord.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};

module.exports = {
  createDewormingRecord,
  getAllDewormingRecords,
  getDewormingRecordById,
  updateDewormingRecord,
  deleteDewormingRecord,
};
