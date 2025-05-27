const { PrismaClient } = require("@prisma/client");
const { LitterStatus, LitterInspectionStatus } = require("../utils/constant");
const prisma = new PrismaClient();

// Create a new litter detail
const createLitterDetail = async (req, res) => {
  console.log("Litter Detail are create (POST)")
  try {
    const { litterId, name, sex, color, location, hair, dnaTaken, microchip } = req.body;
    const microchip_id = microchip ? Number(microchip) : null;

    const newLitterDetail = await prisma.litterDetail.create({
      data: {
        litterId,
        name,
        location: String(location),
        sex,
        color,
        hair,
        dnaTaken,
        status: LitterStatus.PENDING
      },
    });
    if (newLitterDetail && litterId) {
      const updateLiterStatus = await prisma.litter.update({
        where: { id: parseInt(litterId) },
        data: {
          status: LitterInspectionStatus.IN_PROGRESS
        }
      })
    }
    res.status(201).json(newLitterDetail);
  } catch (error) {
    console.error("Error creating litter detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all litter details
const getAllLitterDetails = async (req, res) => {
  try {
    const litterDetails = await prisma.litterDetail.findMany({
      include: {
        litter: {
          include: {
            sire: true, // Fetch related sire data
            dam: true, // Fetch related dam data
            breed: true
          },
        }, // Fetch related litter data
      },
      orderBy: {
        createdAt: 'desc', // Sort by createdAt in descending order
      },
    });

    res.status(200).json(litterDetails);
  } catch (error) {
    console.error("Error fetching litter details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a litter detail by ID
const getLitterDetailById = async (req, res) => {
  try {
    const { id } = req.params;

    const litterDetail = await prisma.litterDetail.findUnique({
      where: { id: parseInt(id) },
      include: {
        litter: true,
      },
    });

    if (!litterDetail) {
      return res.status(404).json({ error: "Litter detail not found" });
    }

    res.status(200).json(litterDetail);
  } catch (error) {
    console.error("Error fetching litter detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a litter detail
const updateLitterDetail = async (req, res) => {
  console.log("Litter Detail Update API (PATCH)")

  try {
    const { id } = req.params;
    const { litterId, name, location, sex, color, hair, dnaTaken, microchip, KP, breedId, dob, matingDate } = req.body;
    const microchip_id = microchip ? Number(microchip) : null;
    console.log("----location at backend ", location)
    const updatedLitterDetail = await prisma.litterDetail.update({
      where: { id: parseInt(id) },
      data: {
        litter: { connect: { id: litterId } },
        name,
        location,
        sex,
        color,
        hair,
        dnaTaken,
        KP,
        matingDate,
        dob,
        // microchip: { connect: { id: microchip_id } },
        ...(microchip_id ? { microchip: { connect: { id: microchip_id } } } : {}),
      },
    });
    // If KP and microchip exist, check if a Dog already exists
    if (updatedLitterDetail.KP) {
      const existingDog = await prisma.dog.findUnique({
        where: { KP: updatedLitterDetail?.KP },
      });
      const parentDetail = await prisma.litter.findFirst({ where: { id: updatedLitterDetail.litterId } })
      // If no Dog exists with this KP, create a new Dog
      if (!existingDog) {
        const newDog = await prisma.dog.create({
          data: {
            dogName: updatedLitterDetail?.name, // Use updated litterDetail name
            sex: updatedLitterDetail?.sex, // Use updated sex
            dob: updatedLitterDetail?.dob, // Use current date (change if needed)
            isDeath: false,
            isSold: false,
            isLoan: false,
            isTransfer: false,
            status: "Active",
            KP: updatedLitterDetail?.KP, // Assign updated KP
            achievements: "",
            sire: {
              connect: { id: parentDetail?.sireId || null }, // Connect to the sire using its ID
            },
            dam: {
              connect: { id: parentDetail?.damId || null }, // Connect to the dam using its ID
            },
            ...(microchip_id ? { microchip: { connect: { id: microchip_id } } } : {}),

            location: updatedLitterDetail?.location,
            breed: { connect: { id: breedId } },

          },
        });
        if (updatedLitterDetail && litterId && newDog) {
          const updateLitterStatus = await prisma.litter.update(
            {
              where: { id: parseInt(updatedLitterDetail?.litterId) },
              data: { status: LitterStatus.APPROVED }
            }
          );
          const updateLitterDetailStatus = await prisma.litterDetail.update(
            {
              where: { id: parseInt(id) },
              data: { status: LitterInspectionStatus.COMPLETED }
            }
          );
        }
        res.status(200).json({
          message: "Litter is updated and dog Created successfully!",
          data: updatedLitterDetail
        });
      }
      else {


        res.status(200).json({
          message: "Litter is updated but dog is not Created Due to ACC no already exist!",
          data: updatedLitterDetail
        });
      }
    }


  } catch (error) {
    console.error("Error updating litter detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a litter detail
const deleteLitterDetail = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.litterDetail.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Litter detail deleted successfully" });
  } catch (error) {
    console.error("Error deleting litter detail:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Fetch all litters along with their puppies (litter details)
const getLittersWithPuppies = async (req, res) => {
  try {
    const { breedId, cityId, status } = req.query;

    const litters = await prisma.litter.findMany({
      where: {
        ...(breedId ? { breedId: Number(breedId) } : {}),
        ...(cityId ? { cityId: Number(cityId) } : {}),
        ...(status ? { status: String(status) } : {}),
      },
      include: {
        LitterDetail: true, // Include child puppies
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ success: true, data: litters });
  } catch (error) {
    console.error("Error fetching litters with puppies:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

const filterLitters = async (req, res) => {
  console.log("Filter all liters detail")
  try {
    const {
      page = 1,
      limit = 10,
      sNo,
      id,
      dob,
      created,
      status,
      sireId,
      damId,
    } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const where = {
      ...(sNo && { id: parseInt(sNo) }),
      ...(id && { id: parseInt(id) }),
      ...(created && { createdAt: new Date(created) }),
      ...(dob || sireId || damId || status
        ? {
          litter: {
            ...(dob && { dob: new Date(dob) }),
            ...(status && { status }),
            ...(sireId && { sireId: parseInt(sireId) }),
            ...(damId && { damId: parseInt(damId) }),
          },
        }
        : {}),
    };

    const [litters, total] = await Promise.all([
      prisma.litterDetail.findMany({
        where,
        skip,
        take,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          litter: {
            include: {
              sire: true,
              dam: true,
              breed: true,
              city: true,
            },
          },
        },
      }),
      prisma.litterDetail.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      data: litters,
      meta: {
        total,
        totalPages: Math.ceil(total / take),
        currentPage: parseInt(page),
        limit: take,
      },
    });
  } catch (error) {
    console.error("Error filtering litters:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message,
    });
  }
};




module.exports = {
  filterLitters,
  getLittersWithPuppies,
  createLitterDetail,
  getAllLitterDetails,
  getLitterDetailById,
  updateLitterDetail,
  deleteLitterDetail
};
