const { PrismaClient } = require("@prisma/client");
const { updateStudCertificate } = require("./studCertificationController");
const { StudCertificateStatus, LitterInspectionStatus } = require("../utils/constant");
const prisma = new PrismaClient();

// Create a new litter
const createLitter = async (req, res) => {
  console.log("Create Litter (POST)")
  try {
    const { studCertId,
      ownerId,
      kennelId,
      breedId,
      location,
      dob,
      matingDate,
      registeredDogs,
      noOfPuppies,
      sireId,
      damId,
      status,
      noOfFemale,
      noOfMale,
      noOfExpired,
      conditionOfDam,
      conditionOfPuppies,
      uniformFeature,
      Remarks } = req.body;
    const newLitter = await prisma.litter.create({
      data: {
        ownerId,
        kennelId,
        location,
        dob: new Date(dob),
        matingDate,
        registeredDogs,
        noOfPuppies,
        status: LitterInspectionStatus.PENDING,
        noOfFemale,
        noOfMale,
        conditionOfDam,
        conditionOfPuppies,
        uniformFeature,
        Remarks,
        noOfExpired,
        sire: sireId ? { connect: { id: sireId } } : undefined,
        dam: damId ? { connect: { id: damId } } : undefined,
        breed: breedId ? { connect: { id: breedId } } : undefined,
      },
    });
    if (newLitter && studCertId) {
      const updateStudStatus = await prisma.studCertificate.update(
        {
          where: { id: parseInt(studCertId) },
          data: {
            status: StudCertificateStatus.ACTIVE,
          },
        }
      );

    }
    res.status(201).json({
      message: "Litter are created successfully",
      litter: newLitter
    });
  } catch (error) {
    console.error("Error creating litter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all litters
const getAllLitters = async (req, res) => {
  try {
    const litters = await prisma.litter.findMany({
      include: {
        sire: true,
        dam: true,
        breed: true
      },
      orderBy: {
        id: "desc"
      }
    });

    res.status(200).json(litters);
  } catch (error) {
    console.error("Error fetching litters:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a litter by ID
const getLitterById = async (req, res) => {
  try {
    const { id } = req.params;

    const litter = await prisma.litter.findUnique({
      where: { id: parseInt(id) },
      include: {
        breed: true,
        sire: true,
        dam: true,
      },
    });

    if (!litter) {
      return res.status(404).json({ error: "Litter not found" });
    }

    res.status(200).json(litter);
  } catch (error) {
    console.error("Error fetching litter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a litter
const updateLitter = async (req, res) => {
  try {
    const { id } = req.params;
    const litterId = parseInt(req.params.id);

    const { ownerId, kennelId, breedId, location, dob, registeredDogs, noOfPuppies, sireId, damId, status } = req.body;
    const litterExists = await prisma.litter.findUnique({
      where: { id: parseInt(litterId) }
    });

    if (!litterExists) {
      return res.status(404).json({ message: "Litter not found." });
    }
    const updatedLitter = await prisma.litter.update({
      where: { id: parseInt(litterId) },
      data: {
        ownerId,
        kennelId,
        breedId,
        location,
        dob: new Date(dob),
        matingDate: new Date(matingDate),
        registeredDogs,
        noOfPuppies,
        sireId,
        damId,
        status,
        cityId,
        noOfFemale,
        noOfMale,
        noOfExpired
      },
    });
    res.status(200).json(updatedLitter);
  } catch (error) {
    console.error("Error updating litter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a litter
const deleteLitter = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.litter.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Litter deleted successfully" });
  } catch (error) {
    console.error("Error deleting litter:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




const filterInspectionRequest = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      id,
      sire,
      dam,
      received,   // maps to createdAt
      status
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build the `where` clause
    const where = {
      ...(id && { id: parseInt(id) }),
      ...(received && { createdAt: new Date(received) }),
      ...(status && { status }),
      ...(sire && {
        sire: {
          dogName: {
            contains: sire,

          }
        }
      }),
      ...(dam && {
        dam: {
          dogName: {
            contains: dam,

          }
        }
      }),
    };

    const [litters, total] = await Promise.all([
      prisma.litter.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: "desc" },
        include: {
          sire: true,
          dam: true,
        },
      }),
      prisma.litter.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: litters.map(litter => ({
        id: litter.id,
        sire: litter.sire?.dogName || null,
        dam: litter.dam?.dogName || null,
        received: litter.createdAt,
        status: litter.status
      })),
      meta: {
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: parseInt(page),
        limit: parseInt(limit),
      },
    });
  } catch (error) {
    console.error("Error filtering litter search:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
};
module.exports = {
  filterInspectionRequest,
  createLitter,
  getAllLitters,
  getLitterById,
  updateLitter,
  deleteLitter
};