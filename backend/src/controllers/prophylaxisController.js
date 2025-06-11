const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create
const createProphylaxisRecord = async (req, res) => {
  try {
    const { date, prophylacticDrug, remarks, dogId } = req.body;

    const record = await prisma.prophylaxisRecord.create({
      data: {
        date: new Date(date),
        prophylacticDrug,
        remarks,
        dogId,
      },
    });

    res.status(201).json(record);
  } catch (error) {
    console.error("Create error:", error);
    res.status(500).json({ error: "Failed to create prophylaxis record", details: error });
  }
};

// Get All
const getAllProphylaxisRecords = async (req, res) => {
  try {
    const records = await prisma.prophylaxisRecord.findMany({
      include: {
        dog: {
          include: {
            breed: true
          }
        }
      },
       orderBy: {
        id: "desc", // Change 'date' to any field you want to sort by
      },
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
};

// Get by ID
const getProphylaxisRecordById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const record = await prisma.prophylaxisRecord.findUnique({ where: { id } });

    if (!record) return res.status(404).json({ error: "Record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
};

// Update
const updateProphylaxisRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { date, prophylacticDrug, remarks } = req.body;

    const updated = await prisma.prophylaxisRecord.update({
      where: { id },
      data: {
        date: date ? new Date(date) : undefined,
        prophylacticDrug,
        remarks,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update record" });
  }
};

// Delete
const deleteProphylaxisRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.prophylaxisRecord.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};

module.exports = {
  createProphylaxisRecord,
  getAllProphylaxisRecords,
  getProphylaxisRecordById,
  updateProphylaxisRecord,
  deleteProphylaxisRecord,
};
