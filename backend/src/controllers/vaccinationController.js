const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


// Create Vaccination Record
const createVaccinationRecord = async (req, res) => {
    try {
        const { age, vaccine, dueDate, batchNo, vetSign, dogId } = req.body;

        const record = await prisma.vaccinationRecord.create({
            data: { age, vaccine, dueDate: new Date(dueDate), batchNo, vetSign, dogId },
        });

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create vaccination record', details: error });
    }
};

// Get all records
const getAllVaccinationRecords = async (req, res) => {
    try {
        const records = await prisma.vaccinationRecord.findMany();
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
    try {
        const id = Number(req.params.id);
        const { age, vaccine, dueDate, batchNo, vetSign } = req.body;

        const updated = await prisma.vaccinationRecord.update({
            where: { id },
            data: { age, vaccine, dueDate: dueDate ? new Date(dueDate) : undefined, batchNo, vetSign },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update vaccination record' });
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