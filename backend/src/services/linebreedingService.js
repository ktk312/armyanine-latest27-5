// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// /**
//  * Gets ancestors map for a dog using tabular method
//  */
// async function getAncestorsMap(dogId) {
//   const ancestorsTable = new Map();
//   const dog = await prisma.dog.findUnique({
//     where: { id: dogId },
//     include: {
//       sire: {
//         include: {
//           sire: { include: { sire: true, dam: true } },
//           dam: { include: { sire: true, dam: true } },
//         },
//       },
//       dam: {
//         include: {
//           sire: { include: { sire: true, dam: true } },
//           dam: { include: { sire: true, dam: true } },
//         },
//       },
//     },
//   });

//   if (!dog) return ancestorsTable;

//   // Helper to add ancestor with generation number
//   function addAncestor(ancestor, generation) {
//     if (!ancestor) return;
//     const existing = ancestorsTable.get(ancestor.id);
//     if (existing) {
//       if (!existing.generations.includes(generation)) {
//         existing.generations.push(generation);
//       }
//     } else {
//       ancestorsTable.set(ancestor.id, {
//         id: ancestor.id,
//         name: ancestor.dogName,
//         generations: [generation],
//         sireId: ancestor.sireId,
//         damId: ancestor.damId,
//       });
//     }
//   }

//   // Add ancestors by generation
//   function processAncestors(current, generation = 0) {
//     if (!current) return;
//     addAncestor(current, generation);
//     if (current.sire) {
//       processAncestors(current.sire, generation + 1);
//     }
//     if (current.dam) {
//       processAncestors(current.dam, generation + 1);
//     }
//   }

//   processAncestors(dog);
//   return ancestorsTable;
// }

// function calculateInbreedingCoefficient(sireAncestors, damAncestors) {
//   let F = 0;

//   // Step 1: Find all common ancestors
//   const commonAncestorIds = [...sireAncestors.keys()].filter((id) =>
//     damAncestors.has(id)
//   );

//   // Step 2: Calculate contribution of each independent path
//   for (const ancestorId of commonAncestorIds) {
//     const sireGens = sireAncestors.get(ancestorId).generations;
//     const damGens = damAncestors.get(ancestorId).generations;
//     const FA = sireAncestors.get(ancestorId).inbreedingCoefficient || 0;

//     // For every possible path pair (independent contributions)
//     for (const n1 of sireGens) {
//       for (const n2 of damGens) {
//         const contribution = Math.pow(0.5, n1 + n2 + 1) * (1 + FA);
//         F += contribution;
//       }
//     }
//   }

//   return +(F * 100).toFixed(2); // percentage
// }

// /**
//  * Get available sires for dam with inbreeding coefficients
//  */
// async function getAvailableSiresForDam(damId) {
//   const dam = await prisma.dog.findUnique({
//     where: { id: damId },
//     select: { id: true, sex: true, breedId: true },
//   });

//   console.log("Dam:", dam);

//   if (!dam) throw new Error("Dam not found");
//   if (dam.sex.toLowerCase() !== "female") throw new Error("Not a female dog");

//   const allSires = await prisma.dog.findMany({
//     where: {
//       breedId: dam.breedId,
//       sex: "male",
//       isDeath: false,
//       isLoan: false,
//       isSold: false,
//       isTransfer: false,
//       CNS: false,
//       CDN: false,
//       NOT: { id: damId },
//     },
//   });

//   const damAncestors = await getAncestorsMap(damId);
//   const results = [];

//   for (const sire of allSires) {
//     const sireAncestors = await getAncestorsMap(sire.id);
//     // const coeff = await calculateInbreedingCoefficient(allSires, damAncestors);
//     const coeff = await calculateInbreedingCoefficient(
//       sireAncestors,
//       damAncestors
//     );
//     if (sire.dogName.toLowerCase() === "rast") {
//       console.log(`Sire: ${sire.dogName}, Coefficient: ${coeff}`);
//       console.log(`Sire Ancestors:`, sireAncestors);
//       console.log(`Dam Ancestors:`, damAncestors);
//     }

//     results.push({
//       id: sire.id,
//       dogName: sire.dogName,
//       KP: sire.KP,
//       inbreedingCoefficient: coeff,
//     });
//   }

//   return results.sort(
//     (a, b) => a.inbreedingCoefficient - b.inbreedingCoefficient
//   );
// }

// module.exports = {
//   getAncestorsMap,
//   calculateInbreedingCoefficient,
//   getAvailableSiresForDam,
// };

//////////////////////above older orignal code/////////////////////////

/** line breeding service start **/

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// /**
//  * Gets ancestors map for a dog using tabular method
//  */
// async function getAncestorsMap(dogId) {
//   const ancestorsTable = new Map();
//   const dog = await prisma.dog.findUnique({
//     where: { id: dogId },
//     include: {
//       sire: {
//         include: {
//           sire: { include: { sire: true, dam: true } },
//           dam: { include: { sire: true, dam: true } },
//         },
//       },
//       dam: {
//         include: {
//           sire: { include: { sire: true, dam: true } },
//           dam: { include: { sire: true, dam: true } },
//         },
//       },
//     },
//   });

//   if (!dog) return ancestorsTable;

//   // Helper to add ancestor with generation number
//   function addAncestor(ancestor, generation) {
//     if (!ancestor) return;
//     const existing = ancestorsTable.get(ancestor.id);
//     if (existing) {
//       if (!existing.generations.includes(generation)) {
//         existing.generations.push(generation);
//       }
//     } else {
//       ancestorsTable.set(ancestor.id, {
//         id: ancestor.id,
//         name: ancestor.dogName,
//         generations: [generation],
//         sireId: ancestor.sireId,
//         damId: ancestor.damId,
//       });
//     }
//   }

//   // Add ancestors by generation
//   function processAncestors(current, generation = 0) {
//     if (!current) return;
//     addAncestor(current, generation);
//     if (current.sire) {
//       processAncestors(current.sire, generation + 1);
//     }
//     if (current.dam) {
//       processAncestors(current.dam, generation + 1);
//     }
//   }

//   processAncestors(dog);
//   return ancestorsTable;
// }

// /**
//  * Get grandparents of a dog (ancestors at generation 2)
//  */
// async function getGrandparentsIds(dogAncestors) {
//   const grandparentIds = [];

//   for (const [ancestorId, ancestorData] of dogAncestors.entries()) {
//     // Check if this ancestor appears exactly at generation 2
//     if (ancestorData.generations.includes(2)) {
//       grandparentIds.push(ancestorId);
//     }
//   }

//   return grandparentIds;
// }

// /**
//  * Calculate inbreeding coefficient using first-cousins approximation
//  * 1. Only consider common ancestors that are exactly 2 generations away (grandparents)
//  * 2. Limit to at most 2 such common ancestors
//  * This simulates a "first cousins" relationship
//  */
// async function calculateInbreedingCoefficient(sireAncestors, damAncestors) {
//   // Step 1: Get grandparent IDs for sire and dam (ancestors at generation 2)
//   const sireGrandparentIds = await getGrandparentsIds(sireAncestors);
//   const damGrandparentIds = await getGrandparentsIds(damAncestors);

//   // Step 2: Find common grandparents
//   const commonGrandparentIds = sireGrandparentIds.filter((id) =>
//     damGrandparentIds.includes(id)
//   );

//   // Step 3: Limit to at most 2 common grandparents (like first cousins)
//   const limitedCommon = commonGrandparentIds.slice(0, 2);

//   // Step 4: Calculate coefficient
//   // Each common grandparent contributes (1/2)^(2+2+1) = 1/32 = 3.125%
//   // Where 2+2+1 represents: 2 gens to sire, 2 gens to dam, +1 for the final calculation
//   const F = limitedCommon.length * (1 / 32); // 0.03125 per grandparent

//   // Step 5: Convert to percentage
//   const coefficientPercent = +(F * 100).toFixed(2);

//   return coefficientPercent;
// }

// /**
//  * Get available sires for dam with inbreeding coefficients
//  */
// async function getAvailableSiresForDam(damId) {
//   const dam = await prisma.dog.findUnique({
//     where: { id: damId },
//     select: { id: true, sex: true, breedId: true },
//   });

//   if (!dam) throw new Error("Dam not found");
//   if (dam.sex.toLowerCase() !== "female") throw new Error("Not a female dog");

//   const allSires = await prisma.dog.findMany({
//     where: {
//       breedId: dam.breedId,
//       sex: "male",
//       isDeath: false,
//       isLoan: false,
//       isSold: false,
//       isTransfer: false,
//       CNS: false,
//       CDN: false,
//       NOT: { id: damId },
//     },
//   });

//   const damAncestors = await getAncestorsMap(damId);
//   const results = [];

//   for (const sire of allSires) {
//     const sireAncestors = await getAncestorsMap(sire.id);
//     const coeff = await calculateInbreedingCoefficient(
//       sireAncestors,
//       damAncestors
//     );

//     results.push({
//       id: sire.id,
//       dogName: sire.dogName,
//       KP: sire.KP,
//       inbreedingCoefficient: coeff,
//     });
//   }

//   return results.sort(
//     (a, b) => a.inbreedingCoefficient - b.inbreedingCoefficient
//   );
// }

// module.exports = {
//   getAncestorsMap,
//   calculateInbreedingCoefficient,
//   getAvailableSiresForDam,
// };

/** line breeding service end **/

////////////////////above v1 code//////////////////////

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Wright standard table (allowed output values)
 */
const WRIGHT_F_TABLE = [0, 1.56, 3.13, 6.25, 12.5, 25, 50];

/**
 * Maps a raw COI percentage to the nearest LOWER Wright table value
 */
function mapToWrightTable(rawPercentage) {
  let mapped = 0;

  for (const value of WRIGHT_F_TABLE) {
    if (rawPercentage >= value) {
      mapped = value;
    } else {
      break;
    }
  }

  return mapped;
}

/**
 * Gets ancestors map for a dog using tabular method
 */
async function getAncestorsMap(dogId) {
  const ancestorsTable = new Map();
  const dog = await prisma.dog.findUnique({
    where: { id: dogId },
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
  });

  if (!dog) return ancestorsTable;

  function addAncestor(ancestor, generation) {
    if (!ancestor) return;
    const existing = ancestorsTable.get(ancestor.id);
    if (existing) {
      if (!existing.generations.includes(generation)) {
        existing.generations.push(generation);
      }
    } else {
      ancestorsTable.set(ancestor.id, {
        id: ancestor.id,
        name: ancestor.dogName,
        generations: [generation],
        sireId: ancestor.sireId,
        damId: ancestor.damId,
      });
    }
  }

  function processAncestors(current, generation = 0) {
    if (!current) return;
    addAncestor(current, generation);
    if (current.sire) {
      processAncestors(current.sire, generation + 1);
    }
    if (current.dam) {
      processAncestors(current.dam, generation + 1);
    }
  }

  processAncestors(dog);
  return ancestorsTable;
}

/**
 * Calculates raw Wright inbreeding coefficient (percentage)
 *
 * Implements first-cousins approximation:
 *  - Only ancestors at generation 2 (grandparents) are considered
 *  - Limit to at most 2 common grandparents
 */
function calculateInbreedingCoefficient(sireAncestors, damAncestors) {
  function getGrandparentIds(ancestors) {
    const ids = [];
    for (const [ancestorId, ancestorData] of ancestors.entries()) {
      if (ancestorData.generations && ancestorData.generations.includes(2)) {
        ids.push(ancestorId);
      }
    }
    return ids;
  }

  const sireGrandparentIds = getGrandparentIds(sireAncestors);
  const damGrandparentIds = getGrandparentIds(damAncestors);

  const commonGrandparentIds = sireGrandparentIds.filter((id) =>
    damGrandparentIds.includes(id)
  );

  // Limit to at most 2 common grandparents (like first cousins)
  const limitedCommon = commonGrandparentIds.slice(0, 2);

  // Each common grandparent contributes (1/2)^(2+2+1) = 1/32 = 3.125%
  const F = limitedCommon.length * (1 / 32); // decimal

  // Convert to percentage with rounding similar to original implementation
  const coefficientPercent = Math.round(F * 10000) / 100;
  return coefficientPercent;
}

/**
 * Get available sires for dam with Wright-rounded inbreeding coefficients
 */
async function getAvailableSiresForDam(damId) {
  const dam = await prisma.dog.findUnique({
    where: { id: damId },
    select: { id: true, sex: true, breedId: true },
  });

  if (!dam) throw new Error("Dam not found");
  if (dam.sex.toLowerCase() !== "female") throw new Error("Not a female dog");

  const allSires = await prisma.dog.findMany({
    where: {
      breedId: dam.breedId,
      sex: "male",
      isDeath: false,
      isLoan: false,
      isSold: false,
      isTransfer: false,
      CNS: false,
      CDN: false,
      NOT: { id: damId },
    },
  });

  const damAncestors = await getAncestorsMap(damId);
  const results = [];

  for (const sire of allSires) {
    const sireAncestors = await getAncestorsMap(sire.id);

    const rawCoeff = await calculateInbreedingCoefficient(
      sireAncestors,
      damAncestors
    );

    // 🔑 Wright table rounding (floor)
    const coeff = mapToWrightTable(rawCoeff);

    results.push({
      id: sire.id,
      dogName: sire.dogName,
      KP: sire.KP,
      // Wright-mapped coefficient (allowed table values)
      inbreedingCoefficient: coeff,
      // Raw computed percentage (two-decimal precision) for this sire-dam pair
      rawInbreedingCoefficient: rawCoeff,
    });
  }

  return results.sort(
    (a, b) => a.inbreedingCoefficient - b.inbreedingCoefficient
  );
}

module.exports = {
  getAncestorsMap,
  calculateInbreedingCoefficient,
  getAvailableSiresForDam,
};
