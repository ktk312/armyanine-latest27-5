const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CREATE
const createTrainingRecord = async (req, res) => {
  console.log("TRAINING RECORDS API (POST)")
  try {
    const {
      trainerName,
      trainingStartedOn,
      trainingCompleted,
      trainingCategory,
      performance,
      intelligence,
      willingness,
      energy,
      sensitivity,
      aggression,
      dogId,
    } = req.body;

    const record = await prisma.trainingRecord.create({
      data: {
        trainerName,
        trainingStartedOn: new Date(trainingStartedOn),
        trainingCompleted: new Date(trainingCompleted),
        trainingCategory,
        performance,
        intelligence,
        willingness,
        energy,
        sensitivity,
        aggression,
        dogId,
      },
    });
    console.log("----record are ", record)

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to create training record", details: error });
  }
};

// GET ALL
const getAllTrainingRecords = async (req, res) => {
  try {
    const records = await prisma.trainingRecord.findMany({
      include: {
        dog: {
          include: {
            breed: true
          },
        }
      },
      orderBy: {
        id: "desc", // Change 'date' to any field you want to sort by
      },
    });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch training records" });
  }
};

// GET BY ID
const getTrainingRecordById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const record = await prisma.trainingRecord.findUnique({ where: { id } });

    if (!record) return res.status(404).json({ error: "Record not found" });

    res.json(record);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch training record" });
  }
};

// UPDATE
const updateTrainingRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const {
      trainerName,
      trainingStartedOn,
      trainingCompleted,
      trainingCategory,
      performance,
      intelligence,
      willingness,
      energy,
      sensitivity,
      aggression,
      dogId
    } = req.body;

    const updated = await prisma.trainingRecord.update({
      where: { id },
      data: {
        // dogId,
        trainerName,
        trainingStartedOn: trainingStartedOn ? new Date(trainingStartedOn) : undefined,
        trainingCompleted: trainingCompleted ? new Date(trainingCompleted) : undefined,
        trainingCategory,
        performance,
        intelligence,
        willingness,
        energy,
        sensitivity,
        aggression,
      },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update training record" });
  }
};

// DELETE
const deleteTrainingRecord = async (req, res) => {
  try {
    const id = Number(req.params.id);
    await prisma.trainingRecord.delete({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete training record" });
  }
};

module.exports = {
  createTrainingRecord,
  getAllTrainingRecords,
  getTrainingRecordById,
  updateTrainingRecord,
  deleteTrainingRecord,
};
