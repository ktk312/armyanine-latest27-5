const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const generateMicrochips = async (req, res) => {
  try {
    const { chipId } = req.body; // Or req.query.count if you're using query params

    const created = await prisma.microchip.create({
      data: {
        chipId: chipId,
      },
      // skipDuplicates: true, // Not for SQLite
    });

    res.status(201).json({ success: true, chipId: created });
  } catch (error) {
    console.error("Error generating microchips:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllMicrochips = async (req, res) => {
  try {
    const microchips = await prisma.microchip.findMany();
    res.status(200).json({ success: true, microchips });
  } catch (error) {
    console.error("Error fetching microchips:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const getAllUnassignMicrochips = async (req, res) => {
  try {
    const microchips = await prisma.microchip.findMany({ where: { Dog: null } });
    res.status(200).json({ success: true, microchips });
  } catch (error) {
    console.error("Error fetching microchips:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
const updateMicrochips = async (req, res) => {
  try {
    const { chipId } = req.body;
    const { id } = req.params;

    const created = await prisma.microchip.update({
      where: { id: parseInt(id) },
      data: {
        chipId: chipId,
      },
    });

    res.status(201).json({ message: "Successfully Updated", chipId: created });
  } catch (error) {
    console.error("Error updating microchips:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const deleteMicrochipByChipId = async (req, res) => {
  try {
    const { id } = req.params;
    const microId = parseInt(id)
    const existingMicrochip = await prisma.microchip.findUnique({ where: { id: microId } });
    if (existingMicrochip) {
      const deleted = await prisma.microchip.delete({
        where: { id: microId },
      });

      res.status(200).json({
        success: true,
        message: `Microchip deleted successfully.`,
        deleted,
      });
    } else {
      res.status(404).json({
        success: true,
        message: `Microchip with ID ${id} Not found.`,
        deleted,
      });
    }


  } catch (error) {
    console.error("Error deleting microchip:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete microchip.",
    });
  }
};

module.exports = {
  getAllUnassignMicrochips,
  getAllMicrochips,
  generateMicrochips,
  deleteMicrochipByChipId,
  updateMicrochips

};
