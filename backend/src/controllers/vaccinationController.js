const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Create Vaccination Record
const createVaccinationRecord = async (req, res) => {
    console.log("CREATE VACCINATION API (POST)")
    try {
        const { age, vaccine, dueDate, givenDate, batchNo, vetSign, dogId } = req.body;
        if (!age || !vaccine || !dueDate || !givenDate || !dogId) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const record = await prisma.vaccinationRecord.create({
            data: {
                age: age, // Convert string to Int
                vaccine: vaccine,
                dueDate: new Date(dueDate),  // Just create Date object
                givenDate: new Date(givenDate),
                batchNo: batchNo,
                vetSign: vetSign,
                dogId: parseInt(dogId) // Convert string to Int
            },

        });
        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vaccination record', details: error });
    }
};

// Get all records
const getAllVaccinationRecords = async (req, res) => {
    try {
        const records = await prisma.vaccinationRecord.findMany({
            include: {
                dog: {
                    include: {
                        breed: true, // 👈 ensure this is included
                    },
                },
            },
            orderBy: {
                id: "desc", // Change 'date' to any field you want to sort by
            },
        });
        res.json(records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vaccination records' });
    }
};

// Get by ID
const getVaccinationRecordById = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const record = await prisma.vaccinationRecord.findUnique({ where: { id } });

        if (!record) {
            return res.status(404).json({ error: 'Record not found' });
        }

        res.json(record);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch vaccination record' });
    }
};

// Update
const updateVaccinationRecord = async (req, res) => {
    console.log("Vaccination Updated POST");

    try {
        const id = Number(req.params.id);
        const { age, vaccine, dueDate, givenDate, batchNo, vetSign, dogId } = req.body;

        console.log("Updating with:", age, vaccine, dueDate, batchNo, vetSign, id, givenDate);

        const existingVaccination = await prisma.vaccinationRecord.findUnique({ where: { id } });

        if (!existingVaccination) {
            return res.status(404).json({ error: "Vaccination record not found" });
        }

        const updated = await prisma.vaccinationRecord.update({
            where: { id },
            data: {
                // dogId: parseInt(dogId),
                age: parseInt(age),
                vaccine,
                dueDate: dueDate ? new Date(dueDate) : undefined,
                givenDate: givenDate ? new Date(givenDate) : undefined,
                batchNo,
                vetSign,
            },
        });

        console.log("Updated record:", updated);
        res.json(updated);
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).json({ error: "Failed to update vaccination record" });
    }
};


// Delete
const deleteVaccinationRecord = async (req, res) => {
    try {
        const id = Number(req.params.id);

        await prisma.vaccinationRecord.delete({ where: { id } });

        res.status(204).json({ message: "Record Deleted Successfully" });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete vaccination record' });
    }
};


module.exports = {
    createVaccinationRecord,
    getAllVaccinationRecords,
    getVaccinationRecordById,
    updateVaccinationRecord,
    deleteVaccinationRecord
};