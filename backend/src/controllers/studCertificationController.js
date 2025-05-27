const { PrismaClient } = require("@prisma/client");
const { checkBreedingEligibility } = require("../services/studCertificationService");
const prisma = new PrismaClient();

// Create a new stud certificate
const createStudCertificate = async (req, res) => {
  console.log("Created Stud certificate (POST)")
  try {
    const { sireId, damId, breedId, matingDate, forceCreate } = req.body;
    const status = "Pending";
    const canMate = await checkBreedingEligibility(sireId, damId);

    if (canMate.isEligible == false && !forceCreate) {
      return res.status(200).json({
        message: "Mating not allowed",
        reasons: canMate.reasons
      });
    } else {
      // Proceed with creating the stud certificate if no inbreeding
      const newStudCertificate = await prisma.studCertificate.create({
        data: {
          sireId,
          damId,
          breedId,
          matingDate: new Date(matingDate),
          status,
        },
      });

      return res.status(201).json({
        message: "Stud Certificate created successfully!",
        studCertificate: newStudCertificate
      });
    }



  } catch (error) {
    console.error("Error creating stud certificate:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Get all stud certificates
const getAllStudCertificates = async (req, res) => {
  try {
    const studCertificates = await prisma.studCertificate.findMany({
      include: {
        sire: true,
        dam: true,
        breed: true,
      },
      orderBy: {
        id: "desc"
      }
    });

    res.status(200).json(studCertificates);
  } catch (error) {
    console.error("Error fetching stud certificates:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a stud certificate by ID
const getStudCertificateById = async (req, res) => {
  try {
    const { id } = req.params;

    const studCertificate = await prisma.studCertificate.findUnique({
      where: { id: parseInt(id) },
      include: {
        sire: true,
        dam: true,
        // breed: true,
      },
    });

    if (!studCertificate) {
      return res.status(404).json({ error: "Stud Certificate not found" });
    }

    res.status(200).json(studCertificate);
  } catch (error) {
    console.error("Error fetching stud certificate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a stud certificate
const updateStudCertificate = async (req, res) => {
  try {
    const { id } = req.params;
    const { sireId, damId, breedId, matingDate, status } = req.body;

    const updatedStudCertificate = await prisma.studCertificate.update({
      where: { id: parseInt(id) },
      data: {
        sireId,
        damId,
        breedId,
        matingDate: new Date(matingDate),
        status,
      },
    });

    res.status(200).json(updatedStudCertificate);
  } catch (error) {
    console.error("Error updating stud certificate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a stud certificate
const deleteStudCertificate = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.studCertificate.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Stud Certificate deleted successfully" });
  } catch (error) {
    console.error("Error deleting stud certificate:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const searchStudCertificates = async (req, res) => {
  try {
    const {
      id,
      page = 1,
      limit = 10,
      sNo,
      sire,
      dam,
      matingDate,
      createdAt,
      status,
      sortBy = 'id',
      sortOrder = 'asc'
    } = req.query;

    const skip = (page - 1) * limit;

    const where = {
      AND: [
        (id ? { id: parseInt(id) } : {}),
        sNo ? { id: parseInt(sNo) } : {},
        sire ? { sire: { contains: dogName, } } : {},
        dam ? { dam: { contains: dogName, } } : {},
        matingDate ? { matingDate: { equals: new Date(matingDate) } } : {},
        createdAt ? { createdAt: { equals: new Date(createdAt) } } : {},
        status ? { status: { equals: status, } } : {},
      ].filter(condition => Object.keys(condition).length > 0)
    };

    const [certificates, total] = await Promise.all([
      prisma.studCertificate.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: {
          [sortBy]: sortOrder
        },
        select: {
          id: true,
          sire: true,
          dam: true,
          matingDate: true,
          createdAt: true,
          status: true,
        }
      }),
      prisma.studCertificate.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);

    res.json({
      data: certificates.map(c => ({
        sNo: c.id,
        sire: c.sire,
        dam: c.dam,
        matingDate: c.matingDate,
        createdAt: c.createdAt,
        status: c.status
      })),
      meta: {
        total,
        totalPages,
        currentPage: parseInt(page),
        limit: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error searching stud certificates:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search stud certificates',
      details: error.message
    });
  }
};


const checkUptoFifth = async (req, res) => {
  console.log("Fifth generation (POST)")
  try {
    const { sireId, damId } = req.body;
    const canMate = await checkBreedingEligibility(sireId, damId);

    return res.status(201).json({
      message: "Mating!",
      canMate
    });

  } catch (error) {
    console.error("Error creating stud certificate:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


// Check virtuall Breeding
const virtualBreedingCheck = async (req, res) => {
  console.log("Virtual Breed Checked (POST)")
  try {
    const { sireId, damId } = req.body;
    const canMate = await checkBreedingEligibility(sireId, damId);
    if (canMate.isEligible == false) {
      return res.status(200).json({
        message: "Mating not allowed!",
        reasons: canMate.reasons
      });
    } else {
      return res.status(200).json({
        message: "Mating allowed",
        reasons: canMate.reasons
      });
    }

  }
  catch (error) {
    console.error("Error checking virtual breeding:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = {
  virtualBreedingCheck,
  checkUptoFifth,
  searchStudCertificates,
  createStudCertificate,
  getAllStudCertificates,
  getStudCertificateById,
  updateStudCertificate,
  deleteStudCertificate
};
