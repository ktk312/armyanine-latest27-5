const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { stringify } = require("csv-stringify");
const archiver = require("archiver");
const { PrismaClient } = require("@prisma/client");
const { execSync } = require("child_process");
const moment = require("moment"); // Added for robust date parsing
const prisma = new PrismaClient();

// Helper function to validate CSV headers

// Helper function to clear data from non-protected tables
const clearNonProtectedTables = async (tx, specificTable = null) => {
  const protectedTables = ["User", "Country", "DogCategory", "Breed"];
  const tablesToClear = specificTable
    ? [specificTable]
    : [
        "SicknessRecord",
        "DewormingRecord",
        "ProphylaxisRecord",
        "TrainingRecord",
        "VaccinationRecord",
        "Notification",
        "StudCertificate",
        "LitterDetail",
        "Litter",
        "DogOwner",
        "DogImage",
        "Dog",
        "Microchip",
        "City",
        "ActivityLog",
      ]; // Reverse order of importOrder, excluding protected tables

  for (const table of tablesToClear) {
    if (protectedTables.includes(table)) continue;
    if (specificTable && table !== specificTable) continue;
    try {
      const tableExists = await checkTableExists(table.toLowerCase());
      if (tableExists) {
        await tx[table].deleteMany({});
        console.log(`Cleared data from ${table}`);
      }
    } catch (error) {
      console.error(`Error clearing table ${table}:`, error.stack);
      throw new Error(`Failed to clear table ${table}: ${error.message}`);
    }
  }
};

const validateCSVHeaders = (records, tableName) => {
  if (!records || records.length === 0) return true; // Empty records are handled elsewhere
  const expectedHeaders = {
    User: ["id", "email", "firstName", "lastName", "createdAt", "updatedAt"],
    ActivityLog: [
      "id",
      "userId",
      "activityDatetime",
      "moduleId",
      "activity",
      "createdAt",
      "updatedAt",
    ],
    Breed: ["id", "name", "groupId", "isDeleted", "createdAt", "updatedAt"],
    City: ["id", "name", "countryId"],
    Country: ["idCountry", "name"],
    Dog: [
      "id",
      "dogName",
      "breedId",
      "sireId",
      "damId",
      "countryId",
      "cityId",
      "categoryId",
      "microchipId",
      "KP",
      "dob",
      "isDeath",
      "isSold",
      "isLoan",
      "isTransfer",
      "CDN",
      "CNS",
      "createdAt",
      "updatedAt",
    ],
    DogImage: ["id", "dogId", "url", "default", "createdAt", "updatedAt"],
    DogOwner: [
      "id",
      "dogId",
      "ownerId",
      "dateFrom",
      "dateTo",
      "createdAt",
      "updatedAt",
    ],
    Litter: [
      "id",
      "ownerId",
      "kennelId",
      "breedId",
      "cityId",
      "sireId",
      "damId",
      "registeredDogs",
      "noOfPuppies",
      "noOfFemale",
      "noOfMale",
      "noOfExpired",
      "dob",
      "matingDate",
      "createdAt",
      "updatedAt",
    ],
    LitterDetail: [
      "id",
      "litterId",
      "microchipId",
      "KP",
      "dnaTaken",
      "createdAt",
      "updatedAt",
    ],
    StudCertificate: [
      "id",
      "sireId",
      "damId",
      "breedId",
      "matingDate",
      "isDeleted",
      "createdAt",
      "updatedAt",
    ],
    Notification: [
      "id",
      "refId",
      "message",
      "dismissTime",
      "createdAt",
      "updatedAt",
    ],
    DogCategory: ["id", "name"],
    Microchip: ["id", "chipId", "createdAt"],
    VaccinationRecord: [
      "id",
      "dogId",
      "vaccine",
      "dueDate",
      "givenDate",
      "createdAt",
      "updatedAt",
    ],
    TrainingRecord: [
      "id",
      "dogId",
      "trainingType",
      "trainingStartedOn",
      "trainingCompleted",
      "createdAt",
      "updatedAt",
    ],
    ProphylaxisRecord: [
      "id",
      "dogId",
      "type",
      "date",
      "createdAt",
      "updatedAt",
    ],
    DewormingRecord: ["id", "dogId", "type", "date", "createdAt", "updatedAt"],
    SicknessRecord: [
      "id",
      "dogId",
      "disease",
      "date",
      "createdAt",
      "updatedAt",
    ],
  };
  const headers = Object.keys(records[0]);
  const required = expectedHeaders[tableName] || [];
  return required.every((header) => headers.includes(header));
};

// Helper function to convert data to CSV
const convertToCSV = (data, filename) => {
  return new Promise((resolve, reject) => {
    if (!data || data.length === 0) {
      resolve(""); // Return empty string for empty data
      return;
    }

    stringify(
      data,
      {
        header: true,
        quoted: true,
      },
      (err, output) => {
        if (err) {
          reject(err);
        } else {
          resolve(output);
        }
      }
    );
  });
};

// Helper function to parse CSV
const parseCSV = (csvContent) => {
  return new Promise((resolve, reject) => {
    parse(
      csvContent,
      {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      },
      (err, records) => {
        if (err) {
          reject(err);
        } else {
          resolve(records);
        }
      }
    );
  });
};

// Helper function to sanitize data for CSV export
const sanitizeForCSV = (data) => {
  return data.map((record) => {
    const sanitized = {};
    for (const [key, value] of Object.entries(record)) {
      if (value instanceof Date) {
        sanitized[key] = value.toISOString();
      } else if (typeof value === "boolean") {
        sanitized[key] = value.toString();
      } else if (value === null || value === undefined) {
        sanitized[key] = "";
      } else if (typeof value === "object") {
        sanitized[key] = JSON.stringify(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  });
};

// Helper function to convert CSV data back to proper types
const convertCSVTypes = (records, tableName) => {
  const typeConverters = {
    User: {
      id: (val) => (val ? parseInt(val) : undefined),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    ActivityLog: {
      id: (val) => (val ? parseInt(val) : undefined),
      activityDatetime: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : null,
      userId: (val) => (val ? parseInt(val) : null),
      moduleId: (val) => (val ? parseInt(val) : null),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    Breed: {
      id: (val) => (val ? parseInt(val) : undefined),
      groupId: (val) => (val ? parseInt(val) : null),
      isDeleted: (val) => val === "true",
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    City: {
      id: (val) => (val ? parseInt(val) : undefined),
      countryId: (val) => parseInt(val),
    },
    Country: {
      idCountry: (val) => (val ? parseInt(val) : undefined),
    },
    Dog: {
      id: (val) => (val ? parseInt(val) : undefined),
      breedId: (val) => (val ? parseInt(val) : null),
      sireId: (val) => (val ? parseInt(val) : null),
      damId: (val) => (val ? parseInt(val) : null),
      countryId: (val) => (val ? parseInt(val) : null),
      cityId: (val) => (val ? parseInt(val) : null),
      categoryId: (val) => (val ? parseInt(val) : null),
      microchipId: (val) => (val ? parseInt(val) : null),
      dob: (val) => (val ? moment(val, moment.ISO_8601).toDate() : null),
      isDeath: (val) => val === "true",
      isSold: (val) => val === "true",
      isLoan: (val) => val === "true",
      isTransfer: (val) => val === "true",
      CDN: (val) => val === "true",
      CNS: (val) => val === "true",
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    DogImage: {
      id: (val) => (val ? parseInt(val) : undefined),
      dogId: (val) => parseInt(val),
      default: (val) => val === "true",
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    DogOwner: {
      id: (val) => (val ? parseInt(val) : undefined),
      dogId: (val) => parseInt(val),
      ownerId: (val) => parseInt(val),
      dateFrom: (val) => (val ? moment(val, moment.ISO_8601).toDate() : null),
      dateTo: (val) => (val ? moment(val, moment.ISO_8601).toDate() : null),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    Litter: {
      id: (val) => (val ? parseInt(val) : undefined),
      ownerId: (val) => (val ? parseInt(val) : null),
      kennelId: (val) => (val ? parseInt(val) : null),
      breedId: (val) => parseInt(val),
      cityId: (val) => (val ? parseInt(val) : null),
      sireId: (val) => parseInt(val),
      damId: (val) => parseInt(val),
      registeredDogs: (val) => (val ? parseInt(val) : null),
      noOfPuppies: (val) => parseInt(val),
      noOfFemale: (val) => (val ? parseInt(val) : null),
      noOfMale: (val) => (val ? parseInt(val) : null),
      noOfExpired: (val) => (val ? parseInt(val) : null),
      dob: (val) => moment(val, moment.ISO_8601).toDate(),
      matingDate: (val) => moment(val, moment.ISO_8601).toDate(),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    LitterDetail: {
      id: (val) => (val ? parseInt(val) : undefined),
      litterId: (val) => parseInt(val),
      microchipId: (val) => (val ? parseInt(val) : null),
      dnaTaken: (val) => val === "true",
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    StudCertificate: {
      id: (val) => (val ? parseInt(val) : undefined),
      sireId: (val) => parseInt(val),
      damId: (val) => parseInt(val),
      breedId: (val) => parseInt(val),
      matingDate: (val) => moment(val, moment.ISO_8601).toDate(),
      isDeleted: (val) => val === "true",
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    Notification: {
      id: (val) => (val ? parseInt(val) : undefined),
      refId: (val) => parseInt(val),
      dismissTime: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : null,
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    DogCategory: {
      id: (val) => (val ? parseInt(val) : undefined),
    },
    Microchip: {
      id: (val) => (val ? parseInt(val) : undefined),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    VaccinationRecord: {
      id: (val) => (val ? parseInt(val) : undefined),
      dogId: (val) => parseInt(val),
      dueDate: (val) => (val ? moment(val, moment.ISO_8601).toDate() : null),
      givenDate: (val) => (val ? moment(val, moment.ISO_8601).toDate() : null),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    TrainingRecord: {
      id: (val) => (val ? parseInt(val) : undefined),
      dogId: (val) => parseInt(val),
      trainingStartedOn: (val) => moment(val, moment.ISO_8601).toDate(),
      trainingCompleted: (val) => moment(val, moment.ISO_8601).toDate(),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    ProphylaxisRecord: {
      id: (val) => (val ? parseInt(val) : undefined),
      dogId: (val) => parseInt(val),
      date: (val) => moment(val, moment.ISO_8601).toDate(),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    DewormingRecord: {
      id: (val) => (val ? parseInt(val) : undefined),
      dogId: (val) => parseInt(val),
      date: (val) => moment(val, moment.ISO_8601).toDate(),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
    SicknessRecord: {
      id: (val) => (val ? parseInt(val) : undefined),
      dogId: (val) => parseInt(val),
      date: (val) => moment(val, moment.ISO_8601).toDate(),
      createdAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
      updatedAt: (val) =>
        val ? moment(val, moment.ISO_8601).toDate() : new Date(),
    },
  };

  const converter = typeConverters[tableName] || {};

  return records.map((record) => {
    const converted = {};
    for (const [key, value] of Object.entries(record)) {
      if (converter[key]) {
        try {
          converted[key] = converter[key](value);
        } catch (err) {
          console.warn(
            `Error converting ${key}: ${value} for table ${tableName}`,
            err.stack
          );
          converted[key] = value; // Keep original value if conversion fails
        }
      } else if (value === "") {
        converted[key] = null;
      } else if (
        value &&
        typeof value === "string" &&
        value.startsWith("{") &&
        value.endsWith("}")
      ) {
        try {
          converted[key] = JSON.parse(value);
        } catch {
          converted[key] = value;
        }
      } else {
        converted[key] = value;
      }
    }
    return converted;
  });
};

// Get all table names from Prisma schema dynamically
const getAllTableNames = async () => {
  try {
    const tables = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' 
      AND name NOT LIKE 'sqlite_%'
      AND name NOT LIKE '_prisma_%'
      ORDER BY name
    `;
    return tables
      .map((table) => table.name)
      .filter((name) => !name.startsWith("_"))
      .map((name) =>
        name
          .split("_")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join("")
      );
  } catch (error) {
    console.error("Error fetching table names:", error.stack);
    return [
      "User",
      "ActivityLog",
      "Breed",
      "City",
      "Country",
      "Dog",
      "DogImage",
      "DogOwner",
      "Litter",
      "LitterDetail",
      "StudCertificate",
      "Notification",
      "DogCategory",
      "Microchip",
      "VaccinationRecord",
      "TrainingRecord",
      "ProphylaxisRecord",
      "DewormingRecord",
      "SicknessRecord",
    ];
  }
};

// Check if a table exists in the database
const checkTableExists = async (tableName) => {
  try {
    const tableExists = await prisma.$queryRaw`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name=${tableName.toLowerCase()}
    `;
    return tableExists.length > 0;
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error.stack);
    return false;
  }
};

// Cache for foreign key validation
const validationCache = {
  breed: new Map(),
  dog: new Map(),
  country: new Map(),
  city: new Map(),
  category: new Map(),
  microchip: new Map(),
  user: new Map(),
  litter: new Map(),
};

// Specialized import handlers
const handleDogImport = async (record, tx) => {
  const {
    id,
    sireId,
    damId,
    breedId,
    countryId,
    cityId,
    categoryId,
    microchipId,
    KP,
    ...data
  } = record;

  // Validate unique KP
  if (KP) {
    const existingDog = await tx.dog.findUnique({ where: { KP } });
    if (existingDog && existingDog.id !== id) {
      throw new Error(`Dog with KP ${KP} already exists`);
    }
  }

  // Validate foreign keys
  if (breedId && !validationCache.breed.has(breedId)) {
    const breed = await tx.breed.findUnique({ where: { id: breedId } });
    validationCache.breed.set(breedId, !!breed);
    if (!breed) record.breedId = null;
  } else if (!validationCache.breed.get(breedId)) {
    record.breedId = null;
  }

  if (countryId && !validationCache.country.has(countryId)) {
    const country = await tx.country.findUnique({
      where: { idCountry: countryId },
    });
    validationCache.country.set(countryId, !!country);
    if (!country) record.countryId = null;
  } else if (!validationCache.country.get(countryId)) {
    record.countryId = null;
  }

  if (cityId && !validationCache.city.has(cityId)) {
    const city = await tx.city.findUnique({ where: { id: cityId } });
    validationCache.city.set(cityId, !!city);
    if (!city) record.cityId = null;
  } else if (!validationCache.city.get(cityId)) {
    record.cityId = null;
  }

  if (categoryId && !validationCache.category.has(categoryId)) {
    const category = await tx.dogCategory.findUnique({
      where: { id: categoryId },
    });
    validationCache.category.set(categoryId, !!category);
    if (!category) record.categoryId = null;
  } else if (!validationCache.category.get(categoryId)) {
    record.categoryId = null;
  }

  if (microchipId && !validationCache.microchip.has(microchipId)) {
    const microchip = await tx.microchip.findUnique({
      where: { id: microchipId },
    });
    validationCache.microchip.set(microchipId, !!microchip);
    if (!microchip) record.microchipId = null;
  } else if (!validationCache.microchip.get(microchipId)) {
    record.microchipId = null;
  }

  if (sireId && !validationCache.dog.has(sireId)) {
    const sire = await tx.dog.findUnique({ where: { id: sireId } });
    validationCache.dog.set(sireId, !!sire);
    if (!sire) record.sireId = null;
  } else if (!validationCache.dog.get(sireId)) {
    record.sireId = null;
  }

  if (damId && !validationCache.dog.has(damId)) {
    const dam = await tx.dog.findUnique({ where: { id: damId } });
    validationCache.dog.set(damId, !!dam);
    if (!dam) record.damId = null;
  } else if (!validationCache.dog.get(damId)) {
    record.damId = null;
  }

  const existingDog = id ? await tx.dog.findUnique({ where: { id } }) : null;
  if (existingDog) {
    return await tx.dog.update({
      where: { id },
      data: {
        ...data,
        KP,
        sireId: record.sireId,
        damId: record.damId,
        breedId: record.breedId,
        countryId: record.countryId,
        cityId: record.cityId,
        categoryId: record.categoryId,
        microchipId: record.microchipId,
      },
    });
  } else {
    return await tx.dog.create({
      data: {
        ...data,
        KP,
        sireId: record.sireId,
        damId: record.damId,
        breedId: record.breedId,
        countryId: record.countryId,
        cityId: record.cityId,
        categoryId: record.categoryId,
        microchipId: record.microchipId,
      },
    });
  }
};

const handleLitterImport = async (record, tx) => {
  const { id, sireId, damId, breedId, cityId, ownerId, kennelId, ...data } =
    record;

  // Validate required foreign keys
  if (breedId && !validationCache.breed.has(breedId)) {
    const breed = await tx.breed.findUnique({ where: { id: breedId } });
    validationCache.breed.set(breedId, !!breed);
    if (!breed) throw new Error(`Invalid breedId: ${breedId}`);
  } else if (!validationCache.breed.get(breedId)) {
    throw new Error(`Invalid breedId: ${breedId}`);
  }

  if (sireId && !validationCache.dog.has(sireId)) {
    const sire = await tx.dog.findUnique({ where: { id: sireId } });
    validationCache.dog.set(sireId, !!sire);
    if (!sire) throw new Error(`Invalid sireId: ${sireId}`);
  } else if (!validationCache.dog.get(sireId)) {
    throw new Error(`Invalid sireId: ${sireId}`);
  }

  if (damId && !validationCache.dog.has(damId)) {
    const dam = await tx.dog.findUnique({ where: { id: damId } });
    validationCache.dog.set(damId, !!dam);
    if (!dam) throw new Error(`Invalid damId: ${damId}`);
  } else if (!validationCache.dog.get(damId)) {
    throw new Error(`Invalid damId: ${damId}`);
  }

  if (cityId && !validationCache.city.has(cityId)) {
    const city = await tx.city.findUnique({ where: { id: cityId } });
    validationCache.city.set(cityId, !!city);
    if (!city) record.cityId = null;
  } else if (!validationCache.city.get(cityId)) {
    record.cityId = null;
  }

  if (ownerId && !validationCache.user.has(ownerId)) {
    const user = await tx.user.findUnique({ where: { id: ownerId } });
    validationCache.user.set(ownerId, !!user);
    if (!user) record.ownerId = null;
  } else if (!validationCache.user.get(ownerId)) {
    record.ownerId = null;
  }

  if (kennelId && !validationCache.user.has(kennelId)) {
    const kennel = await tx.user.findUnique({ where: { id: kennelId } });
    validationCache.user.set(kennelId, !!kennel);
    if (!kennel) record.kennelId = null;
  } else if (!validationCache.user.get(kennelId)) {
    record.kennelId = null;
  }

  const existingLitter = id
    ? await tx.litter.findUnique({ where: { id } })
    : null;
  if (existingLitter) {
    return await tx.litter.update({
      where: { id },
      data: {
        ...data,
        sireId: record.sireId,
        damId: record.damId,
        breedId: record.breedId,
        cityId: record.cityId,
        ownerId: record.ownerId,
        kennelId: record.kennelId,
      },
    });
  } else {
    return await tx.litter.create({
      data: {
        ...data,
        sireId: record.sireId,
        damId: record.damId,
        breedId: record.breedId,
        cityId: record.cityId,
        ownerId: record.ownerId,
        kennelId: record.kennelId,
      },
    });
  }
};

const handleStudCertificateImport = async (record, tx) => {
  const { id, sireId, damId, breedId, ...data } = record;

  // Validate required foreign keys
  if (sireId && !validationCache.dog.has(sireId)) {
    const sire = await tx.dog.findUnique({ where: { id: sireId } });
    validationCache.dog.set(sireId, !!sire);
    if (!sire) throw new Error(`Invalid sireId: ${sireId}`);
  } else if (!validationCache.dog.get(sireId)) {
    throw new Error(`Invalid sireId: ${sireId}`);
  }

  if (damId && !validationCache.dog.has(damId)) {
    const dam = await tx.dog.findUnique({ where: { id: damId } });
    validationCache.dog.set(damId, !!dam);
    if (!dam) throw new Error(`Invalid damId: ${damId}`);
  } else if (!validationCache.dog.get(damId)) {
    throw new Error(`Invalid damId: ${damId}`);
  }

  if (breedId && !validationCache.breed.has(breedId)) {
    const breed = await tx.breed.findUnique({ where: { id: breedId } });
    validationCache.breed.set(breedId, !!breed);
    if (!breed) throw new Error(`Invalid breedId: ${breedId}`);
  } else if (!validationCache.breed.get(breedId)) {
    throw new Error(`Invalid breedId: ${breedId}`);
  }

  const existingCert = id
    ? await tx.studCertificate.findUnique({ where: { id } })
    : null;
  if (existingCert) {
    return await tx.studCertificate.update({
      where: { id },
      data: {
        ...data,
        sireId: record.sireId,
        damId: record.damId,
        breedId: record.breedId,
      },
    });
  } else {
    return await tx.studCertificate.create({
      data: {
        ...data,
        sireId: record.sireId,
        damId: record.damId,
        breedId: record.breedId,
      },
    });
  }
};

const handleUserImport = async (record, tx) => {
  const { id, email, ...data } = record;

  if (email) {
    const existingUser = await tx.user.findUnique({ where: { email } });
    if (existingUser && existingUser.id !== id) {
      throw new Error(`User with email ${email} already exists`);
    }
  }

  const existingUser = id ? await tx.user.findUnique({ where: { id } }) : null;
  if (existingUser) {
    return await tx.user.update({
      where: { id },
      data: { ...data, email },
    });
  } else {
    return await tx.user.create({
      data: { ...data, email },
    });
  }
};

const handleMicrochipImport = async (record, tx) => {
  const { id, chipId, ...data } = record;

  if (chipId) {
    const existingMicrochip = await tx.microchip.findUnique({
      where: { chipId },
    });
    if (existingMicrochip && existingMicrochip.id !== id) {
      throw new Error(`Microchip with chipId ${chipId} already exists`);
    }
  }

  const existingMicrochip = id
    ? await tx.microchip.findUnique({ where: { id } })
    : null;
  if (existingMicrochip) {
    return await tx.microchip.update({
      where: { id },
      data: { ...data, chipId },
    });
  } else {
    return await tx.microchip.create({
      data: { ...data, chipId },
    });
  }
};

const handleLitterDetailImport = async (record, tx) => {
  const { id, litterId, microchipId, KP, ...data } = record;

  if (litterId && !validationCache.litter.has(litterId)) {
    const litter = await tx.litter.findUnique({ where: { id: litterId } });
    validationCache.litter.set(litterId, !!litter);
    if (!litter) throw new Error(`Invalid litterId: ${litterId}`);
  } else if (!validationCache.litter.get(litterId)) {
    throw new Error(`Invalid litterId: ${litterId}`);
  }

  if (microchipId && !validationCache.microchip.has(microchipId)) {
    const microchip = await tx.microchip.findUnique({
      where: { id: microchipId },
    });
    validationCache.microchip.set(microchipId, !!microchip);
    if (!microchip) record.microchipId = null;
  } else if (!validationCache.microchip.get(microchipId)) {
    record.microchipId = null;
  }

  if (KP) {
    const existingDetail = await tx.litterDetail.findUnique({ where: { KP } });
    if (existingDetail && existingDetail.id !== id) {
      throw new Error(`LitterDetail with KP ${KP} already exists`);
    }
  }

  const existingDetail = id
    ? await tx.litterDetail.findUnique({ where: { id } })
    : null;
  if (existingDetail) {
    return await tx.litterDetail.update({
      where: { id },
      data: {
        ...data,
        litterId: record.litterId,
        microchipId: record.microchipId,
        KP: record.KP,
      },
    });
  } else {
    return await tx.litterDetail.create({
      data: {
        ...data,
        litterId: record.litterId,
        microchipId: record.microchipId,
        KP: record.KP,
      },
    });
  }
};

const handleGenericImport = async (table, record, tx) => {
  const { id, ...data } = record;

  if (id) {
    const existingRecord = await tx[table].findUnique({ where: { id } });
    if (existingRecord) {
      return await tx[table].update({
        where: { id },
        data,
      });
    }
  }

  return await tx[table].create({ data });
};

const exportData = async (req, res) => {
  try {
    const { table } = req.query;
    const validTables = await getAllTableNames();

    if (table && table !== "all") {
      if (!validTables.includes(table)) {
        return res.status(400).json({
          error: "Invalid table name",
          validTables,
        });
      }

      // Paginate export to avoid memory issues
      const pageSize = 1000;
      let skip = 0;
      let tableData = [];
      let hasMore = true;

      while (hasMore) {
        const batch = await prisma[table].findMany({
          take: pageSize,
          skip,
        });
        tableData = tableData.concat(batch);
        skip += pageSize;
        hasMore = batch.length === pageSize;
      }

      const sanitizedData = sanitizeForCSV(tableData);
      const csvContent = await convertToCSV(sanitizedData);

      const filename = `${table}_export_${
        new Date().toISOString().split("T")[0]
      }.csv`;

      res.header("Content-Type", "text/csv");
      res.attachment(filename);
      return res.send(csvContent);
    } else {
      const archive = archiver("zip", { zlib: { level: 9 } });
      const zipFilename = `all_data_export_${
        new Date().toISOString().split("T")[0]
      }.zip`;

      res.setHeader("Content-Type", "application/zip");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${zipFilename}"`
      );

      archive.on("error", (err) => {
        console.error("Archive error:", err.stack);
        res.status(500).send({ error: err.message });
      });

      archive.pipe(res);

      for (const tableName of validTables) {
        try {
          const pageSize = 1000;
          let skip = 0;
          let tableData = [];
          let hasMore = true;

          while (hasMore) {
            const batch = await prisma[tableName].findMany({
              take: pageSize,
              skip,
            });
            tableData = tableData.concat(batch);
            skip += pageSize;
            hasMore = batch.length === pageSize;
          }

          const sanitizedData = sanitizeForCSV(tableData);
          const csvContent = await convertToCSV(sanitizedData);

          archive.append(Buffer.from(csvContent, "utf8"), {
            name: `${tableName}.csv`,
          });
        } catch (error) {
          console.error(`Error exporting table ${tableName}:`, error.stack);
          archive.append(`Error: ${error.message}`, {
            name: `${tableName}_error.txt`,
          });
        }
      }

      archive.finalize();
    }
  } catch (err) {
    console.error("Export error:", err.stack);
    res.status(500).json({
      error: "Error exporting data",
      details: err.message,
    });
  }
};
const importData = async (req, res) => {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { table } = req.body;
    filePath = req.file.path;

    if (!table) throw new Error("Table name is required");

    const validTables = await getAllTableNames();
    const protectedTables = ["User", "Country", "DogCategory", "Breed"];

    if (protectedTables.includes(table)) {
      throw new Error(`Cannot import data to protected table: ${table}`);
    }
    if (!validTables.includes(table)) {
      throw new Error(`Invalid table name: ${table}`);
    }

    // Clear existing data for this table first (outside transaction)
    await clearNonProtectedTables(prisma, table);

    // Read and parse the uploaded CSV file
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const records = await parseCSV(fileContent);

    if (records.length === 0) throw new Error("No data found in CSV file");
    if (!validateCSVHeaders(records, table)) {
      throw new Error(`Invalid CSV headers for table ${table}`);
    }

    const convertedRecords = convertCSVTypes(records, table);
    const batchSize = 50;

    let successCount = 0;
    let errorCount = 0;
    const errors = [];

    // Process records in small batches (no long transactions)
    for (let i = 0; i < convertedRecords.length; i += batchSize) {
      const batch = convertedRecords.slice(i, i + batchSize);

      for (const record of batch) {
        const cleanRecord = {};
        Object.keys(record).forEach((key) => {
          if (record[key] !== undefined && record[key] !== "") {
            cleanRecord[key] = record[key];
          }
        });

        try {
          switch (table) {
            case "Dog":
              await handleDogImport(cleanRecord, prisma);
              break;
            case "Litter":
              await handleLitterImport(cleanRecord, prisma);
              break;
            case "StudCertificate":
              await handleStudCertificateImport(cleanRecord, prisma);
              break;
            case "Microchip":
              await handleMicrochipImport(cleanRecord, prisma);
              break;
            case "LitterDetail":
              await handleLitterDetailImport(cleanRecord, prisma);
              break;
            default:
              await handleGenericImport(table, cleanRecord, prisma);
          }

          successCount++;
        } catch (error) {
          errorCount++;
          errors.push({
            record: cleanRecord,
            error: error.message,
          });
          console.error(`Error importing record to ${table}:`, error.stack);
        }
      }
    }

    res.json({
      message: `Data imported successfully to ${table} table!`,
      imported: successCount,
      errors: errorCount,
      errorDetails: errors.slice(0, 5), // limit to first 5 errors
    });
  } catch (err) {
    console.error("Import error:", err.stack);
    res
      .status(
        err.message.includes("Invalid") || err.message.includes("protected")
          ? 400
          : 500
      )
      .json({
        error: "Error importing data",
        details: err.message,
      });
  } finally {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

const importMultipleData = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }
    const importOrder = [
      "Country",
      "City",
      "Breed",
      "DogCategory",
      "Microchip",
      "User",
      "Dog",
      "DogImage",
      "DogOwner",
      "Litter",
      "LitterDetail",
      "StudCertificate",
      "Notification",
      "VaccinationRecord",
      "TrainingRecord",
      "ProphylaxisRecord",
      "DewormingRecord",
      "SicknessRecord",
      "ActivityLog",
    ];
    const protectedTables = ["User", "Country", "DogCategory", "Breed"];
    const results = [];
    const validTables = await getAllTableNames();
    // Clear all non-protected tables before import
    await prisma.$transaction(async (tx) => {
      await clearNonProtectedTables(tx);
    });
    // Clear validation cache before import
    Object.values(validationCache).forEach((cache) => cache.clear());
    for (const tableName of importOrder) {
      if (protectedTables.includes(tableName)) {
        results.push({
          table: tableName,
          imported: 0,
          status: "skipped",
          message: `Table ${tableName} is protected and cannot be imported`,
        });
        continue;
      }
      const file = req.files.find(
        (f) => path.basename(f.originalname, ".csv") === tableName
      );
      if (!file) {
        results.push({
          table: tableName,
          imported: 0,
          status: "skipped",
          message: "No CSV file provided",
        });
        continue;
      }
      if (!validTables.includes(tableName)) {
        results.push({
          table: tableName,
          imported: 0,
          status: "error",
          message: `Invalid table name: ${tableName}`,
        });
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
        continue;
      }
      let successCount = 0;
      let errorCount = 0;
      const errors = [];
      try {
        const fileContent = fs.readFileSync(file.path, "utf-8");
        const records = await parseCSV(fileContent);
        if (records.length === 0) {
          results.push({
            table: tableName,
            imported: 0,
            status: "empty",
            message: "No data found in CSV file",
          });
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          continue;
        }
        if (!validateCSVHeaders(records, tableName)) {
          throw new Error(`Invalid CSV headers for table ${tableName}`);
        }
        const convertedRecords = convertCSVTypes(records, tableName);
        await prisma.$transaction(async (tx) => {
          const batchSize = 50;
          for (let i = 0; i < convertedRecords.length; i += batchSize) {
            const batch = convertedRecords.slice(i, i + batchSize);
            for (const record of batch) {
              try {
                const cleanRecord = {};
                Object.keys(record).forEach((key) => {
                  if (record[key] !== undefined && record[key] !== "") {
                    cleanRecord[key] = record[key];
                  }
                });
                let isValid = true;
                switch (tableName) {
                  case "City":
                    if (
                      cleanRecord.countryId &&
                      !validationCache.country.has(cleanRecord.countryId)
                    ) {
                      const country = await tx.country.findUnique({
                        where: { idCountry: cleanRecord.countryId },
                      });
                      validationCache.country.set(
                        cleanRecord.countryId,
                        !!country
                      );
                      if (!country) {
                        isValid = false;
                        errors.push({
                          record: cleanRecord,
                          error: `Invalid countryId: ${cleanRecord.countryId}`,
                        });
                      }
                    } else if (
                      !validationCache.country.get(cleanRecord.countryId)
                    ) {
                      isValid = false;
                      errors.push({
                        record: cleanRecord,
                        error: `Invalid countryId: ${cleanRecord.countryId}`,
                      });
                    }
                    break;
                  case "Dog":
                    // Handled by handleDogImport
                    break;
                  case "Litter":
                    // Handled by handleLitterImport
                    break;
                  case "LitterDetail":
                    // Handled by handleLitterDetailImport
                    break;
                  case "StudCertificate":
                    // Handled by handleStudCertificateImport
                    break;
                  case "DogImage":
                    if (
                      cleanRecord.dogId &&
                      !validationCache.dog.has(cleanRecord.dogId)
                    ) {
                      const dog = await tx.dog.findUnique({
                        where: { id: cleanRecord.dogId },
                      });
                      validationCache.dog.set(cleanRecord.dogId, !!dog);
                      if (!dog) {
                        isValid = false;
                        errors.push({
                          record: cleanRecord,
                          error: `Invalid dogId: ${cleanRecord.dogId}`,
                        });
                      }
                    } else if (!validationCache.dog.get(cleanRecord.dogId)) {
                      isValid = false;
                      errors.push({
                        record: cleanRecord,
                        error: `Invalid dogId: ${cleanRecord.dogId}`,
                      });
                    }
                    break;
                  case "DogOwner":
                    if (
                      cleanRecord.dogId &&
                      !validationCache.dog.has(cleanRecord.dogId)
                    ) {
                      const dog = await tx.dog.findUnique({
                        where: { id: cleanRecord.dogId },
                      });
                      validationCache.dog.set(cleanRecord.dogId, !!dog);
                      if (!dog) {
                        isValid = false;
                        errors.push({
                          record: cleanRecord,
                          error: `Invalid dogId: ${cleanRecord.dogId}`,
                        });
                      }
                    } else if (!validationCache.dog.get(cleanRecord.dogId)) {
                      isValid = false;
                      errors.push({
                        record: cleanRecord,
                        error: `Invalid dogId: ${cleanRecord.dogId}`,
                      });
                    }
                    if (
                      cleanRecord.ownerId &&
                      !validationCache.user.has(cleanRecord.ownerId)
                    ) {
                      const user = await tx.user.findUnique({
                        where: { id: cleanRecord.ownerId },
                      });
                      validationCache.user.set(cleanRecord.ownerId, !!user);
                      if (!user) {
                        isValid = false;
                        errors.push({
                          record: cleanRecord,
                          error: `Invalid ownerId: ${cleanRecord.ownerId}`,
                        });
                      }
                    } else if (!validationCache.user.get(cleanRecord.ownerId)) {
                      isValid = false;
                      errors.push({
                        record: cleanRecord,
                        error: `Invalid ownerId: ${cleanRecord.ownerId}`,
                      });
                    }
                    break;
                  case "VaccinationRecord":
                  case "TrainingRecord":
                  case "ProphylaxisRecord":
                  case "DewormingRecord":
                  case "SicknessRecord":
                    if (
                      cleanRecord.dogId &&
                      !validationCache.dog.has(cleanRecord.dogId)
                    ) {
                      const dog = await tx.dog.findUnique({
                        where: { id: cleanRecord.dogId },
                      });
                      validationCache.dog.set(cleanRecord.dogId, !!dog);
                      if (!dog) {
                        isValid = false;
                        errors.push({
                          record: cleanRecord,
                          error: `Invalid dogId: ${cleanRecord.dogId}`,
                        });
                      }
                    } else if (!validationCache.dog.get(cleanRecord.dogId)) {
                      isValid = false;
                      errors.push({
                        record: cleanRecord,
                        error: `Invalid dogId: ${cleanRecord.dogId}`,
                      });
                    }
                    break;
                  case "ActivityLog":
                    if (
                      cleanRecord.userId &&
                      !validationCache.user.has(cleanRecord.userId)
                    ) {
                      const user = await tx.user.findUnique({
                        where: { id: cleanRecord.userId },
                      });
                      validationCache.user.set(cleanRecord.userId, !!user);
                      if (!user) {
                        cleanRecord.userId = null;
                      }
                    } else if (!validationCache.user.get(cleanRecord.userId)) {
                      cleanRecord.userId = null;
                    }
                    break;
                }
                if (!isValid) {
                  errorCount++;
                  continue;
                }
                switch (tableName) {
                  case "Dog":
                    await handleDogImport(cleanRecord, tx);
                    break;
                  case "Litter":
                    await handleLitterImport(cleanRecord, tx);
                    break;
                  case "StudCertificate":
                    await handleStudCertificateImport(cleanRecord, tx);
                    break;
                  case "Microchip":
                    await handleMicrochipImport(cleanRecord, tx);
                    break;
                  case "LitterDetail":
                    await handleLitterDetailImport(cleanRecord, tx);
                    break;
                  default:
                    await handleGenericImport(tableName, cleanRecord, tx);
                }
                successCount++;
              } catch (error) {
                errorCount++;
                errors.push({
                  record: cleanRecord,
                  error: error.message,
                });
                console.error(
                  `Error importing record to ${tableName}:`,
                  error.stack
                );
              }
            }
          }
          if (errorCount > 0) {
            throw new Error(
              `Failed to import ${errorCount} records for ${tableName}`
            );
          }
        });
        results.push({
          table: tableName,
          imported: successCount,
          errors: errorCount,
          errorDetails: errors.slice(0, 5),
          status: errorCount > 0 ? "partial" : "success",
        });
      } catch (error) {
        results.push({
          table: tableName,
          imported: successCount,
          errors: errorCount,
          errorDetails: errors.slice(0, 5),
          status: "error",
          message: error.message,
        });
      } finally {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      }
    }
    res.json({
      message: "Bulk import completed",
      results: results,
    });
  } catch (err) {
    console.error("Bulk import error:", err.stack);
    res.status(500).json({
      error: "Error in bulk import",
      details: err.message,
    });
  } finally {
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
  }
};

const getTables = async (req, res) => {
  try {
    const tables = await getAllTableNames();
    const tableInfo = await Promise.all(
      tables.map(async (table) => {
        try {
          const count = await prisma[table].count();
          return { name: table, count };
        } catch (error) {
          console.error(`Error counting records for ${table}:`, error.stack);
          return { name: table, count: 0, error: error.message };
        }
      })
    );

    res.json({ tables: tableInfo });
  } catch (error) {
    console.error("Error fetching table information:", error.stack);
    res.status(500).json({
      error: "Error fetching table information",
      details: error.message,
    });
  }
};

module.exports = {
  exportData,
  importData,
  importMultipleData,
  getTables,
};
