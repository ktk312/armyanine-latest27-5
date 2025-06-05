const { PrismaClient } = require("@prisma/client");
const { connect } = require("../routes/dogRoutes");
// const { getPedigreeTreeRecursive, getDogPedigreeData } = require("../services/dogService");
const prisma = new PrismaClient();

const createDog = async (req, res) => {
  console.log("[POST] Create Dog API called");

  try {
    const file = req.file ? req.file.filename : null; // Get file path of the uploaded image
    const {
      showTitle,
      dogName,
      categoryId,
      friendlyUrl,
      kennel,
      countryId,
      cityId,
      breeder,
      breedId,
      sireId,
      damId,
      dob,
      isDeath,
      isSold,
      isLoan,
      isTransfer,
      sex,
      achievements,
      status,
      KP,
      CDN,
      CNS,
      color,
      HD,
      ED,
      hair,
      location,
      virtuesAndFaults,
      breedingAdvice,
      miscellaneousComments,
      progenyTrainability,
      microchip,
      deathDate,
      soldDate,
      loanDate,
      transferDate,
      chestDepth,
      chestCircumference,
      weight
    } = req.body;
    console.log("---achiement are", chestDepth,
      chestCircumference,
      weight)
    // Validate required fields
    if (!dogName || !breedId || !countryId || !categoryId || !dob || !sex) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const parsedIsDeath = isDeath === "true";
    const parsedIsSold = isSold === "true";
    const parsedIsLoan = isLoan === "true";
    const parsedIsTransfer = isTransfer === "true";
    const parsedCDN = CDN === "true";
    const parsedCNS = CNS === "true";

    const setStatus = "Active";

    // Convert IDs to numbers
    const categoryIdNumber = Number(categoryId);
    const countryIdNumber = countryId ? Number(countryId) : null;
    const breedIdNumber = Number(breedId);
    const cityIdNumber = cityId ? Number(cityId) : null;
    const sireIdNumber = sireId ? Number(sireId) : null;
    const damIdNumber = damId ? Number(damId) : null;
    const microchip_id = microchip ? Number(microchip) : null;
    console.log("----microchips are", typeof microchip_id);
    // Ensure breed exists
    const breedExists = await prisma.breed.findUnique({
      where: { id: breedIdNumber },
    });
    if (!breedExists) {
      return res.status(400).json({ error: "Breed not found" });
    }
    const existingKp = await prisma.dog.findUnique({ where: { KP: KP } });
    if (!existingKp) {
      // Create new dog entry
      const newDog = await prisma.dog.create({
        data: {
          showTitle,
          dogName,
          friendlyUrl: file ? `/uploads/dogs/${file}` : friendlyUrl,
          kennel,
          // cityId: cityIdNumber,
          breeder,
          dob: new Date(dob),
          isDeath: parsedIsDeath,
          isSold: parsedIsSold,
          isLoan: parsedIsLoan,
          isTransfer: parsedIsTransfer,
          sex,
          achievements,
          status,
          KP,
          CDN: parsedCDN,
          CNS: parsedCNS,
          virtuesAndFaults,
          breedingAdvice,
          miscellaneousComments,
          progenyTrainability,
          HD,
          ED,
          color,
          hair,
          location,
          status: setStatus,
          deathDate,
          soldDate,
          loanDate,
          transferDate,
          chestDepth,
          chestCircumference,
          weight,
          // Relations
          category: { connect: { id: categoryIdNumber } },
          breed: { connect: { id: breedIdNumber } },
          // country: { connect: { idCountry: countryIdNumber | "" } },
          // city: { connect: { id: cityIdNumber | "" } },
          ...(countryIdNumber
            ? { country: { connect: { idCountry: countryIdNumber } } }
            : {}),
          ...(cityIdNumber ? { city: { connect: { id: cityIdNumber } } } : {}),
          ...(microchip_id
            ? { microchip: { connect: { id: microchip_id } } }
            : {}),
          // microchip: { connect: { id: microchip_id } },
          // Handle nullable foreign keys
          sire: sireIdNumber ? { connect: { id: sireIdNumber } } : undefined,
          dam: damIdNumber ? { connect: { id: damIdNumber } } : undefined,
        },
      });

      console.log("[SUCCESS] New dog created:", newDog);
      return res
        .status(200)
        .json({ message: "Dog Added successfully", newDog: newDog });
    }
    return res.status(201).json({ message: "KP are already exist!" });
  } catch (error) {
    console.error("[ERROR] Creating dog:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all dogs
const getAllDogs = async (req, res) => {
  console.log("Get All Dogs (GET)");
  try {
    const dogs = await prisma.dog.findMany({
      include: {
        sire: true,
        dam: true,
        breed: true,
        country: true,
        city: true,
        category: true,
        microchip: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json(dogs);
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a dog by ID
const getDogById = async (req, res) => {
  console.log("Get Dog By ID API call (POST)");

  try {
    const { id } = req.params;

    const dog = await prisma.dog.findUnique({
      where: { id: parseInt(id) },
      include: {
        sire: true, // Include sire details
        dam: true, // Include dam details
        microchip: true,
        city: true,
        country: true,
        breed: true,
        category: true,
      },
    });

    if (!dog) {
      return res.status(404).json({ error: "Dog not found" });
    }

    res.status(200).json(dog);
  } catch (error) {
    console.error("Error fetching dog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a dog
const updateDog = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      showTitle,
      dogName,
      categoryId,
      friendlyUrl,
      kennel,
      countryId,
      cityId,
      breeder,
      breedId,
      sireId,
      damId,
      dob,
      isDeath,
      isSold,
      isLoan,
      isTransfer,
      sex,
      achievements,
      status,
      KP,
      location,
      CDN,
      CNS,
      microchip,
      deathDate,
      virtuesAndFaults,
      breedingAdvice,
      miscellaneousComments,
      progenyTrainability,
      soldDate,
      loanDate,
      transferDate,
      chestDepth,
      chestCircumference,
      weight,
    } = req.body;

    const file = req.file ? req.file.filename : null; // Get file path of the uploaded image

    // Check KP
    const KPValue = KP ? String(KP) : null;

    // Convert IDs to numbers
    const categoryIdNumber = Number(categoryId);
    const breedIdNumber = Number(breedId);
    const countryIdNumber = countryId ? Number(countryId) : null;
    const cityIdNumber = cityId ? Number(cityId) : null;
    const sireIdNumber = sireId ? Number(sireId) : null;
    const damIdNumber = damId ? Number(damId) : null;
    const microchip_id = microchip ? Number(microchip) : null;

    const parsedIsDeath = isDeath === "true";
    const parsedIsSold = isSold === "true";
    const parsedIsLoan = isLoan === "true";
    const parsedIsTransfer = isTransfer === "true";
    const parsedCDN = CDN === "true";
    const parsedCNS = CNS === "true";
    const updatedDog = await prisma.dog.update({
      where: { id: parseInt(id) },
      data: {
        showTitle,
        dogName,
        // categoryId: categoryIdNumber,
        friendlyUrl: file ? `/uploads/dogs/${file}` : friendlyUrl,
        kennel,
        // countryId: countryIdNumber,
        // cityId: cityIdNumber,
        breeder,
        // breedId: breedIdNumber,
        // sireId: sireIdNumber,
        // damId: damIdNumber,
        dob: new Date(dob),
        sex,
        achievements,
        status,
        KP: KPValue,
        location,
        isDeath: parsedIsDeath,
        deathDate,
        isSold: parsedIsSold,
        isLoan: parsedIsLoan,
        isTransfer: parsedIsTransfer,
        CDN: parsedCDN,
        CNS: parsedCNS,
        virtuesAndFaults,
        breedingAdvice,
        miscellaneousComments,
        progenyTrainability,
        soldDate,
        loanDate,
        transferDate,
        chestDepth,
        chestCircumference,
        weight,
        // microchip: microchip_id,
        category: { connect: { id: categoryIdNumber } },
        breed: { connect: { id: breedIdNumber } },
        // city: { connect: { id: cityIdNumber } },
        // country: { connect: { idCountry: countryIdNumber } },
        // microchip: { connect: { id: microchip_id } },
        ...(countryIdNumber
          ? { country: { connect: { idCountry: countryIdNumber } } }
          : {}),
        ...(cityIdNumber ? { city: { connect: { id: cityIdNumber } } } : {}),
        ...(microchip_id
          ? { microchip: { connect: { id: microchip_id } } }
          : {}),
        // Handle nullable foreign keys
        sire: sireIdNumber ? { connect: { id: sireIdNumber } } : undefined,
        dam: damIdNumber ? { connect: { id: damIdNumber } } : undefined,
      },
    });

    res.status(200).json({ message: "Dog Updated successfully", updatedDog });
  } catch (error) {
    console.error("Error updating dog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a dog
const deleteDog = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the dog exists
    const existingDog = await prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!existingDog) {
      return res.status(404).json({ error: "Dog not found." });
    }
  } catch (error) {
    console.error("Error deleting dog:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Dog using Breed ID
const getDogsByBreed = async (req, res) => {
  console.log("Get Dog Using Breed (GET)");
  try {
    const { breedId } = req.params;
    // Fetch dogs filtered by breedId
    const dogs = await prisma.dog.findMany({
      where: { breedId: parseInt(breedId) },
      include: {
        breed: true,
        sire: true,
        dam: true,
      },
    });

    if (dogs.length === 0) {
      return res.status(404).json({ message: "No dogs found for this breed" });
    }
    const sires = dogs.filter((dog) => normalizeSex(dog.sex) === "male");
    const dams = dogs.filter((dog) => normalizeSex(dog.sex) === "female");

    // Return the response with separate sire and dam lists
    res.status(200).json({
      sires,
      dams,
    });
    // res.status(200).json(dogs);
  } catch (error) {
    console.error("Error fetching dogs by breedId:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create Dog Category
const dogCategoryCreate = async (req, res) => {
  const { name } = req.body;

  console.log("Create Dog Category (POST)", name);

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    // Check if the category already exists
    const inputName = name.trim().toLowerCase();

    const existingCategory = await prisma.dogCategory.findFirst({
      where: {
        name: inputName,
      },
    });

    if (existingCategory) {
      return res.status(409).json({ error: "Category already exists" });
    }

    const newCategory = await prisma.dogCategory.create({
      data: {
        name: inputName,
      },
    });

    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating dog category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update Dog Category

const dogCategoryUpdate = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  console.log("Update Dog Category (PATCH)", id, name);

  if (!name || name.trim() === "") {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const inputName = name.trim().toLowerCase();

    // Check if the category with the new name already exists (excluding the current one)
    const existingCategory = await prisma.dogCategory.findFirst({
      where: {
        name: inputName,
        NOT: {
          id: parseInt(id),
        },
      },
    });

    if (existingCategory) {
      return res.status(409).json({ error: "Category name already in use" });
    }

    // Check if the category to update actually exists
    const categoryToUpdate = await prisma.dogCategory.findUnique({
      where: { id: parseInt(id) },
    });

    if (!categoryToUpdate) {
      return res.status(404).json({ error: "Category not found" });
    }

    const updatedCategory = await prisma.dogCategory.update({
      where: { id: parseInt(id) },
      data: { name: inputName },
    });

    res.status(200).json(updatedCategory);
  } catch (error) {
    console.error("Error updating dog category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Dog category
const getAllDogsCategory = async (req, res) => {
  console.log("Get All Dogs Category (GET)");
  try {
    const dogs = await prisma.dogCategory.findMany();

    res.status(200).json(dogs);
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const normalizeSex = (sex) => String(sex).trim().toLowerCase();

// Get All Dog category
const getAllParent = async (req, res) => {
  console.log("Get All  Sire and Dam (GET)");
  try {
    const dogs = await prisma.dog.findMany();

    const sires = dogs.filter((dog) => normalizeSex(dog.sex) === "male");
    const dams = dogs.filter((dog) => normalizeSex(dog.sex) === "female");

    // Return the response with separate sire and dam lists
    res.status(200).json({
      sires,
      dams,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All German Shepherd
const germanShepherdList = async (req, res) => {
  console.log("GET ALL GERMAN SHEPHERD (GET");
  try {
    const germanShepherdList = await prisma.dog.findMany({
      where: {
        breedId: 3,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
      orderBy: {
        id: "desc",
      },
    });
    const sires = germanShepherdList.filter(
      (dog) => normalizeSex(dog.sex) === "male"
    );
    const dams = germanShepherdList.filter(
      (dog) => normalizeSex(dog.sex) === "female"
    );
    const totalGermanShepherd = await prisma.dog.count({
      where: {
        breedId: 3,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
    });
    res.status(200).json({
      sires,
      dams,
      totalGermanShepherd,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Buldog
const bullDogsList = async (req, res) => {
  console.log("GET ALL BULL DOGS (GET");

  try {
    const bulldogsList = await prisma.dog.findMany({
      where: {
        breedId: 2,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
      orderBy: {
        id: "desc",
      },
    });
    const sires = bulldogsList.filter(
      (dog) => normalizeSex(dog.sex) === "male"
    );
    const dams = bulldogsList.filter(
      (dog) => normalizeSex(dog.sex) === "female"
    );
    const totalBulldog = await prisma.dog.count({
      where: {
        breedId: 2,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
    });
    res.status(200).json({
      sires,
      dams,
      totalBulldog,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All LabradorRetreiver
const labradorRetreiverList = async (req, res) => {
  console.log("GET ALL LABRADOR RETRIEVER (GET");

  try {
    const LabradorRetreiverList = await prisma.dog.findMany({
      where: {
        breedId: 1,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
      orderBy: {
        id: "desc",
      },
    });
    const sires = LabradorRetreiverList.filter(
      (dog) => normalizeSex(dog.sex) === "male"
    );
    const dams = LabradorRetreiverList.filter(
      (dog) => normalizeSex(dog.sex) === "female"
    );
    const totalLabradorRetreiver = await prisma.dog.count({
      where: {
        breedId: 1,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
    });
    res.status(200).json({
      sires,
      dams,
      totalLabradorRetreiver,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All Loan Dog
const loanDogList = async (req, res) => {
  console.log("GET ALL LOAN DOGS (GET");

  try {
    const LoanDogsList = await prisma.dog.findMany({
      where: { isLoan: true },
      orderBy: {
        id: "desc",
      },
    });
    const sires = LoanDogsList.filter(
      (dog) => normalizeSex(dog.sex) === "male"
    );
    const dams = LoanDogsList.filter(
      (dog) => normalizeSex(dog.sex) === "female"
    );
    const totalLoanDogs = await prisma.dog.count({
      where: { isLoan: true },
    });
    res.status(200).json({
      sires,
      dams,
      totalLoanDogs,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All Loan Dog
const soldDogList = async (req, res) => {
  console.log("GET ALL SOLD DOG (GET");

  try {
    const List = await prisma.dog.findMany({
      where: { isSold: true },
      orderBy: {
        id: "desc",
      },
    });
    const sires = List.filter((dog) => normalizeSex(dog.sex) === "male");
    const dams = List.filter((dog) => normalizeSex(dog.sex) === "female");
    const total = await prisma.dog.count({
      where: { isSold: true },
    });
    res.status(200).json({
      sires,
      dams,
      total,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All Standing Dog
const standingDogList = async (req, res) => {
  console.log("GET ALL STANDING DOG (GET");

  try {
    const List = await prisma.dog.findMany({
      where: {
        isDeath: false,
        isLoan: false,
        isTransfer: false,
        isSold: false,
        CNS: false,
        CDN: false,
      },
      orderBy: {
        id: "desc",
      },
    });
    const sires = List.filter((dog) => normalizeSex(dog.sex) === "male");
    const dams = List.filter((dog) => normalizeSex(dog.sex) === "female");
    const total = await prisma.dog.count({
      where: {
        isDeath: false,
        isLoan: false,
        isTransfer: false,
        isSold: false,
        CNS: false,
        CDN: false,
      },
    });
    res.status(200).json({
      sires,
      dams,
      total,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All Standing Dog
const belgianDogList = async (req, res) => {
  console.log("GET ALL BELGIAN DOG (GET");

  try {
    const List = await prisma.dog.findMany({
      where: {
        breedId: 2,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
      orderBy: {
        id: "desc",
      },
    });
    const sires = List.filter((dog) => normalizeSex(dog.sex) === "male");
    const dams = List.filter((dog) => normalizeSex(dog.sex) === "female");
    const total = await prisma.dog.count({
      where: {
        breedId: 2,
        isDeath: false,
        isLoan: false,
        isSold: false,
        isTransfer: false,
        CNS: false,
        CDN: false,
      },
    });
    res.status(200).json({
      sires,
      dams,
      total,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Get All Standing Dog
const transferredDogList = async (req, res) => {
  console.log("GET ALL TRANSFERRED DOG (GET");

  try {
    const List = await prisma.dog.findMany({
      where: { isTransfer: true },
      orderBy: {
        id: "desc",
      },
    });
    const sires = List.filter((dog) => normalizeSex(dog.sex) === "male");
    const dams = List.filter((dog) => normalizeSex(dog.sex) === "female");
    const total = await prisma.dog.count({
      where: { isTransfer: true },
    });
    res.status(200).json({
      sires,
      dams,
      total,
    });
  } catch (error) {
    console.error("Error fetching dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDogDetails = async (req, res) => {
  try {
    const dogId = parseInt(req.params.id);

    // Fetch main dog
    const dog = await prisma.dog.findUnique({
      where: { id: dogId },
      include: {
        breed: true,
        country: true,
        city: true,
        sire: true,
        dam: true,
        DogOwner: true,
        DogImage: true,
        littersSired: true,
        littersBirthed: true,
      },
    });

    if (!dog) return res.status(404).json({ error: "Dog not found" });

    // Fetch pedigree tree (5 generations)
    const pedigree = await prisma.dog.findUnique({
      where: { id: dogId },
      include: {
        sire: {
          include: {
            sire: {
              include: {
                sire: {
                  include: {
                    sire: { include: { sire: true, dam: true } },
                    dam: { include: { sire: true, dam: true } },
                  },
                },
                dam: {
                  include: {
                    sire: { include: { sire: true, dam: true } },
                    dam: { include: { sire: true, dam: true } },
                  },
                },
              },
            },
            dam: {
              include: {
                sire: { include: { sire: true, dam: true } },
                dam: { include: { sire: true, dam: true } },
              },
            },
          },
        },
        dam: {
          include: {
            sire: {
              include: {
                sire: {
                  include: {
                    sire: { include: { sire: true, dam: true } },
                    dam: { include: { sire: true, dam: true } },
                  },
                },
                dam: {
                  include: {
                    sire: { include: { sire: true, dam: true } },
                    dam: { include: { sire: true, dam: true } },
                  },
                },
              },
            },
            dam: {
              include: {
                sire: { include: { sire: true, dam: true } },
                dam: { include: { sire: true, dam: true } },
              },
            },
          },
        },
      },
    });

    // Fetch siblings
    const rawSiblings = await prisma.dog.findMany({
      where: {
        id: { not: dogId },
        OR: [
          { sireId: dog.sireId ?? undefined },
          { damId: dog.damId ?? undefined },
        ],
      },
    });

    // Helper function: keep only selected fields and recurse pedigree
    const trimDog = (dogNode) => {
      if (!dogNode) return null;
      return {
        id: dogNode.id,
        dogName: dogNode.dogName,
        breedId: dogNode.breedId,
        sireId: dogNode.sireId,
        damId: dogNode.damId,
        dob: dogNode.dob,
        sex: dogNode.sex,
        status: dogNode.status,
        sire: trimDog(dogNode.sire),
        dam: trimDog(dogNode.dam),
      };
    };

    // Simplified siblings list
    const siblings = rawSiblings.map((sib) => ({
      id: sib.id,
      dogName: sib.dogName,
      breedId: sib.breedId,
      sireId: sib.sireId,
      damId: sib.damId,
      dob: sib.dob,
      sex: sib.sex,
      status: sib.status,
    }));

    // Uncles & Aunts
    const sireUnclesAunts = await prisma.dog.findMany({
      where: {
        id: { not: dog.sireId ?? undefined },
        OR: [
          { sireId: dog?.sire?.sireId ?? undefined },
          { damId: dog?.sire?.damId ?? undefined },
        ],
      },
    });

    const damUnclesAunts = await prisma.dog.findMany({
      where: {
        id: { not: dog.damId ?? undefined },
        OR: [
          { sireId: dog?.dam?.sireId ?? undefined },
          { damId: dog?.dam?.damId ?? undefined },
        ],
      },
    });

    // Cousins (children of uncles/aunts)
    const cousinParentIds = [...sireUnclesAunts, ...damUnclesAunts].map(
      (ua) => ua.id
    );
    const cousins = await prisma.dog.findMany({
      where: {
        OR: [
          { sireId: { in: cousinParentIds } },
          { damId: { in: cousinParentIds } },
        ],
      },
    });

    // Nieces & Nephews (children of siblings)
    const siblingIds = rawSiblings.map((sib) => sib.id);
    const niecesNephews = await prisma.dog.findMany({
      where: {
        OR: [{ sireId: { in: siblingIds } }, { damId: { in: siblingIds } }],
      },
    });

    // Final response
    const fullDetails = {
      id: dog.id,
      dogName: dog.dogName,
      breedId: dog.breedId,
      sireId: dog.sireId,
      damId: dog.damId,
      dob: dog.dob,
      sex: dog.sex,
      status: dog.status,
      pedigree: {
        sire: trimDog(pedigree.sire),
        dam: trimDog(pedigree.dam),
      },
      siblings,
      relatives: {
        unclesAunts: {
          fromSire: sireUnclesAunts.map(trimDog),
          fromDam: damUnclesAunts.map(trimDog),
        },
        cousins: cousins.map(trimDog),
        niecesNephews: niecesNephews.map(trimDog),
      },
    };

    res.status(200).json(fullDetails);
  } catch (error) {
    console.error("Error fetching dog details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getDogSiblings = async (req, res) => {
  try {
    const dogId = parseInt(req.params.id);

    // Fetch the dog first to get sire and dam IDs
    const dog = await prisma.dog.findUnique({
      where: { id: dogId },
      select: {
        sireId: true,
        damId: true,
      },
    });

    if (!dog) return res.status(404).json({ error: "Dog not found" });

    // Fetch siblings (other dogs with same sire or dam)
    const rawSiblings = await prisma.dog.findMany({
      where: {
        id: { not: dogId },
        OR: [
          { sireId: dog.sireId ?? undefined },
          { damId: dog.damId ?? undefined },
        ],
      },
    });

    // Return simplified sibling data
    const siblings = rawSiblings.map((sib) => ({
      id: sib.id,
      dogName: sib.dogName,
      breedId: sib.breedId,
      sireId: sib.sireId,
      damId: sib.damId,
      dob: sib.dob,
      sex: sib.sex,
      status: sib.status,
    }));

    res.status(200).json(siblings);
  } catch (error) {
    console.error("Error fetching siblings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Recursive function to build ancestry up to 5 generations
const buildPedigree = async (
  dogId,
  generation = 1,
  maxGenerations = 5,
  relation = "Main"
) => {
  if (
    !dogId ||
    typeof dogId !== "number" ||
    dogId <= 0 ||
    generation > maxGenerations
  )
    return null;

  const dog = await prisma.dog.findUnique({
    where: { id: dogId },
    include: {
      sire: true,
      dam: true,
    },
  });

  if (!dog) return null;

  // Ensure the relation label is always valid
  const cleanRelation = relation || "Unknown";

  // Generate labeled roles for sire and dam
  const sireRelation =
    cleanRelation === "Main" ? "Sire" : `${cleanRelation}'s Sire`;
  const damRelation =
    cleanRelation === "Main" ? "Dam" : `${cleanRelation}'s Dam`;

  const children = [];
  if (dog.sireId) {
    const sirePedigree = await buildPedigree(
      dog.sireId || null,
      generation + 1,
      maxGenerations,
      sireRelation
    );
    if (sirePedigree) children.push(sirePedigree);
  }
  if (dog.damId) {
    const damPedigree = await buildPedigree(
      dog.damId || null,
      generation + 1,
      maxGenerations,
      damRelation
    );
    if (damPedigree) children.push(damPedigree);
  }

  // if (sirePedigree) children.push(sirePedigree);
  // if (damPedigree) children.push(damPedigree);

  return {
    id: dog.id,
    name: dog.dogName,
    accNumber: dog.KP || null,
    role: cleanRelation,
    sex: dog.sex,
    children,
  };
};

// Get siblings (dogs with same sire or dam)
// const getSiblings = async (dog) => {
//   // If no sire or dam, no siblings can exist
//   if (!dog.sireId && !dog.damId) return [];
//   const conditions = [];
//   if (dog.sireId) {
//     conditions.push({ sireId: dog.sireId, NOT: { id: dog.id } });
//   }
//   if (dog.damId) {
//     conditions.push({ damId: dog.damId, NOT: { id: dog.id } });
//   }

//   const siblings = await prisma.dog.findMany({
//     where: {
//       OR: conditions,
//     },
//   });
//   return siblings.map((sibling) => ({
//     id: sibling.id,
//     name: sibling.dogName,
//     accNumber: sibling.KP || null,
//     role: "Sibling",
//     sex: sibling.sex,
//     children: [],
//   }));
// };

// // Get aunts and uncles (siblings of parents)
// const getAuntsUncles = async (sireId, damId) => {
//   const parentIds = [sireId, damId].filter(Boolean);
//   if (parentIds.length === 0) return [];
//   const auntsUncles = [];

//   for (const parentId of parentIds) {
//     const parent = await prisma.dog.findUnique({
//       where: { id: parentId },
//       include: { sire: true, dam: true },
//     });
//     if (!parent || (!parent.sireId && !parent.damId)) continue;
//     // if (!parent) continue;

// const siblings = await prisma.dog.findMany({
//   where: {
//     OR: [
//       parent.sireId
//         ? { sireId: parent.sireId, NOT: { id: parent.id } }
//         : undefined,
//       parent.damId
//         ? { damId: parent.damId, NOT: { id: parent.id } }
//         : undefined,
//     ].filter(Boolean),
//   },
// where: {
//   OR: [
//     { sireId: parent.sireId, NOT: { id: parent.id } },
//     { damId: parent.damId, NOT: { id: parent.id } },
//   ],
// },
// });

//     for (const sib of siblings) {
//       auntsUncles.push({
//         id: sib.id,
//         name: sib.dogName,
//         accNumber: sib.KP || null,
//         role: "Aunt/Uncle",
//         sex: sib.sex,
//         children: [],
//       });
//     }
//   }
//   return auntsUncles;
// };

// // Get cousins (children of aunts/uncles)
// const getCousins = async (auntsUncles) => {
//   if (!auntsUncles.length) return [];
//   const cousins = [];
//   for (const relative of auntsUncles) {
//     const kids = await prisma.dog.findMany({
//       where: {
//         OR: [{ sireId: relative.id }, { damId: relative.id }],
//       },
//     });

//     for (const kid of kids) {
//       cousins.push({
//         id: kid.id,
//         name: kid.dogName,
//         accNumber: kid.KP || null,
//         role: "Cousin",
//         sex: kid.sex,
//         children: [],
//       });
//     }
//   }
//   return cousins;
// };

const getDogPedigree = async (req, res) => {
  try {
    const dogId = parseInt(req.params.id);
    if (isNaN(dogId)) {
      return res.status(400).json({ error: "Invalid dog ID" });
    }

    const dog = await prisma.dog.findUnique({
      where: { id: dogId },
    });
    if (!dog) return res.status(404).json({ error: "Dog not found" });

    const [pedigree, siblings, auntsUncles] = await Promise.all([
      buildPedigree(dog.id),
      // getSiblings(dog),
      // getAuntsUncles(dog.sireId, dog.damId),
    ]);

    // const cousins = await getCousins(auntsUncles);

    // Create special grouped nodes
    const relationshipGroups = [];

    // if (siblings.length > 0) {
    //   relationshipGroups.push({
    //     name: "Siblings",
    //     role: "RelationshipGroup",
    //     children: siblings,
    //   });
    // }

    // if (auntsUncles.length > 0) {
    //   relationshipGroups.push({
    //     name: "Aunts/Uncles",
    //     role: "RelationshipGroup",
    //     children: auntsUncles,
    //   });
    // }

    // if (cousins.length > 0) {
    //   relationshipGroups.push({
    //     name: "Cousins",
    //     role: "RelationshipGroup",
    //     children: cousins,
    //   });
    // }
    const completeTree = {
      ...pedigree,
      children: [
        ...relationshipGroups,
        ...pedigree.children, // ancestors (sire/dam) go last for hierarchy
      ],
    };

    return res.json(completeTree);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch pedigree" });
  }
};

// Get all dogs by count
// Get total number of dogs

const getDogsCount = async (req, res) => {
  try {
    const count = await prisma.dog.count({
      where: {
        isDeath: false,
        isSold: false,
        isLoan: false,
        isTransfer: false,
      },
    });
    res.status(200).json({ totalDogs: count });
  } catch (error) {
    console.error("Error counting dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// progeny of the dog
// const getDogProgeny = async (req, res) =>{
//   const dogId = parseInt(req.params.id);
//   try {
//     const progeny = await prisma.dog.findMany({
//       where: {
//         OR: [
//           { sireId: dogId },
//           { damId: dogId },
//         ],
//       },
//       include: {
//         dam: {
//           include: {
//             breed: true,
//             DogImage: true,
//           },
//         },
//       },
//     });

//     const formatted = progeny.map((dog) => ({
//       name: dog.dogName,
//       registry: dog.KP || "Unknown",
//       dam: dog.dam
//         ? {
//             name: dog.dam.dogName,
//             gender: dog.dam.sex,
//             breed: dog.dam.breed?.breed || "Unknown",
//             dob: dog.dam.dob ? new Date(dog.dam.dob).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             }) : "Unknown",
//             acca: dog.dam.KP || "Unknown",
//             imageUrl: dog.dam.DogImage[0]?.url || null,
//           }
//         : null,
//     }));

//     res.json(formatted);
//   } catch (error) {
//     console.error("Error fetching progeny:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

const getDogProgeny = async (req, res) => {
  const dogId = parseInt(req.params.id);

  // Verify the dog exists first
  try {
    const parentDog = await prisma.dog.findUnique({
      where: { id: dogId },
    });

    if (!parentDog) {
      return res.status(404).json({ error: "Dog not found" });
    }

    const progeny = await prisma.dog.findMany({
      where: {
        OR: [{ sireId: dogId }, { damId: dogId }],
      },
      include: {
        dam: {
          include: {
            breed: true,
            DogImage: { take: 1 }, // Only get first image
          },
        },
        sire: {
          include: {
            breed: true,
            DogImage: { take: 1 },
          },
        },
        breed: true,
        DogImage: { take: 1 },
      },
    });

    const formatted = progeny.map((dog) => ({
      id: dog.id,
      name: dog.dogName,
      accNumber: dog.KP || "Unknown",
      gender: dog.sex,
      breed: dog.breed?.breed || "Unknown",
      imageUrl: dog.DogImage[0]?.url || null,
      dob: dog.dob
        ? new Date(dog.dob).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
        : "Unknown",
      dam: dog.dam
        ? {
          name: dog.dam.dogName,
          gender: dog.dam.sex,
          breed: dog.dam.breed?.breed || "Unknown",
          dob: dog.dam.dob
            ? new Date(dog.dam.dob).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            : "Unknown",
          accNumber: dog.dam.KP || "Unknown",
          imageUrl: dog.dam.DogImage[0]?.url || null,
        }
        : null,
      sire: dog.sire
        ? {
          name: dog.sire.dogName,
          gender: dog.sire.sex,
          breed: dog.sire.breed?.breed || "Unknown",
          dob: dog.sire.dob
            ? new Date(dog.sire.dob).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            : "Unknown",
          accNumber: dog.sire.KP || "Unknown",
          imageUrl: dog.sire.DogImage[0]?.url || null,
        }
        : null,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Error fetching progeny:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getFilteredDogs = async (req, res) => {
  console.log("Filter All Dog API Called");
  try {
    // Safely parse breedId and cityId from query
    const breedId = req.query.breedId ? parseInt(req.query.breedId) : null;
    const cityId = req.query.cityId ? parseInt(req.query.cityId) : null;

    // Only include filters if they are valid numbers
    const filters = [];
    if (!isNaN(breedId)) {
      filters.push({ breedId: { equals: breedId } });
    }
    if (!isNaN(cityId)) {
      filters.push({ cityId: { equals: cityId } });
    }
    const dogs = await prisma.dog.findMany({
      where: filters.length > 0 ? { AND: filters } : undefined,
      include: {
        sire: true,
        dam: true,
        breed: true,
        country: true,
        city: true,
        category: true,
        microchip: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    res.json(dogs);
  } catch (error) {
    console.error("Error fetching filtered dogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getFilteredDogs,
  transferredDogList,
  belgianDogList,
  standingDogList,
  soldDogList,
  loanDogList,
  getDogProgeny,
  getDogSiblings,
  dogCategoryCreate,
  dogCategoryUpdate,
  getDogPedigree,
  getDogDetails,
  germanShepherdList,
  labradorRetreiverList,
  bullDogsList,
  getAllParent,
  getAllDogsCategory,
  getDogsByBreed,
  createDog,
  getAllDogs,
  getDogById,
  updateDog,
  deleteDog,
  getDogsCount,
};
