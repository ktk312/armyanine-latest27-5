const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getAvailableSiresForDam } = require("../services/linebreedingService");
const lineBreeding = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid dog ID' });
    }

    try {
        const availableSires = await getAvailableSiresForDam(id);
        res.json({
            damId: id,
            availableSires: availableSires
        });
    } catch (err) {
        console.error('Error in lineBreeding:', err);
        res.status(500).json({
            error: err.message || 'Internal Server Error'
        });
    } finally {
        await prisma.$disconnect(); // Properly close Prisma connection
    }
};

module.exports = { lineBreeding };